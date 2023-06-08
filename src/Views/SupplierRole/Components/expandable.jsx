import React from "react";
import { useTranslation } from "react-i18next";

const Expandable = (props) => {
    const { title, children, expandedItem, setExpandedItem, label } = props;
    const expanded = expandedItem === label;
    const { t } = useTranslation();
    const Arrow = () => {
        const expandIcon = expanded ? 'icon-right-arrow fr m-t--18' : 'icon-arrow-down fr m-t--18'
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
        <div className="g-row">
            <div className="expandable" onClick={onHeaderClicked}>
                <div className="expandable-title">{t(title)}</div>
                <Arrow />
            </div>
            {expanded ? children : null}
        </div>
    )
}

export default Expandable;