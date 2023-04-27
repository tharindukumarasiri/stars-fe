import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import EmailEditor from "react-email-editor";
import { useTranslation } from "react-i18next";

import { updateMessageTemplates, insertMessageTemplates, getTriggerPoints } from "../../../services/templateService";
import { FetchCurrentCompany } from "../../../hooks/index";
import { FetchCurrentUser } from "../../../hooks/index";
import * as constants from "../../../utils/constants";
import Input from "../../../common/input";
import DropdownSelect from "../../../common/dropdown";

const CreateTemplate = ({ closeModal, getSavedTemplates, editTemplate }) => {
    const [loading, setLoading] = useState(true);
    const [selectedTemplateType, setSelectedTemplateType] = useState("Notification");
    const [templateName, setTemplateName] = useState("");
    const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();
    const emailEditorRef = useRef(null);
    const [triggerPoints, setTriggerPoints] = useState([]);
    const [triggerPoint, setTriggerPoint] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        if (editTemplate) {
            setTemplateName(editTemplate.DisplayName || "");
            setTriggerPoint(editTemplate.MessageTriggerPointId);
            setIsDefault(editTemplate.IsDefault);
            setSelectedTemplateType(getMessageTemplateTypeName(editTemplate.MessageTemplateTypeId));
        } else {
            setTemplateName("");
            setTriggerPoint("");
            setIsDefault(false);
        }
        onLoad();
    }, [editTemplate]);

    useEffect(() => {
        getTriggerPoints(getMessageTemplateType(selectedTemplateType)).then((t) => {
            setTriggerPoints(t);
        });
    }, [selectedTemplateType]);

    const onSave = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            const params = editTemplate
                ? {
                    ...editTemplate,
                    DisplayName: templateName,
                    MessageBody: html,
                    MessageBodyJson: JSON.stringify(design),
                    MessageTriggerPointId: triggerPoint,
                    IsDefault: isDefault,
                    Name: getTemplateName(),
                    MessageTypeId: getMessageType()
                }
                : {
                    MessageTriggerPointId: triggerPoint,
                    MessageMediumId: 1,
                    MessageTypeId: getMessageType(),
                    Name: getTemplateName(),
                    DisplayName: templateName,
                    MessageSubject: getMessageSubject(),
                    MessageBody: html,
                    MessageBodyJson: JSON.stringify(design),
                    LanguageId: 2057,
                    CompanyPartyId: selectedCompany?.tenantId,
                    IsSubTemplate: false,
                    MessageMedium: null,
                    MessageType: null,
                    LanguageMessageTemplates: [],
                    Id: 0,
                    CreatedDateTime: new Date(),
                    CreatedUserPartyId: currentUser?.PartyId,
                    DeletedDateTime: null,
                    DeletedUserPartyId: null,
                    IsDefault: isDefault,
                    MessageTemplateTypeId: getMessageTemplateType(),
                };

            saveTemplate(params);
            // console.log("export HTML:");
            // console.log({ html });
            // console.log("export JSON:");
            // console.log(design);
        });
    };

    const saveTemplate = (params) => {
        if (!templateName) {
            message.warning(t('MSG_TEMPLATE_NAME'));
            return;
        }
        if (!params.MessageTriggerPointId) {
            message.warning(t('MSG_TEMPLATE_TRIIGER_POINT'));
            return;
        }
        if (params.Id > 0) {
            updateMessageTemplates(params)
                .then((result) => {
                    getSavedTemplates();
                    message.success(t('MSG_TEMPLATE_SAVE'));
                    onCloseModal();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            insertMessageTemplates(currentUser?.PartyId, params)
                .then((result) => {
                    getSavedTemplates();
                    message.success(t('MSG_TEMPLATE_SAVE'));
                    onCloseModal();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const getMessageSubject = () => {
        switch (selectedTemplateType) {
            case "Notification":
                return "Notificaiton";
            case "Landing":
                return "Landing page";
            case "Business":
                return "Business communication";
            default:
                return "";
        }
    };

    const getMessageTemplateType = () => {
        switch (selectedTemplateType) {
            case "Notification":
                return constants.templateType.Notification;
            case "Landing":
                return constants.templateType.LandingPage;
            case "Business":
                return constants.templateType.Communication;
            default:
                return constants.templateType.Notification;
        }
    };

    const getMessageTemplateTypeName = (id) => {
        switch (id) {
            case constants.templateType.Notification:
                return "Notification";
            case constants.templateType.LandingPage:
                return "Landing";
            case constants.templateType.Communication:
                return "Business";
            default:
                return "Notification";
        }
    };

    const getTemplateName = () => {
        if (triggerPoint) {
            let tp = triggerPoints.find(t => t.Id === triggerPoint)
            if (tp)
                return tp.Name;
            else
                return "";
        }
        return "";
    }

    const getMessageType = () => {
        if (triggerPoint) {
            let tp = triggerPoints.find(t => t.Id === triggerPoint)
            if (tp) {
                if (tp.Name.toLowerCase().includes("user")) {
                    return 1;
                }
                else if (tp.Name.toLowerCase().includes("tender")) {
                    return 2;
                }
                else {
                    return 3;
                }
            }
            else
                return 1;
        }
        return "";
    }

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        if (emailEditorRef.current && emailEditorRef.current.editor) {
            if (editTemplate && editTemplate.MessageBodyJson)
                emailEditorRef.current.editor.loadDesign(JSON.parse(editTemplate.MessageBodyJson));
            else emailEditorRef.current.editor.loadBlank();
        }
    };

    const onReady = () => {
        // editor is ready
        setLoading(false);
    };

    const onCloseModal = () => {
        setTemplateName("");
        setTriggerPoint("");
        setIsDefault(false);
        if (emailEditorRef.current && emailEditorRef.current.editor) {           
            emailEditorRef.current.editor.loadBlank();
        }
        closeModal();
    }

    const dynamicParameters = [
        {
            name: "Name",
            value: "{{name}}",
            sample: "Name",
        },
        {
            name: "Tenant Name",
            value: "{{tenantName}}",
            sample: "Tenant Name",
        },
        {
            name: "User Name/s",
            value: "{{firstName}}",
            sample: "User Name/s",
        },
        {
            name: "Contact Person/s",
            value: "{{contact_person}}",
            sample: "Contact Person/s",
        },
        {
            name: "Roles",
            value: "{{userRole}}",
            sample: "Roles",
        },
        {
            name: "Client Name/s",
            value: "{{clientName}}",
            sample: "Client Name/s",
        },
        {
            name: "Company Name",
            value: "{{company_name}}",
            sample: "Company Name",
        },
        {
            name: "Custom Forms",
            value: "{{custom_forms}}",
            sample: "Custom Forms",
        },
        {
            name: "Codes",
            mergeTags: [
                {
                    name: "UNSPSC CODES",
                    value: "{{unspsc_codes}}",
                    sample: "UNSPSC CODES",
                },
                {
                    name: "CPV CODES",
                    value: "{{cpv_codes}}",
                    sample: "CPV CODES",
                },
            ],
        },
    ];

    const onTemplateTypeChange = (e) => {
        setSelectedTemplateType(e.target.name);
    };

    const onChangeTemplateName = (e) => {
        e.preventDefault();
        setTemplateName(e.target.value);
    };

    return (
        <div className={loading && "loading-overlay"}>
            {loading && (
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="g-row user-input-box m-b-10">
                <div className="g-col-5">
                    <Input value={templateName} placeholder='TEMPLATE_NAME' onChange={onChangeTemplateName} />
                </div>
                <div className="g-col-4"><DropdownSelect
                    values={triggerPoints}
                    placeholder='TRIGGER_POINT'
                    dataName="DisplayName"
                    valueName="Id"
                    selected={triggerPoint}
                    onChange={(e) => {
                        setTriggerPoint(e.target.value);
                    }}
                /></div>
                <div className="g-col-3">
                    <input type="checkbox" className="check-box m-t-10 m-l-5 m-b-20 fl"
                        checked={isDefault}
                        onChange={() => setIsDefault(pre => !pre)}
                    />
                    <div className="fl m-t-10 hover-hand " onClick={() => setIsDefault(pre => !pre)}>{t('MARK_AS_DEFAULT')}</div>
                </div>
            </div>
            <div className="m-l-5">
                <input
                    type="radio"
                    id="Notification"
                    name="Notification"
                    checked={selectedTemplateType === "Notification"}
                    onChange={onTemplateTypeChange}
                />{" "}
                <label className="p-r-20 p-l-20" htmlFor="Notification">
                    {t('NOTIFICATION_TEMPLATE')}
                </label>
                <input
                    type="radio"
                    id="Landing"
                    name="Landing"
                    checked={selectedTemplateType === "Landing"}
                    className="m-l-20"
                    onChange={onTemplateTypeChange}
                />{" "}
                <label className="p-r-20 p-l-20" htmlFor="Landing">
                    {t('LANDING_TEMPLATE')}
                </label>
                <input
                    type="radio"
                    id="Business"
                    name="Business"
                    checked={selectedTemplateType === "Business"}
                    className="m-l-20"
                    onChange={onTemplateTypeChange}
                />{" "}
                <label className="p-l-20" htmlFor="Business">
                    {t('BUSINESS_COM_TEMPLATE')}
                </label>
            </div>

            <div className="n-float" />

            <EmailEditor
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
                displayMode="email"
                minHeight={"50vh"}
                projectId={108663}
                options={{
                    mergeTags: dynamicParameters,
                }}
            />
            <div className="editor-name">
                <button className="secondary-btn m-r-20" onClick={onCloseModal}>
                    {t('CANCEL')}
                </button>
                <button className="primary-btn" onClick={onSave}>
                    {t('SAVE')}
                </button>
            </div>
        </div>
    );
};

export default CreateTemplate;
