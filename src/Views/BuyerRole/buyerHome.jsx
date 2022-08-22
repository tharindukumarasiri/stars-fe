import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";

export default function BuyerHome() {
    const { changeActiveTab } = useContext(TabContext)

    const onClickCard = (navigate = '') => {
        changeActiveTab(navigate)
    }

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={'Buyer'} topIcon={'icon-buyer'} />
                <div className="g-col-9 p-l-20">
                    <h4>Buyer Role Space</h4>
                    <div>"Buyer" is a Role space, comes with several inbuilt functionalities.</div>
                    <div>1- Search Engine : you can use the this to search for products or service providers</div>
                    <div>2- Under Projects you can "Pick and link" search results to start a Project</div>
                    <div>3- You can monitor the project you Started under "Operations Management"</div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard name={"SEARCH ENGINE"} cardColour={"bg-vialot"} imageName={'icon-search-module'} onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_SEARCH)} />
                <NavigationCard name={"PROJECTS"} cardColour={"bg-green-lite"} imageName={'icon-projects'} onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_PROJECTS)} />
                <NavigationCard name={"OPERATIONS MANAGEMENT"} cardColour={"bg-green-dark"} imageName={'icon-op-manage'} />
            </div>
            <div className="g-row">
                <NavigationCard name={"PURCHASE CATALOGUES"} cardColour={"bg-blue-purple"} imageName={'icon-catalogs'} />
                <NavigationCard name={"PURCHASE ANALYZING TOOL"} cardColour={"bg-dark-blue"} imageName={'icon-purchase-analyze'} />
                <NavigationCard name={"SERVEY MODULE"} cardColour={"bg-light-dark-blue"} imageName={'icon-survey'} />
            </div>
        </>
    )
}