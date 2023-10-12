import React, { useState, memo } from 'react';

import style from './DndStyles.module.scss'
import Shapes, { Categories } from './ShapesData.js';

const SideBar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [closedCategories, setClosedCategories] = useState([]);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onArrowClicked = () => setSidebarVisible(pre => !pre)

    const CustomShape = ({ shape }) => {
        return (
            <svg viewBox={shape?.viewBox} fill="#ffffff" stroke="#434343" >
                {shape?.image}
            </svg>
        )
    }

    const onCategoryClick = (category) => {
        const index = closedCategories?.findIndex(cat => cat === category)
        const newClosedCategories = [...closedCategories]

        if (index < 0) {
            newClosedCategories.push(category)
        } else {
            newClosedCategories.splice(index, 1)
        }

        setClosedCategories(newClosedCategories);
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.sidebarColapsBtnContainer}>
                <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-left' : ' icon-circle-arrow-right')}
                    onClick={onArrowClicked} />
            </div>
            <div className={style.sidebarMainContainer}>
                {sidebarVisible &&
                    <>
                        {Object.entries(Categories)?.map(category => {
                            return (
                                <div key={category[0]} >
                                    <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(category[0]) }} >
                                        <div className=''>{category[1]}</div>
                                        <i className={(!closedCategories.includes(category[0]) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                    </div>

                                    {!closedCategories.includes(category[0]) &&
                                        <div className={style.sidebarCategoryContainer}>
                                            {
                                                Object.entries(Shapes)?.map(shape => {
                                                    if (shape[1]?.category?.includes(category[1]))
                                                        return (
                                                            <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                                <CustomShape shape={shape[1]} />
                                                            </div>
                                                        )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </aside>
    );
};

export default memo(SideBar);