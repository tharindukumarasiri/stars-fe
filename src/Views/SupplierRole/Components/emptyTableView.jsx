import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const EmptyTableView = ({ tableName, onButtonClick }) => {
    const {t} = useTranslation();
    return (
        <>
            <div className="body-text flex-center-middle m-t-20" >{`${t('NO')} ${tableName} ${t('YET')}`}</div>
            <div className="flex-center-middle m-t-20 m-b-20"><Button type="primary" onClick={onButtonClick} >{`${t('CREATE_NEW')} ${tableName.slice(0, -1)}`}</Button></div>
        </>
    )
}

export default EmptyTableView;