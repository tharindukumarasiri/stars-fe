import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";

export default function Tab(props) {
  const { activeTab, changeActiveTab, closeTab, openTabs } = useContext(TabContext)

  const onClick = () => {
    changeActiveTab(props.id);
  };

  const onCloseBtnClick = (e) => {
    if (activeTab === props.id) {
      changeActiveTab(openTabs[0])
    }
    e.stopPropagation();
    closeTab(props.id);
  }

  let className = "tab-list-item";

  if (activeTab === props.id) {
    className += " tab-list-active";
  }

  return (
    <div className={className} onClick={onClick}>
      <i className="icon-close-small-x" onClick={onCloseBtnClick} > </i>
      {props.label}
    </div>
  );
}