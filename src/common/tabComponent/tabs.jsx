import React, { useContext } from "react";
import Tab from "./tab";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from 'react-i18next'

export default function Tabs(props) {
  const { params, activeTab, openTabs } = useContext(TabContext);
  const { t } = useTranslation();

  const children = props.children

  return (
    <div className="tabs">
      <ol className="tab-list" style={{ marginLeft: 0 }}>
        {openTabs.map((id) => {
          const splitId = id?.split(':')
          const getId = () => {
            if (splitId?.length > 1) {
              return splitId[1];
            } else {
              return children?.find(child => child.props?.id === splitId[0])?.props?.label
            }
          }

          return (
            <Tab
              key={id}
              id={id}
              label={t(getId())}
            />
          );
        })}
      </ol>
      {openTabs.map((id) => {
        const content = children?.find(child => child?.props?.id === id?.split(':')[0])?.props?.children
        const contentWithParams = React.cloneElement(content, { props: params ? params[id] : {} })

        return (
          <div className="tab-content g-row" style={{ display: id !== activeTab ? 'none' : '' }} key={id}>
            {
              contentWithParams
            }
          </div>
        )
      })
      }
    </div>
  );
}