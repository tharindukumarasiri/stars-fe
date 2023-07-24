import React, { useState } from 'react';
import Input from "../../common/input";

import style from './DndStyles.module.scss'
import Shapes from './Shapes.js';

export default ({ diagramName, onNameChange, onSave }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onArrowClicked = () => setSidebarVisible(pre => !pre)

    const CustomShape = ({ shape }) => {
        return (
            <svg viewBox={shape?.viewBox} fill="#434343" >
                {shape?.image}
            </svg>
        )
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.sidebarColapsBtnContainer}>
                <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-left' : ' icon-circle-arrow-right')}
                    onClick={onArrowClicked} />
            </div>
            {sidebarVisible &&
                <>
                    <Input value={diagramName} placeholder='Name' onChange={onNameChange} />
                    <div className={style.sideBarRow}>
                        <button className="add-btn" onClick={onSave} >Save</button>
                    </div>
                    <div className={style.sidebarCategoryContainer} >
                        {Object.entries(Shapes)?.map(shape => {
                            return (
                                <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                    <CustomShape shape={shape[1]} fill={'black'} />
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </aside>
    );
};