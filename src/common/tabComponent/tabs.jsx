import React, { useContext } from "react";
import Tab from "./tab";
import { TabContext } from "../../utils/contextStore";

export default function Tabs(props) {
  const { activeTab, openTabs } = useContext(TabContext);

  return (
    <div className="tabs">
      <ol className="tab-list" style={{ marginLeft: 0 }}>
        {props.children.map((child) => {
          const { label } = child.props;
          if (openTabs.indexOf(label) > -1)
            return (
              <Tab
                key={label}
                label={label}
              />
            );
        })}
      </ol>
      <div className="tab-content g-row">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
