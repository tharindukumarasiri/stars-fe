import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";

export default function Tab(props) {
  const { activeTab, changeActiveTab, closeTab, openTabs  } = useContext(TabContext)

  const onClick = () => {
    changeActiveTab(props.label);
  };

  const onCloseBtnClick = (e) => {
    if(activeTab == props.label){
      changeActiveTab(openTabs[0])
    }
    e.stopPropagation();
    closeTab(props.label);
  }

  let className = "tab-list-item";

  if (activeTab === props.label) {
    className += " tab-list-active";
  }

  return (
    <div className={className} onClick={onClick}>
      <i className="icon-close-small-x" onClick={onCloseBtnClick} > </i>
      {props.label}
    </div>
  );
}