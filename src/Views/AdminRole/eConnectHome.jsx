import React, { useContext } from "react";
import { useTranslation } from 'react-i18next'

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";

const EConnectHome = () => {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();

    const onClickCard = (navigate = "") => {
        changeActiveTab(navigate);
    };

    return (
        <div className="page-container econnect">
            <div className="g-row m-b-20">
                <TitleCard title={t('ECONNECT')} topIcon={"icon-partners-1"} topBgColor={"bg-green-dark"} />
                <div className="g-col-9 p-l-20">
                    <h4 className="text-left">{t('ECONNECT_HOME_TITLE')}</h4>
                    <div className="g-row">
                        <div className="g-col-6">
                            <h5 className="text-left">{t('ECONNECT_HOME_COM_TYPE_TITLE')}</h5>
                            <p>{t('ECONNECT_HOME_COM_TYPE_MESSAGE')}</p><br></br>
                            <h5 className="text-left">{t('ECONNECT_HOME_COMUNICATIONS_TITLE')}</h5>
                            <p>{t('ECONNECT_HOME_COMUNICATIONS_MESSAGE')}</p><br></br>
                        </div>
                        <div className="g-col-6">
                            <h5 className="text-left">{t('ECONNECT_COM_BASKET_TITLE')}</h5>
                            <p>{t('ECONNECT_COM_BASKET_MESSAGE')}</p><br></br>
                            <h5 className="text-left">{t('ECONNECT_COM_LOGS_TITLE')}</h5>
                            <p>{t('ECONNECT_COM_LOGS_MESSAGE')}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={t('ECONNECT_HOME_NAV_CARD_TEMPLATE')}
                    cardColour={"bg-green-dark"}
                    imageName={"icon-templates"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.ADMIN_TEMPLATES)}
                />
                <NavigationCard
                    name={t('ECONNECT_HOME_NAV_CARD_BASKET')}
                    cardColour={"bg-green-dark1"}
                    imageName={"icon-baskets"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS_BASKET)}
                />
                <NavigationCard
                    name={t('ECONNECT_HOME_NAV_CARD_COM')}
                    cardColour={"bg-green-dark2"}
                    imageName={"icon-communications"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS)}
                />
                <NavigationCard
                    name={t('ECONNECT_HOME_NAV_CARD_LOGS')}
                    cardColour={"bg-green-dark3"}
                    imageName={"icon-log"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS_LOG)}
                />
            </div>
        </div>
    );
}

export default EConnectHome;