import React from "react";
import { Tabs } from 'antd';
import { useTranslation } from "react-i18next";

import newsletter from "../../../assets/images/newsletter.png"
import { formatDate } from "../../../utils";
import TimeConfig from "../Components/timeConfig";
import CompaniesAndPersons from "./companiesAndPersons";

const { TabPane } = Tabs;

const CommunicationBasketDetails = ({ props }) => {
    const {t} = useTranslation();

    return (
        <>
            <div className="com-top-container">
                <div className="com-drop-down-width m-l-20">
                    {t('BASKET_ID')}
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    {t('BASKET_NAME')}
                    <div className="body-text-bold">{props?.Name}</div>
                </div>
                <div className="com-drop-down-width">
                    {t('CREATED_DATE')}
                    <div className="body-text-bold">{formatDate(props?.CreatedDateTime)}</div>
                </div>
                <div className="com-drop-down-width">
                    {t('BASKET_TYPE')}
                    <div className="body-text-bold">{props?.BasketType?.Name}</div>
                </div>
                <div className="com-drop-down-width">
                    {t('COMMUNICATION_TYPE')}
                    <div className="body-text-bold">{props?.CommunicationType}</div>
                </div>
                <div className="com-drop-down-width">
                    {t('STATUS')}
                    <div className="body-text-bold">{props?.BasketStatus?.Name}</div>
                </div>

            </div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" style={{ width: '90vw' }} >
                        <TabPane tab={t("GENERAL")} key="1">
                            <div className="basket-details-container">
                                <img src={newsletter} className="newsletter-img" />
                                <div className="basket-geneal-txt-container">
                                    <h2 className="text-left m-b-15">{props?.Name}</h2>
                                    <div>
                                        {props?.Description}
                                    </div>
                                </div>
                                <div className="general-content-container">
                                    <div className="general-btns-container">
                                        <div className="hover-hand m-r-20 p-r-20">
                                            <i className="icon-summary basket-table-icon blue" /> {t('VIEW_LOGS')}
                                        </div>
                                        <div className="hover-hand m-l-20">
                                            <i className="icon-config basket-table-icon blue" alt='img' /> {t('CONFIG')}
                                        </div>
                                    </div>
                                    <div className="general-type-container">
                                        <div className="text-center">{t('TYPE')}</div>
                                        <TimeConfig Id={props?.Id}  />
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={t("RECEVERS")} key="2">
                            <CompaniesAndPersons basketId={props?.Id} fromDateTime={props?.FromDateTime} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default CommunicationBasketDetails;