import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";
import { useTranslation } from 'react-i18next'

export default function BuyerHome() {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();

    const onClickCard = (navigate = "") => {
        changeActiveTab(navigate);
    };

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={"Buyer"} topIcon={"icon-buyer"} />
                <div className="g-col-9 p-l-20">
                    <h4>{t('Buyer Role Space')}</h4>
                    <div>"Buyer" is a Role space, comes with several functionalities.</div>
                    <div>Buyers are always looking for sellers and suppliers. As a buyer, you want to buy the best from the nearest at the lowest cost. To find that, you need better options in searching for sellers and suppliers. As the STAR Digital Centre, we have worked to give you the best search engine for this. Not only we give you a search engine, but also, we provide you space to keep your search queries saved in projects so that you can reach the suppliers at any time you want.</div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={"SEARCH ENGINE"}
                    cardColour={"bg-vialot"}
                    imageName={"icon-search-module"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_SEARCH)}
                />
                <NavigationCard
                    name={"PROJECTS"}
                    cardColour={"bg-green-lite"}
                    imageName={"icon-projects"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_PROJECTS)}
                />
                {/* <NavigationCard name={"OPERATIONS MANAGEMENT"} cardColour={"bg-green-dark"} imageName={"icon-op-manage"} /> */}
            </div>
            {/* <div className="g-row">
                <NavigationCard name={"PURCHASE CATALOGUES"} cardColour={"bg-blue-purple"} imageName={"icon-catalogs"} />
                <NavigationCard name={"PURCHASE ANALYZING TOOL"} cardColour={"bg-dark-blue"} imageName={"icon-purchase-analyze"} />
                <NavigationCard name={"SERVEY MODULE"} cardColour={"bg-light-dark-blue"} imageName={"icon-survey"} />
            </div> */}
        </>
    );
}
