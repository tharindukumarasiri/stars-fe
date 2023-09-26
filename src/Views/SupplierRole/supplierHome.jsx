import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import TitleCard from "../../common/titleCard";
import NavigationCard from "../../common/navigationCard";
import { useTranslation } from "react-i18next";

const SupplierHome = () => {
    const { changeActiveTab } = useContext(TabContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClickCard = (nav = '') => {
        changeActiveTab(nav)
        navigate(ROUTES[nav])
    }

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={'Supplier'} topIcon={'icon-employees'} topBgColor='bg-bluish-green' />
                <div className="g-col-5 p-l-20">
                    <h2>{t('SUPPLIER_HONE_SUB_TITLE')}</h2>
                    <div>{t('SUPPLIER_HONE_DESCRIPTION')}</div>

                </div>
            </div>
            <div className="g-row">
                <NavigationCard name={"SUMMARY"} cardColour={"bg-bluish-green-dark"} imageName={'icon-summary'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_SUMMARY)} />
                <NavigationCard name={"UNSPSC"} cardColour={"bg-blue-purple"} imageName={'icon-unspsc'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_UNSPSC)} />
                <NavigationCard name={"CPV"} cardColour={"bg-blue"} imageName={'icon-cpv'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_CPV)} />
            </div>
            <div className="g-row">
                <NavigationCard name={"NACE"} cardColour={"bg-vialot"} imageName={'icon-nace'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_NACE)} />
                <NavigationCard name={"MARKETS"} cardColour={"bg-green-lite"} imageName={'icon-nuts'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_MARKET)} />
            </div>
        </>
    )
}

export default SupplierHome;