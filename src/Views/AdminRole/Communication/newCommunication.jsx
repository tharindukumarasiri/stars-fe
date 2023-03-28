import React, { useState, useEffect } from "react";
import { message } from "antd";

import Input from "../../../common/input";
import Dropdown from "../../../common/dropdown";
import image_thumb from "../../../assets/images/image_thumb.png";
import { GetCommunicationTemplatesByTenant } from "../../../services/templateService";
import { sendImmediately } from "../../../services/communicationService";
import { FetchCurrentCompany, FetchCurrentUser } from "../../../hooks/index";
import CompaniesAndPersonsNoBasket from "./companiesAndPersonsNoBasket";
import Editor from "react-simple-wysiwyg";

const NewCommunication = (props) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [template, setTemplate] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templateSubject, setTemplateSubject] = useState("");
    const [plainText, setPlainText] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();

    const getSavedTemplates = () => {
        setLoading(true);

        if (!props.showOnlyDefaultRecievers) {
            GetCommunicationTemplatesByTenant(selectedCompany.companyPartyId, 1)
                .then((result) => {
                    setTemplateList(result);
                })
                .finally(() => setLoading(false));
        } else {
            GetCommunicationTemplatesByTenant(selectedCompany.companyPartyId, 2)
                .then((result) => {
                    setTemplateList(result);
                })
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        if (selectedCompany && selectedCompany.companyPartyId) {
            getSavedTemplates();
        }
    }, [selectedCompany, props.showOnlyDefaultRecievers]);

    const onTemplateTypeChange = () => {
        setTemplate((pre) => !pre);
        setSelectedTemplate(null);
        setPlainText("");
    };

    const onSearchTemplateSubject = (e) => {
        e.preventDefault();
        setTemplateSubject(e.target.value);
    };

    const validate = () => {
        let validation = true;
        if (currentStep === 1) {
            if (template && !selectedTemplate) {
                message.error("Please select a message template");
                validation = false;
            }
            if (!templateSubject) {
                message.error("Please enter a message subject");
                validation = false;
            }
            if (!template && !plainText) {
                message.error("Please enter the message text");
                validation = false;
            }
        }

        return validation;
    };

    const onNextBtnClicked = () => {
        if (validate()) {
            setCurrentStep((pre) => pre + 1);
        }
    };

    const getUserCard = (recipient, removeFunction) => {
        return (
            <div className="user-card-container">
                <div className="user-card-header">
                    <img src={image_thumb} className="user-card-image-container" alt="img" />
                    <div className="m-l-15">
                        <div className="body-text-bold">{recipient.Name}</div>
                    </div>
                    <i className="icon-close-1 user-card-close-icon hover-hand" onClick={() => {removeFunction(recipient)}} />
                </div>

                <div className="m-t-20">
                    <div>
                        <i className="icon-email user-card-icon m-r-5" />
                        {recipient.Email}
                    </div>
                    {/* <div>
                        <i className="icon-phone user-card-icon  m-r-5" />
                    </div> */}
                </div>
            </div>
        );
    };

    const onSelect = (e) => {
        e.preventDefault();
        setSelectedTemplate(JSON.parse(e.target.value));
    };

    const updateRecipients = (newlyAddedRecipients) => {
        let clone = [...newlyAddedRecipients];
        newlyAddedRecipients.forEach((r) => {
            let email = r.Email;
            let index = selectedRecipients.findIndex(r => r.Email === email);
            if(index > -1){
                let foundAt = clone.findIndex(r => r.Email === email);
                clone.splice(foundAt, 1);
            }
        });
        setSelectedRecipients([...selectedRecipients, ...clone]);
    };

    const removeFromRecipients = (item) => {
        let newSet = [...selectedRecipients];
        let index = selectedRecipients.findIndex(r => r.Email === item.Email)
        if(index > -1)
            newSet.splice(index, 1)
        setSelectedRecipients(newSet);
    }

    const removeFromDefaultRecipients = (item) => {
        let newSet = [...props.defaultRecievers];
        let index = props.defaultRecievers.findIndex(r => r.Email === item.Email)
        if(index > -1)
            newSet.splice(index, 1)
        props.updateDefaultRecievers(newSet);
    }

    const sendNotifications = () => {
        let dto = {
            EntityPartyId: selectedCompany.companyPartyId,
            EntityName: selectedCompany.name,
            UserPartyId: currentUser?.PartyId,
            BasketReceivers: [],
            MessageTemplateId: selectedTemplate ? selectedTemplate.Id : null,
            MessageSubject: templateSubject,
            MessageBody: plainText
        };
       
        let companiesAndPersons = selectedRecipients.map(r => {
            return {
                CompanyPartyTId: r.CompanyPartyTId ? r.CompanyPartyTId : null,
                PersonPartyTId: r.PersonPartyTId ? r.PersonPartyTId : null,
                UserPartyId: null,
                Name: r.Name,
                Email: r.Email,
                IsReceiver: true
            }
        });

        let users = props.defaultRecievers ? props.defaultRecievers.map(u => {
            return {
                CompanyPartyTId: null,
                PersonPartyTId: null,
                UserPartyId: u.UserPartyId,
                Name: `${u.FirstName} ${u.LastName}` ,
                Email: u.Email,
                IsReceiver: true
            }
        }) : [];        
        dto.BasketReceivers = [...companiesAndPersons, ...users];
        if(dto.BasketReceivers.length === 0){
            message.error("No recipients selected!")
            return;
        }
        setLoading(true)
        sendImmediately(dto).then(() => {
            message.info("Messages sent to the selected recipients")
            props.closeTab();
        }).catch((ex) => { 
            setLoading(false); 
            message.error("Message sending failed!")
        }).finally(() => setLoading(false))
    }

    const getStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="new-com-sub-container">
                        <div className="m-t-20 m-b-20">
                            <input type="radio" id="Email" name="Email" checked={true} onChange={() => {}} />{" "}
                            <label className="p-r-20 p-l-20 m-r-20" htmlFor="Email">
                                Email
                            </label>
                            <input type="radio" id="SMS" name="SMS" disabled />{" "}
                            <label className="p-r-20 p-l-20 m-r-20 btn-disabled" htmlFor="SMS">
                                SMS
                            </label>
                            <input type="radio" id="Notification" name="Notification" disabled />{" "}
                            <label className="p-l-20 btn-disabled" htmlFor="Notification">
                                Push Notification
                            </label>
                        </div>
                        <div className="m-t-20 m-b-20">
                            <input type="radio" id="Template" name="Template" checked={template} onChange={onTemplateTypeChange} />{" "}
                            <label className="p-r-20 p-l-20 m-r-20" htmlFor="Template">
                                Template
                            </label>
                            <input type="radio" id="PlainHtml" name="PlainHtml" checked={!template} onChange={onTemplateTypeChange} />{" "}
                            <label className="p-l-20" htmlFor="PlainHtml">
                                Plain (basic html)
                            </label>
                        </div>
                        {template && (
                            <div className="new-com-drop-down-container m-t-20">
                                <Dropdown
                                    values={templateList}
                                    onChange={onSelect}
                                    selected={JSON.stringify(selectedTemplate || undefined)}
                                    placeholder="Template"
                                    dataName="DisplayName"
                                />
                            </div>
                        )}
                        <div className="com-search-input-container m-t-20">
                            <div className="new-com-input-container">
                                <Input placeholder="Subject" value={templateSubject} onChange={onSearchTemplateSubject} />
                            </div>
                        </div>

                        {!template && (
                            <div className="com-search-input-container m-t-20">
                                <div className="new-com-input-container">
                                    <Editor
                                        placeholder="Message body..."
                                        value={plainText}
                                        onChange={(e) => {
                                            setPlainText(e.target.value);
                                        }}
                                    />
                                    {/* <TextArea placeholder="Message body..." value={plainText} onChange={(e) => {setPlainText(e.target.value)}} /> */}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="new-com-sub-container">
                        <CompaniesAndPersonsNoBasket
                            defaultRecievers={props.defaultRecievers}
                            showOnlyDefaultRecievers={props.showOnlyDefaultRecievers}
                            updateRecipients={updateRecipients}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="new-com-sub-container">
                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    {selectedRecipients.map((r) => {
                                        return <div className="g-col-6">{getUserCard(r, removeFromRecipients)}</div>;
                                    })}
                                    {props.defaultRecievers.map((r) => {
                                        return <div className="g-col-6">{getUserCard(r, removeFromDefaultRecipients)}</div>;
                                    })}
                                </div>
                            </div>
                            <div className="g-col-6">
                                {selectedTemplate && <div dangerouslySetInnerHTML={{ __html: selectedTemplate?.MessageBody }} />}
                                {!selectedTemplate && plainText && <div className="container " dangerouslySetInnerHTML={{ __html: plainText }} />}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {loading && (
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="user-top-container">
                {currentStep === 2 && (
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
                )}
            </div>

            <div className="page-container new-com-page user-input-box">
                <div className="step-main-container">
                    <div
                        className={currentStep !== 1 ? "step-container m-b-20 disable-step" : "step-container m-b-20 "}
                        onClick={() => setCurrentStep(1)}
                    >
                        <div className="step-numb-container">01</div>
                        <h3 className="m-t-10">General Info.</h3>
                    </div>
                    <div
                        className={currentStep !== 2 ? "step-container m-b-20 disable-step" : "step-container m-b-20 "}
                        onClick={() => setCurrentStep(2)}
                    >
                        <div className="step-numb-container">02</div>
                        <h3 className="m-t-10">Receivers</h3>
                    </div>
                    <div
                        className={currentStep !== 3 ? "step-container m-b-20 disable-step" : "step-container m-b-20 "}
                        onClick={() => setCurrentStep(3)}
                    >
                        <div className="step-numb-container">03</div>
                        <h3 className="m-t-10">Preview</h3>
                    </div>
                </div>
                {getStepContent()}
                {currentStep === 3 ? (
                    <div className="next-btn-container">
                        <button className="secondary-btn m-r-20" onClick={() => { props.closeTab()}}>Cancel</button>
                        <button className="primary-btn m-l-10" onClick={() => { sendNotifications()}}>Send</button>
                    </div>
                ) : (
                    <div className="next-btn-container">
                        <button className="primary-btn" onClick={onNextBtnClicked}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default NewCommunication;
