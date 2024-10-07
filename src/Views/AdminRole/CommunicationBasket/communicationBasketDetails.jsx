import React, { useState, useRef, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message, Badge } from "antd";

import { useTimeConfigStore } from '../adminRoleStore'

import TimeConfig from "../Components/timeConfig";
import CompaniesAndPersons from "./companiesAndPersons";
import Input from "../../../common/input";
import Dropdown from "../../../common/dropdown";
import image_thumb from "../../../assets/images/image_thumb.png";
import { joinAsCompanySendImmediatly, sendImmediately, activateSchedule, deActivateSchedule } from "../../../services/communicationService";
import { GetCommunicationTemplatesByTenant } from "../../../services/templateService";

import { NAVIGATION_PAGES } from "../../../utils/enums";
import { messageTriggerPoints, schedulingTypes } from "../../../utils/constants";

import { TabContext, UserContext } from "../../../utils/contextStore";

const CommunicationBasketDetails = ({ props }) => {
    const schedulingType = useTimeConfigStore((state) => state.schedulingType);

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [templatesData, setTemplatesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [basketDetails, setBasketDetails] = useState({
        "name": props?.Name ?? "",
        "description": props?.Description,
        "template": {},
        "basketStatusId": props?.BasketStatusId
    });
    const [basketDataErrors, setBasketDataErrors] = useState({ name: '', template: '' })
    const [isSheduleActive, setIsSheduleActive] = useState(props?.IsScheduled || false)

    const { t } = useTranslation();
    const { changeActiveTab, closeTab } = useContext(TabContext)
    const { selectedCompany, currentUser } = useContext(UserContext);
    const TIME_CONFIG_REF = useRef();

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            GetCommunicationTemplatesByTenant(selectedCompany?.companyPartyId, 1).then(result => {
                setTemplatesData(result)

                const selectedTemplate = result?.filter(template => template?.Id === props?.MessageTemplateId)[0]
                setBasketDetails({ ...basketDetails, "template": selectedTemplate })
            });

        }
    }, [selectedCompany])

    const updateRecipientsWithNew = (newlyAddedRecipients) => {
        setSelectedRecipients([...newlyAddedRecipients]);
    };

    const removeFromRecipients = (item) => {
        let newSet = [...selectedRecipients];
        let index = selectedRecipients.findIndex(r => r.Email === item.Email)
        if (index > -1)
            newSet.splice(index, 1)
        setSelectedRecipients(newSet);
    }

    const onCloseTab = () => {
        closeTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS)
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET);
    }

    const sendNotifications = () => {
        setLoading(true)

        if (schedulingType !== schedulingTypes.IMMIDIATE) {
            activateSchedule(props?.Id).then(() => {
                setLoading(false)
                message.success(t('MESSAGE_SENT_RECIPIENTS'))
                onCloseTab();
            }).catch((ex) => {
                setLoading(false);
                message.error(t('MESSAGE_SEND_FAIL_ERROR'))
            })
            return;
        }

        let dto = {
            EntityId: selectedCompany.companyPartyId,
            EntityName: selectedCompany.name,
            UserId: currentUser?.Id,
            BasketReceivers: [],
            MessageTemplateId: basketDetails.template ? basketDetails.template.Id : null,
        };

        let companiesAndPersons = selectedRecipients.map(r => {
            return {
                CompanyPartyTId: r.CompanyPartyTId ? r.CompanyPartyTId : null,
                PersonPartyTId: r.PersonPartyTId ? r.PersonPartyTId : null,
                UserId: null,
                Name: r.Name,
                Email: r.Email,
                IsReceiver: true
            }
        });

        dto.BasketReceivers = [...companiesAndPersons];

        if (dto.BasketReceivers.length === 0) {
            message.error(t("NO_RECIPIENTS_ERROR"))
            return;
        }

        let sendFunc = basketDetails.template?.MessageTriggerPointId === messageTriggerPoints.CompanyInvitation ? joinAsCompanySendImmediatly : sendImmediately;

        sendFunc(dto).then(() => {
            message.success(t('MESSAGE_SENT_RECIPIENTS'))
            onCloseTab();
        }).catch((ex) => {
            setLoading(false);
            message.error(t('MESSAGE_SEND_FAIL_ERROR'))
        }).finally(() => setLoading(false))
    }

    const validate = () => {
        let validation = true;
        if (!basketDetails.name) {
            setBasketDataErrors(pre => ({ ...pre, name: 'Enter basket name' }));
            validation = false;
        }
        if (Object.keys(basketDetails.template)?.length === 0) {
            setBasketDataErrors(pre => ({ ...pre, template: 'Please select a template' }));
            validation = false;
        }

        return validation;
    }

    const onNextButton = () => {
        switch (currentStep) {
            case 1:
                if (validate())
                    TIME_CONFIG_REF.current.onUpdate();
                break;
            case 2:
                setCurrentStep(3);
                break;
            case 3:
                sendNotifications()
                break;
            default:
                break
        }
    }

    const onCancel = () => {
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET)
        closeTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS)
    }

    const onclickStop = () => {
        setLoading(true)
        deActivateSchedule(props?.Id).then(() => {
            setLoading(false)
            message.success('Deactivated')
            setIsSheduleActive(false)
            onCloseTab();
        }).catch((ex) => {
            setLoading(false);
            message.error('Action failed please try again')
        })
    }

    const onPrevious = () => setCurrentStep(pre => --pre)

    const onChangeBasketDetails = (e, key) => {
        e.preventDefault();
        setBasketDataErrors((pre) => ({ ...pre, [key]: '' }));
        setBasketDetails(pre => ({ ...pre, [key]: e.target.value }))
    }

    const onChangeTemplate = (e) => {
        e.preventDefault();
        setBasketDataErrors((pre) => ({ ...pre, template: '' }));
        setBasketDetails((pre) => ({ ...pre, template: JSON.parse(e.target.value) }));
    }

    const getUserCard = (recipient, removeFunction) => {
        return (
            <div className="user-card-container">
                <div className="user-card-header">
                    <img src={image_thumb} className="user-card-image-container" alt="img" />
                    <div className="m-l-15">
                        <div className="body-text-bold">{recipient?.Name}</div>
                    </div>
                    <i className="icon-close-1 user-card-close-icon hover-hand" onClick={() => { removeFunction(recipient) }} />
                </div>

                <div className="m-t-20">
                    <div>
                        <i className="icon-email user-card-icon m-r-5" />
                        {recipient?.Email}
                    </div>
                </div>
            </div>
        );
    };

    const basketDetailContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="g-row basket-detail-genaral-body">
                        <div className="g-col-5 basket-detail-genaral-body-left">
                            <div className="basket-detail-id-container">
                                <div>
                                    <div className="fl">Basket ID :</div>
                                    <div className="fl bold m-l-10">{props?.Id}</div>
                                </div>
                                {schedulingType === schedulingTypes.RECURRING &&
                                    <Badge className='fr' status={isSheduleActive ? "success" : "default"} text={isSheduleActive ? "Active" : "Inactive"} />
                                }
                            </div>
                            <div className="m-b-20">
                                <Input placeholder='Basket Name' value={basketDetails.name} onChange={(e) => onChangeBasketDetails(e, 'name')} error={basketDataErrors.name} />
                            </div>
                            <div className="m-b-20">
                                <Input placeholder='Description' value={basketDetails.description} onChange={(e) => onChangeBasketDetails(e, 'description')} lines={6} />
                            </div>
                            <Dropdown
                                values={templatesData}
                                onChange={onChangeTemplate}
                                selected={JSON.stringify(basketDetails.template || undefined)}
                                placeholder="Template"
                                dataName="DisplayName"
                                error={basketDataErrors.template}
                            />
                        </div>
                        <div className="g-col-5">
                            <TimeConfig
                                ref={TIME_CONFIG_REF}
                                basketDetails={basketDetails}
                                Id={props?.Id}
                                setCurrentStep={setCurrentStep}
                            />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <CompaniesAndPersons basketId={props?.Id} basketDetails={basketDetails} updateRecipients={updateRecipientsWithNew} selectedTemplate={basketDetails.template} />
                )
            case 3:
                return (
                    <div className="g-row p-b-20 m-b-20">
                        {schedulingType === schedulingTypes.IMMIDIATE &&
                            <div className="g-col-6">
                                <div className="g-row">
                                    {selectedRecipients.map((r) => {
                                        return <div className="g-col-6">{getUserCard(r, removeFromRecipients)}</div>;
                                    })}
                                </div>
                            </div>
                        }
                        <div className={`${schedulingType === schedulingTypes.IMMIDIATE ? 'g-col-6' : ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: basketDetails.template?.MessageBody }} />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            <div className="page-container">
                {loading &&
                    <div className="loading center-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                <div className="g-row">
                    {schedulingType === schedulingTypes.RECURRING &&
                        <button className={`primary-btn fr m-l-10 ${!isSheduleActive ? 'disable-div' : ''}`} onClick={onclickStop} >Stop</button>
                    }
                    <button className="primary-btn fr" onClick={onNextButton} >{currentStep === 3 ? 'Submit' : 'Next'}</button>
                    {currentStep !== 1 &&
                        <button className="secondary-btn fr m-r-10" onClick={onPrevious} >Previous</button>
                    }
                    {currentStep !== 2 &&
                        <button className="secondary-btn fr m-r-10" onClick={onCancel} >Cancel</button>
                    }
                </div>
                <div className="g-row flex-center-middle m-t-10">
                    <div className="flex-center-middle basket-stepper-container">
                        <div className={`g-col-3 h6 bold text-center ${currentStep === 1 ? 'grey' : 'blue'}`}>General</div>
                        <i className="icon-circle-arrow-r2 g-col-1 text-center blue arrow-icon-lg" />
                        <div className={`g-col-3 h6 bold text-center ${currentStep === 2 ? 'grey' : 'blue'}`}>Receivers</div>
                        <i className="icon-circle-arrow-r2 g-col-1 text-center blue arrow-icon-lg" />
                        <div className={`g-col-3 h6 bold text-center ${currentStep === 3 ? 'grey' : 'blue'}`}>Preview</div>
                    </div>
                </div>

                {basketDetailContent()}

            </div>
        </>
    )
}

export default CommunicationBasketDetails;