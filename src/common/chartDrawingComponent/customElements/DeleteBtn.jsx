import React, { useCallback } from "react"
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import style from '../DndStyles.module.scss'
import { useReactFlow } from 'reactflow';

const { confirm } = Modal;

const DeleteBtn = ({ nodeId }) => {
    const { setNodes, setEdges } = useReactFlow();

    const deleteNode = useCallback(() => {
        confirm({
            title: 'Are you sure you want to delete the shape',
            icon: <ExclamationCircleOutlined />,

            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                setNodes((nodes) => nodes.filter((node) => node?.id !== nodeId && node?.parentNode !== nodeId));
                setEdges((edges) => edges.filter((edge) => edge?.source !== nodeId));
            },
        });
    }, [nodeId, setNodes, setEdges]);

    return (
        <i className={style.nodeCloseBtn + " icon-close-small-x"} onClick={deleteNode} />
    )
}

export default DeleteBtn