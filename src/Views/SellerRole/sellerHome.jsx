import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from 'react-i18next'
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";

export default function SellerHome() {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();

    const onClickCard = (navigate = "") => {
        changeActiveTab(navigate);
    };

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={t("SELLER")} topIcon={"icon-seller"} />
                <div className="g-col-9 p-l-20">
                    <h4>{t('SELLER_ROLE_SPACE')}</h4>
                    <div>"Seller" is the role where you can update your business categorization and classification of products and services to the markets.
                        We use CPV code (Common Procurement Vocabulary) which is used by  Governments, Public institutions, and Organizations in their procurement process.
                        <span className="">&nbsp;</span>
                        <ul>
                            <li>- Under <span className="bold">"Get Notified"</span>, you will find a comprehensive list of Standard CPV codes for easy reference and set matching for your business</li>
                            <li>- Under <span className="bold">"Matching Tenders"</span>, you will get the "Procurement notices" which is matching "your CPV codes" </li>
                            <li>- All public procurement notices will be listed under <span className="bold">"Golbal Tenders"</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={t("GET_NOTIFIED")}
                    cardColour={"bg-vialot"}
                    imageName={"icon-get-notified"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.SELLER_GET_NOTIFIED)}
                />
                <NavigationCard
                    name={t("MATCHING_TENDERS")}
                    cardColour={"bg-vialot-dark1"}
                    imageName={"icon-matching-tender"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.SELLER_MATCHING_TENDERS)}
                />
                <NavigationCard
                    name={t("GLOBAL_TENDER")}
                    cardColour={"bg-vialot-dark2"}
                    imageName={"icon-global-tenders"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.SELLER_GLOBAL_TENDER)}
                />
            </div>

        </>
    );
}
