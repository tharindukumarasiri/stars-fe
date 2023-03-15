import React, { useState, useEffect } from "react";
import { message } from 'antd';

import Input from '../../common/input'
import Dropdown from "../../common/dropdown";
import image_thumb from "../../assets/images/image_thumb.png"
import { getTenantMessageTemplates } from "../../services/templateService";
import { FetchCurrentCompany, FetchCurrentUser } from "../../hooks/index";
import CompaniesAndPersons from "./companiesAndPersons";
import * as constants from "../../utils/constants";

const pageSize = 100

const NewCommunication = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [template, setTemplate] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [templateSubject, setTemplateSubject] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedCompany] = FetchCurrentCompany();

    const getSavedTemplates = () => {
        setLoading(true);

        getTenantMessageTemplates(selectedCompany.tenantId, constants.templateType.Notification, 1, pageSize).then(result => {
            setTemplateList(result.Value);
        }).finally(() => setLoading(false))

        // getTenantMessageTemplates(selectedCompany.tenantId, constants.templateType.LandingPage, 1, pageSize).then(result => {
        //     setLandingPageTemplates(result.Value);
        //     setlpTotal(result.Key)
        // }).catch(() => setLoading(false))

        // getTenantMessageTemplates(selectedCompany.tenantId, constants.templateType.Communication, 1, pageSize).then(result => {
        //     setCommunicationTemplates(result.Value);
        //     setbdTotal(result.Key);
        // }).catch(() => setLoading(false))
    }

    useEffect(() => {
        if (selectedCompany && selectedCompany.tenantId) {
            getSavedTemplates();
        }
    }, [selectedCompany]);

    const onTemplateTypeChange = () => {
        setTemplate(pre => !pre);
        selectedTemplate(null);
    }

    const onSearchTemplateSubject = (e) => {
        e.preventDefault();
        setTemplateSubject(e.target.value);
    }

    const validate = () => {
        let validation = true
        if (currentStep === 1 && template) {
            if (!selectedTemplate) {
                message.error('Please select a template');
                validation = false;
            }
            if (!templateSubject) {
                message.error('Please enter a template subject');
                validation = false
            }
        } else {

        }

        return validation;
    }

    const onNextBtnClicked = () => {
        if (validate()) {
            setCurrentStep(pre => pre + 1)
        }
    }

    const getUserCard = () => {
        return (
            <div className="user-card-container">
                <div className="user-card-header">
                    <img src={image_thumb} className="user-card-image-container" alt="img" />
                    <div className="m-l-15">
                        <div>
                            <span className="body-text-bold m-r-10">ID</span>
                            0043
                        </div>
                        <div className="body-text-bold">
                            Tone Fondevik
                        </div>
                        <div>
                            Manager
                        </div>
                    </div>
                    <i className="icon-close-1 user-card-close-icon hover-hand" />
                </div>

                <div className="m-t-20">
                    <div>
                        <i className="icon-email user-card-icon m-r-5" />
                        kail.a@compname.no
                    </div>
                    <div>
                        <i className="icon-phone user-card-icon  m-r-5" />
                        + 47 90 686 343
                    </div>
                </div>
            </div>
        )
    }

    const onSelect = (e) => {
        e.preventDefault();
        setSelectedTemplate(JSON.parse(e.target.value));
    };

    const getStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="new-com-sub-container">
                        <div className="m-t-20 m-b-20">
                            <input type="radio" id="Email" name="Email" checked={true} onChange={() => { }} /> <label className="p-r-20 p-l-20 m-r-20" htmlFor="Email">Email</label>
                            <input type="radio" id="SMS" name="SMS" disabled /> <label className="p-r-20 p-l-20 m-r-20 btn-disabled" htmlFor="SMS">SMS</label>
                            <input type="radio" id="Notification" name="Notification" disabled /> <label className="p-l-20 btn-disabled" htmlFor="Notification">Push Notification</label>
                        </div>
                        <div className="m-t-20 m-b-20">
                            <input type="radio" id="Template" name="Template" checked={template} onChange={onTemplateTypeChange} /> <label className="p-r-20 p-l-20 m-r-20" htmlFor="Template">Template</label>
                            <input type="radio" id="PlainHtml" name="PlainHtml" checked={!template} onChange={onTemplateTypeChange} /> <label className="p-l-20" htmlFor="PlainHtml">Plain (basic html)</label>
                        </div>
                        {template &&
                            <>
                                <div className="new-com-drop-down-container m-t-20" >
                                    <Dropdown
                                        values={templateList}
                                        onChange={onSelect}
                                        selected={JSON.stringify(selectedTemplate || undefined)}
                                        placeholder="Template"
                                        dataName="DisplayName"
                                    />
                                </div>
                                <div className="com-search-input-container m-t-20">
                                    <div className="new-com-input-container" >
                                        <Input placeholder="Subject" value={templateSubject} onChange={onSearchTemplateSubject} />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                )
            case 2:
                return (
                    <div className="new-com-sub-container">
                        <CompaniesAndPersons />
                    </div>
                )
            case 3:
                return (
                    <div className="new-com-sub-container">
                        {selectedTemplate &&
                            <div dangerouslySetInnerHTML={{ __html: selectedTemplate?.MessageBody }} />
                        }
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="user-top-container">
                {currentStep === 2 &&
                    <>
                        <div className="m-r-20 p-r-20">
                            <div className="m-l-20">Message ID</div>
                            <div className="body-text-bold m-l-20"></div>
                        </div>
                        <div className="m-r-20 p-r-20">
                            <div className="m-l-20">Subject</div>
                            <div className="body-text-bold m-l-20">{templateSubject}</div>
                        </div>
                        <div className="m-r-20 p-r-20">
                            <div className="m-l-20">Message Method</div>
                            <div className="body-text-bold m-l-20">Email</div>
                        </div>
                        <div className="m-r-20 p-r-20">
                            <div className="m-l-20 disable-div">Attachments</div>
                        </div>
                    </>
                }
            </div>

            <div className="page-container new-com-page user-input-box">
                <div className="step-main-container">
                    <div className={currentStep !== 1 ? 'step-container m-b-20 disable-step' : 'step-container m-b-20 '}
                        onClick={() => setCurrentStep(1)}
                    >
                        <div className="step-numb-container">
                            01
                        </div>
                        <h3 className="m-t-10">General Info.</h3>
                    </div>
                    <div className={currentStep !== 2 ? 'step-container m-b-20 disable-step' : 'step-container m-b-20 '}
                        onClick={() => setCurrentStep(2)}
                    >
                        <div className="step-numb-container">
                            02
                        </div>
                        <h3 className="m-t-10">Receivers</h3>
                    </div>
                    <div className={currentStep !== 3 ? 'step-container m-b-20 disable-step' : 'step-container m-b-20 '}
                        onClick={() => setCurrentStep(3)}
                    >
                        <div className="step-numb-container">
                            03
                        </div>
                        <h3 className="m-t-10">Preview</h3>
                    </div>
                </div>
                {getStepContent()}
                {currentStep === 3 ?
                    <div className="next-btn-container">
                        <button className="secondary-btn m-r-20">Cancel</button>
                        <button className="primary-btn m-l-10">Send</button>
                    </div>
                    : <div className="next-btn-container">
                        <button className="primary-btn" onClick={onNextBtnClicked}>Next</button>
                    </div>
                }

            </div>
        </>
    )
}

export default NewCommunication;