import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";

export default function Tab(props) {
  const { activeTab, changeActiveTab, closeTab, openTabs } = useContext(TabContext)

  const onClick = () => {
    changeActiveTab(props.id);
  };

  const onCloseBtnClick = (e) => {
    if (activeTab === props.id) {
      const closeTabIndex = openTabs.indexOf(activeTab);
      changeActiveTab(openTabs[closeTabIndex - 1]);
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
      {props.label}
      {openTabs?.length > 1 ?
        <i className="icon-x-bold m-l-5" onClick={onCloseBtnClick} /> : null
      }
    </div>
  );
}