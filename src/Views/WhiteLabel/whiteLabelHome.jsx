import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";
import { useTranslation } from 'react-i18next'

export default function WhiteLabelHome() {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();

    const onClickCard = (navigate = "") => {
        changeActiveTab(navigate);
    };

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={t('WHITE_LABEL')} topIcon={"icon-buyer"} />
                <div className="g-col-9 p-l-20">
                    <h4>{t('White Label')}</h4>
                    <div>"White Label" Comes with several functionalities.</div>
                    <div>Provides a way to manage the private label</div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={"WHITE_LABEL"}
                    cardColour={"bg-green-lite"}
                    imageName={"icon-search-module"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_SEARCH)}
                />
               
               
            </div>
           
        </>
    );
}
