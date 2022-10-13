import React, { useContext } from "react";
import Tab from "./tab";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from 'react-i18next'

export default function Tabs(props) {
  const { activeTab, openTabs } = useContext(TabContext);
  const { t } = useTranslation();

  return (
    <div className="tabs">
      <ol className="tab-list" style={{ marginLeft: 0 }}>
        {props.children.map((child) => {
          const { label, id } = child.props;

          if (openTabs.indexOf(id) > -1)
            return (
              <Tab
                key={id}
                id={id}
                label={t(label)}
              />
            );
        })}
      </ol>
      <div className="tab-content g-row">
        {props.children.map((child) => {
          if (child.props.id !== activeTab) return null;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
