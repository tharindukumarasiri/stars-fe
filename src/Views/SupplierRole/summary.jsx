import React, { useEffect, useState, useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import Expandable from "./Components/expandable";
import NavigationCard from "../../common/navigationCard";
import { getOrganization } from "../../services/organizationsService";
import UserSelectedFields from "./Components/userSelectedFields";

const Summary = () => {
    const [expandedItem, setExpandedItem] = useState('');
    const { changeActiveTab, organizationData, setOrganizationData } = useContext(TabContext);

    const onClickCard = (navigate = '') => {
        changeActiveTab(navigate)
    }

    useEffect(() => {
        getOrganization().then(result => {
            setOrganizationData(result)
        });
    }, []);

    const UnspscData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Segmant', 'Family', 'Class', 'Commodity']} />
                <UserSelectedFields data={organizationData.unspscs} dataFeieldName='title' />
            </>
        )
    }

    const CpvData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} />
                <UserSelectedFields data={organizationData.cpvs} />
            </>
        )
    }

    const NaceData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} />
                <UserSelectedFields data={organizationData.naces} />
            </>
        )
    }

    return (
        <>
            <div className="g-row m-l-10">
                <i className="icon-summary header-icon m-t-10 m-r-15 fl" />
                <h3 className="m-t-20">SUMMARY</h3>
            </div>
            <div className="page-container">
                <div className="g-row">
                    <NavigationCard name={"UNSPSC CODES"} cardColour={"bg-blue-purple"} value={organizationData.unspscs?.length} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_UNSPSC)} />
                    <NavigationCard name={"CPV CODES"} cardColour={"bg-blue"} value={organizationData.cpvs?.length} />
                    <NavigationCard name={"NACE CODES"} cardColour={"bg-vialot"} value={organizationData.naces?.length} />
                    <NavigationCard name={"MARKETS"} cardColour={"bg-green-lite"} />
                </div>
                <Expandable title={"UNSPSC (United Nations Standard Products and Services Code )"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='UNSPSC' >
                    <UnspscData />
                </Expandable>
                <Expandable title={"CPV"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='CPV' >
                    <CpvData />
                </Expandable>
                <Expandable title={"NACE"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='NACE' >
                    <NaceData />
                </Expandable>
                <Expandable title={"Markets"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='MKT' />
            </div>
        </>
    )
}

export default Summary;