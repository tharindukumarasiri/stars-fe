import React, { useCallback, useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useNodeDataStore } from '../store';

const defaultOptions = {
    maxHistorySize: 100,
    enableShortcuts: true,
};

// https://redux.js.org/usage/implementing-undo-history
export const useUndoRedo = ({
    maxHistorySize = defaultOptions.maxHistorySize,
    enableShortcuts = defaultOptions.enableShortcuts,
} = defaultOptions) => {
    // the past and future arrays store the states that we can jump to
    const [past, setPast] = useState([]);
    const [future, setFuture] = useState([]);

    const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();
    const sizes = useNodeDataStore((state) => state?.size);
    const setSizes = useNodeDataStore((state) => state.setSizes);

    const takeSnapshot = useCallback(() => {
        // push the current graph to the past state
        setPast((past) => [
            ...past.slice(past.length - maxHistorySize + 1, past.length),
            { nodes: getNodes(), edges: getEdges(), sizes: useNodeDataStore.getState().size },
        ]);

        // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
        setFuture([]);
    }, [getNodes, getEdges, maxHistorySize]);

    const undo = useCallback(() => {
        // get the last state that we want to go back to
        const pastState = past[past.length - 1];

        if (pastState) {
            // first we remove the state from the history
            setPast((past) => past.slice(0, past.length - 1));
            // we store the current graph for the redo operation
            setFuture((future) => [
                ...future,
                { nodes: getNodes(), edges: getEdges(), sizes: useNodeDataStore.getState().size },
            ]);
            // now we can set the graph to the past state
            setNodes(pastState.nodes);
            setEdges(pastState.edges);
            setSizes(pastState.sizes);
        }
    }, [setNodes, setEdges, getNodes, getEdges, sizes, setSizes, past]);

    const redo = useCallback(() => {
        const futureState = future[future.length - 1];

        if (futureState) {
            setFuture((future) => future.slice(0, future.length - 1));
            setPast((past) => [...past, { nodes: getNodes(), edges: getEdges(), sizes: useNodeDataStore.getState().size }]);
            setNodes(futureState.nodes);
            setEdges(futureState.edges);
            setSizes(futureState.sizes);
        }
    }, [setNodes, setEdges, getNodes, getEdges, sizes, setSizes, future]);

    useEffect(() => {
        // this effect is used to attach the global event handlers
        if (!enableShortcuts) {
            return;
        }

        const keyDownHandler = (event) => {
            if (
                (event.key === 'z' | event.key === 'Z') &&
                (event.ctrlKey || event.metaKey) &&
                event.shiftKey
            ) {
                redo();
            } else if ((event.key === 'z' | event.key === 'Z') && (event.ctrlKey || event.metaKey)) {
                undo();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [undo, redo, enableShortcuts]);

    return {
        undo,
        redo,
        takeSnapshot,
        canUndo: !past.length,
        canRedo: !future.length,
    };
};

export default useUndoRedo;