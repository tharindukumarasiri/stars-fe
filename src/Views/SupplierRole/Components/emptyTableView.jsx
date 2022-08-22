import React from "react";
import { Button } from "antd";

const EmptyTableView = ({ tableName, onButtonClick }) => {
    return (
        <>
            <div className="body-text flex-center-middle m-t-20" >{`No ${tableName} yet`}</div>
            <div className="flex-center-middle m-t-20 m-b-20"><Button type="primary" onClick={onButtonClick} >{`Create New ${tableName.slice(0, -1)}`}</Button></div>
        </>
    )
}

export default EmptyTableView;