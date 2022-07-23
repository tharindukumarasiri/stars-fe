import React from "react";

const Expandable = (props) => {
    const { title, children, expandedItem, setExpandedItem, label } = props;
    const expanded = expandedItem === label;

    const Arrow = () => {
        const expandIcon = expanded ? 'icon-right-arrow fr m-t-15' : 'icon-arrow-down fr m-t-15'
        return <i className={expandIcon} />
    }

    const onHeaderClicked = () => {
        if (expandedItem === label) {
            setExpandedItem('')
        } else {
            setExpandedItem(label);
        }
    }
    return (
        <div className="expandable hover-hand">
            <div className="g-row" onClick={onHeaderClicked}>
                <div className="h2-semi g-col-10 m-t-15">{title}</div>
                <Arrow />
            </div>
            {expanded ? children : null}
        </div>
    )
}

export default Expandable;