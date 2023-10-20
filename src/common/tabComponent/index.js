import Tabs from "./tabs"

export const changeTab = ({ tab, params = null, label = '', multiple = false, openTabs = [], setOpenTabs, setActiveTab, setParams }) => {
    const tabId = tab?.split(':')?.length > 1 || !multiple ? tab : `${tab}:${label}`

    if (openTabs.indexOf(tab) < 0 || multiple) {
        const newOpenTabs = Array.from(openTabs)

        newOpenTabs.push(tabId);
        setOpenTabs(newOpenTabs);
    }
    if (params)
        setParams(pre => ({ ...pre, [tabId]: params }))
    setActiveTab(tabId);
};

export const tabClose = ({ tab, openTabs, haveUnsavedDataRef = null, shouldBeClosed, setOpenTabs }) => {
    const index = openTabs.indexOf(tab);
    if (haveUnsavedDataRef?.current) {
        shouldBeClosed.current = { state: true, tab };
    } else if (index > -1 && openTabs.length > 0) {
        const newOpenTabs = Array.from(openTabs)
        newOpenTabs.splice(index, 1)
        setOpenTabs(newOpenTabs)
    }
}

export default Tabs 