import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import style from '../DndStyles.module.scss'
import { useNodeDataStore } from '../store';

export default ({ onChangePage }) => {
    const [isFocused, setIsFocused] = useState(false)
    const {
        currentPage,
        pagesData,
        setPagesData,
    } = useNodeDataStore()

    const addNewPage = () => onChangePage(pagesData?.length, true);
    const onBlur = () => setIsFocused(false)

    const onChangePageName = (e) => {
        const newPagesData = JSON.parse(JSON.stringify(pagesData))
        newPagesData[currentPage] = { ...newPagesData[currentPage], pageName: e.target.value }
        setPagesData(newPagesData)
    }

    const onClickPageTab = (index) => {
        setIsFocused(true)
        onChangePage(index)
    }

    return (
        <div className={style.preventSelect}>
            <div className={style.pagesBarContainer}>
                {pagesData?.map((pageData, index) => {
                    return (
                        <div
                            key={index}
                            className={index === currentPage ? (isFocused ? style.pagesTabInputContainer : style.pageTabSelected) : style.pageTabContainer}
                            onClick={() => onClickPageTab(index)}>
                            {index === currentPage && isFocused ?
                                <input type='text'
                                    autoFocus
                                    onBlur={onBlur}
                                    onChange={onChangePageName}
                                    className={style.pagesTabInput}
                                    value={pageData?.pageName} />
                                : <div>{pageData?.pageName ?? 'New Page'}</div>
                            }
                        </div>
                    )
                })}
                <PlusOutlined className={style.newPageIcon} onClick={addNewPage} />
            </div>
        </div>
    );
};
