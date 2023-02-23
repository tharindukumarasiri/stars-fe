import React, { useState } from "react";

import Input from '../../common/input'
import Dropdown from "../../common/dropdown";

const templateTypes = ['Admin Templates', 'Business Communications']

const NewCommunication = () => {
    const [template, setTemplate] = useState(true);
    const [searchTemplateText, setSearchTemplateText] = useState('');
    const [searchCompanyText, setSearchCompanyText] = useState('');
    const [templateType, setTemplateType] = useState(null)

    const onTemplateTypeChange = () => {
        setTemplate(pre => !pre)
    }

    const onSearchTemplate = (e) => {
        e.preventDefault();
        setSearchTemplateText(e.target.value);
    }

    const onFilterTemplate = () => {

    }

    const onChangeTemplateType = (e) => {
        e.preventDefault();
        setTemplateType(e.target.value);
    }

    const onSearchCompany = (e) => {
        e.preventDefault();
        setSearchCompanyText(e.target.value);
    }

    const onFilterCompany = () => {

    }

    return (
        <div className="page-container new-com-page user-input-box">
            <div className="new-com-sub-container">
                <div className="step-container m-b-20">
                    <div className="step-numb-container">
                        01
                    </div>
                    <h3 className="m-l-10">Select</h3>
                </div>
                <div className="m-t-20 m-b-20">
                    <input type="radio" id="Email" name="Email" checked={true} /> <label className="p-r-20 p-l-20 m-r-20" htmlFor="Email">Email</label>
                    <input type="radio" id="SMS" name="SMS" disabled /> <label className="p-r-20 p-l-20 m-r-20 btn-disabled" htmlFor="SMS">SMS</label>
                    <input type="radio" id="Notification" name="Notification" disabled /> <label className="p-l-20 btn-disabled" htmlFor="Notification">Push Notification</label>
                </div>
                <div className="m-t-20 m-b-20">
                    <input type="radio" id="Template" name="Template" checked={template} onChange={onTemplateTypeChange} /> <label className="p-r-20 p-l-20 m-r-20" htmlFor="Template">Template</label>
                    <input type="radio" id="PlainHtml" name="PlainHtml" checked={!template} onChange={onTemplateTypeChange} /> <label className="p-l-20" htmlFor="PlainHtml">Plain (basic html)</label>
                </div>
                <div className="com-search-input-container m-t-20">
                    <div className="new-com-input-container" >
                        <Input placeholder="Search Template" value={searchTemplateText} onChange={onSearchTemplate} endImage='icon-search-1' />
                    </div>
                    <button className="add-btn" onClick={onFilterTemplate} >Filters</button>
                </div>
                <div className="new-com-drop-down-container m-t-20" >
                    <Dropdown
                        values={templateTypes}
                        onChange={onChangeTemplateType}
                        selected={templateType}
                        placeholder="Template"
                    />
                </div>

            </div>
            <div className="new-com-sub-container">
                <div className="step-container m-b-20">
                    <div className="step-numb-container">
                        02
                    </div>
                    <h3 className="m-l-10">Receivers</h3>
                </div>
                <div className="com-search-input-container m-t-20">
                    <div className="new-com-input-container" >
                        <Input placeholder="Search for Company/ Contact Persons" value={searchCompanyText} onChange={onSearchCompany} endImage='icon-search-1' />
                    </div>
                    <button className="add-btn" onClick={onFilterCompany} >Filters</button>
                </div>
                <div className="new-com-drop-down-container m-t-20" >
                    <Dropdown
                        values={['Basket1']}
                        onChange={onChangeTemplateType}
                        selected={templateType}
                        placeholder="Basket"
                    />
                </div>
                <div className="receivers-header">Selected Receivers</div>
            </div>
        </div>
    )
}

export default NewCommunication;