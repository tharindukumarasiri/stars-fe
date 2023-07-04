import React, { useState } from 'react';
import Input from "../../common/input";

import style from './DndStyles.module.scss'

export default ({ diagramName, onNameChange, onSave }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onArrowClicked = () => setSidebarVisible(pre => !pre)

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

                    <div className={style.rectangle} onDragStart={(event) => onDragStart(event, 'Rectangle')} draggable>
                        Rectangle
                    </div>
                    <div className={style.sideBarRow}>
                        <div className={style.circle} onDragStart={(event) => onDragStart(event, 'Circle')} draggable>
                            <div>Circle</div>
                        </div>
                        <div className={style.square} onDragStart={(event) => onDragStart(event, 'Square')} draggable>
                            <div>Square</div>
                        </div>
                    </div>
                </>
            }
        </aside>
    );
};
