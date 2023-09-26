import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES, ROUTES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";
import { useTranslation } from 'react-i18next'

export default function BuyerHome() {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClickCard = (nav = "") => {
        changeActiveTab(nav);
        navigate(ROUTES[nav])
    };

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={"Buyer"} topIcon={"icon-buyer"} />
                <div className="g-col-9 p-l-20">
                    <h4>{t('BUYER_ROLE_SPACE')}</h4>
                    <div>{t('BUYER_HEADER_1')}</div>
                    <div>{t('BUYER_HEADER_2')}</div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={"SEARCH_ENGINE"}
                    cardColour={"bg-vialot"}
                    imageName={"icon-search-module"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_SEARCH)}
                />
                <NavigationCard
                    name={"PROJECTS"}
                    cardColour={"bg-vialot-dark1"}
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
