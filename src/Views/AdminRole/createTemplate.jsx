import React, { useRef, useState } from "react";
import { message } from 'antd';
import EmailEditor from 'react-email-editor';

import Input from '../../common/input'
import { updateMessageTemplates } from "../../services/userService";
import { FetchCurrentCompany } from "../../hooks/index"

const CreateTemplate = ({ closeModal }) => {
    const [loading, setLoading] = useState(true);
    const [selectedTemplateType, setSelectedTemplateType] = useState('Notification');
    const [templateName, setTemplateName] = useState('');

    const [selectedCompany] = FetchCurrentCompany();

    const emailEditorRef = useRef(null);

    const onSave = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            const params = {
                "Name": templateName,
                "MessageBody": html,
                "TenantId": selectedCompany?.tenantId,
                "CreatedDateTime": new Date(),
            }

            updateMessageTemplates(selectedCompany?.tenantId, params).then(result => {
                message.success('Template saved!');
                console.log(result)
            }).catch(err => {
                console.log(err)
            })

            console.log('export HTML:');
            console.log({ html })
            console.log('export JSON:');
            console.log(design)
        });




    };

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    }

    const onReady = () => {
        // editor is ready
        setLoading(false)
    };

    const dynamicParameters = [
        {
            name: "User Name/s",
            value: "{{full_name}}",
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
        <div>
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
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} displayMode="email" minHeight={'70vh'}
                projectId={108663}
                options={{
                    mergeTags: dynamicParameters
                }}
                tools={
                    {
                        menu: {
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