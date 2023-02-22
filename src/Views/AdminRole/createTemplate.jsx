import React, { useEffect, useRef, useState } from "react";
import { message } from 'antd';
import EmailEditor from 'react-email-editor';

import Input from '../../common/input'
import { updateMessageTemplates, insertMessageTemplates } from "../../services/templateService";
import { FetchCurrentCompany } from "../../hooks/index"
import { FetchCurrentUser } from "../../hooks/index"

const CreateTemplate = ({ closeModal, getSavedTemplates, editTemplate }) => {
    const [loading, setLoading] = useState(true);
    const [selectedTemplateType, setSelectedTemplateType] = useState('Notification');
    const [templateName, setTemplateName] = useState('');
    const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();
    const emailEditorRef = useRef(null);

    useEffect(() => {
        if(editTemplate){
            setTemplateName(editTemplate.DisplayName || '');           
        } 
        else {
            setTemplateName("");  
        }  
        onLoad();                
    }, [editTemplate]);

    const onSave = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            const params = editTemplate ? { ...editTemplate, 
                                            "DisplayName": templateName, 
                                            "MessageBody": html,
                                            "MessageBodyJson": JSON.stringify(design) }  : {
                "MessageTriggerPointId": 3,
                "MessageMediumId": 1,
                "MessageTypeId": getMessageType(),
                "Name": "Custom",
                "DisplayName": templateName, 
                "MessageSubject": getMessageSubject(),
                "MessageBody": html,
                "MessageBodyJson": JSON.stringify(design),
                "LanguageId": 2057,
                "TenantId": selectedCompany?.tenantId,
                "IsSubTemplate": false,
                "MessageTriggerPoint": null,
                "MessageMedium": null,
                "MessageType": null,
                "LanguageMessageTemplates": [],
                "Id": 0,
                "CreatedDateTime": new Date(),
                "CreatedUserPartyId": currentUser?.PartyId,
                "DeletedDateTime": null,
                "DeletedUserPartyId": null
            }

            saveTemplate(selectedCompany?.tenantId, params);
            console.log('export HTML:');
            console.log({ html })
            console.log('export JSON:');
            console.log(design)
        });
    };

    const saveTemplate = (tenantId, params) => {
        if(params.Id > 0){
            updateMessageTemplates(params).then(result => {
                getSavedTemplates();
                message.success('Template saved!');           
                closeModal();
            }).catch(err => {
                console.log(err)
            });
        }
        else{
            insertMessageTemplates(tenantId, params).then(result => {
                getSavedTemplates();
                message.success('Template saved!');           
                closeModal();
            }).catch(err => {
                console.log(err)
            });
        }       
    }

    const getMessageSubject = () => {
        switch (selectedTemplateType) {
            case 'Notification':
                return 'Notificaiton';
            case 'Landing':
                return 'Landing page';
            case 'Business':
                return 'Business communication';
            default:
                return '';
        }
    }

    const getMessageType = () => {
        switch (selectedTemplateType) {
            case 'Notification':
                return 2;
            case 'Landing':
                return 1;
            case 'Business':
                return 3;
            default:
                return 2;
        }
    }

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};        
        if(emailEditorRef.current && emailEditorRef.current.editor){
            if(editTemplate && editTemplate.MessageBodyJson)
                emailEditorRef.current.editor.loadDesign(JSON.parse(editTemplate.MessageBodyJson));
            else
                emailEditorRef.current.editor.loadBlank();
        }       
    }

    const onReady = () => {
        // editor is ready
        setLoading(false)
    };

    const dynamicParameters = [
        {
            name: "User Name/s",
            value: "{{firstName}}",
            sample: "User Name/s"
        },
        {
            name: "Contact Person/s",
            value: "{{contact_person}}",
            sample: "Contact Person/s"
        },
        {
            name: "Roles",
            value: "{{user_role}}",
            sample: "Roles"
        },
        {
            name: "Client Name/s",
            value: "{{client_name}}",
            sample: "Client Name/s"
        },
        {
            name: "Company Name",
            value: "{{company_name}}",
            sample: "Company Name"
        },
        {
            name: "Custom Forms",
            value: "{{custom_forms}}",
            sample: "Custom Forms"
        },
        {
            name: "Codes",
            mergeTags: [
                {
                    name: "UNSPSC CODES",
                    value: "{{unspsc_codes}}",
                    sample: "UNSPSC CODES"
                },
                {
                    name: "CPV CODES",
                    value: "{{cpv_codes}}",
                    sample: "CPV CODES"
                },
            ]
        },
    ]

    const onTemplateTypeChange = (e) => {
        setSelectedTemplateType(e.target.name)
    }

    const onChangeTemplateName = (e) => {
        e.preventDefault()
        setTemplateName(e.target.value);
    }

    return (
        <div className={loading && 'loading-overlay'}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div>
                <input type="radio" id="Notification" name="Notification" checked={selectedTemplateType === 'Notification'} onChange={onTemplateTypeChange} /> <label className="p-r-20 p-l-20" htmlFor="Notification">Notification Template</label>
                <input type="radio" id="Landing" name="Landing" checked={selectedTemplateType === 'Landing'} className="m-l-20" onChange={onTemplateTypeChange} /> <label className="p-r-20 p-l-20" htmlFor="Landing">Landing Page Template</label>
                <input type="radio" id="Business" name="Business" checked={selectedTemplateType === 'Business'} className="m-l-20" onChange={onTemplateTypeChange} /> <label className="p-l-20" htmlFor="Business">Business Communication Template</label>
            </div>
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} displayMode="email" minHeight={'65vh'}
                projectId={108663}
                options={{
                    mergeTags: dynamicParameters
                }}
                tools={
                    {
                        menu: {
                            enabled: false
                        },
                        html: {
                            enabled: false
                        }
                    }
                }
            />
            <div className="g-row">
                <div className="g-col-4"><Input value={templateName} placeholder="Template Name" onChange={onChangeTemplateName} /></div>
                <button className="primary-btn g-col-1 m-r-20" onClick={onSave} >Save</button>
                <button className="secondary-btn g-col-1" onClick={closeModal} >Cancel</button>
            </div>
        </div>

    )
}

export default CreateTemplate;