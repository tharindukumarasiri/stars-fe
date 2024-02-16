import React, { memo, useEffect } from 'react';
import { NodeResizer } from 'reactflow';

import { useNodeDataStore } from '../store'

import style from '../DndStyles.module.scss'
import { getImageDimensions } from '../utils';

function UploadNode({ id, selected, data }) {
    const initialHeight = 80;
    const initialWidth = 80;

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value);

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
    }

    useEffect(() => {
        const getImageSize = async () => {
            const imageDimensions = await getImageDimensions(data?.image);
            console.log(imageDimensions)
            setSize({ height: imageDimensions.height, width: imageDimensions.width })
        }

        if (sizes.find(item => item.id === id)) return;

        getImageSize();
    }, []);

    const onResize = (_, size) => setSize(size);

    return (
        <div style={mainContainerStyle}>
            <NodeResizer
                isVisible={selected}
                onResize={onResize}
                keepAspectRatio
                handleClassName={style.resizerHandleStyle}
            />

            <img src={data.image} alt="img" />
        </div>
    );
}

export default memo(UploadNode);