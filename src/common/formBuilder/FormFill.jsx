import React, { useEffect, useState } from 'react'
import { message } from "antd";
import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore'
import Input from '../../common/input'
import DatePickerInput from '../datePickerInput.jsx';

import style from './FormBuilder.module.scss'
import { addFormResponse, updateFormResponse, getFormResponse } from "../../services/drawingService.js";

function FormFill({onCancel, currentUser, closeModal, onFormResponse}) {
    const formFillData = useDiagramStore((state) => state.formFillData);
    const formsData = useDiagramStore((state) => state.formsData);

    const selectedFormData = formsData?.find(form => form?.Id === formFillData?.Id )
    const [formDataList, setFormDataList] = useState(JSON.parse(selectedFormData?.FormData || '[]'))
    const [updateId, setUpdateId] = useState("")

    const formResponseId = `${formFillData.Id}_${formFillData.nodeId}`

    useEffect(() => {
        if(formResponseId)
            getFormResponse(formResponseId).then(result => {
                if(result?.[0]){
                    setUpdateId(result?.[0]?.Id)
                    setFormDataList(JSON.parse(result?.[0]?.FormData))
                }
            })
    },[])

    const onSave = () => {
        const payload = {
            FormId: formResponseId,
            FormData: JSON.stringify(formDataList)
        }

        if(updateId){
            payload.Id = updateId
            updateFormResponse(currentUser, payload).then((result) => {
                message.success("Your response updated successfully")            
                closeModal()
            }).catch(e => {
                message.error("Action failed please try again")
            })
        } else {
            addFormResponse(currentUser, payload).then((result) => {
                message.success("Your response saved successfully")    
                onFormResponse(formFillData?.Id)        
                closeModal()
            }).catch(e => {
                message.error("Action failed please try again")
            })
        }
    }

    const element = (item, index) => {
        switch (item.type) {
            case "text":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            placeholder="Text Input"
                            value={item?.response ?? ''}
                            onChange={(e) => {
                                e.preventDefault()
                                const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                                newFormDataList[index].response = e.target.value
                                setFormDataList(newFormDataList)
                            }}
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            lines={3}
                            placeholder="Text Area"
                            value={item?.response ?? ''}
                            onChange={(e) => {
                                e.preventDefault()
                                const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                                newFormDataList[index].response = e.target.value
                                setFormDataList(newFormDataList)
                            }}
                        />
                    </div>
                );
            case "number":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            placeholder="Number"
                            type="number"
                            value={item?.response ?? ''}
                            onChange={(e) => {
                                e.preventDefault()
                                const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                                newFormDataList[index].response = e.target.value
                                setFormDataList(newFormDataList)
                            }}
                        />
                    </div>
                );
            case "radio":
                return (
                    <div className={`${style.nameContainer} m-l-20`}>
                      <form onChange={(e)=> {
                        const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                        newFormDataList[index].response = e.target.value
                        setFormDataList(newFormDataList)
                      }}>
                      {item.options &&
                            item.options.length > 0 &&
                            item.options.map((opt) => {
                                return (
                                    <div key={opt?.id}>
                                        <input
                                            type="radio" id={opt?.id} name={item?.value} value={opt?.id} 
                                            checked={formDataList[index].response === opt?.id} />
                                        <label className="p-l-20" htmlFor={opt?.id} name={item?.value} value={opt?.id}>
                                            {opt?.value}
                                            </label>
                                    </div>
                                )
                            })

                        }
                      </form>
                    </div>
                );
            case "checkBox":
                return (
                    <div className={`${style.nameContainer} m-l-20`}>
                        <form onChange={(e)=> {
                        const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                        const itemIndex = newFormDataList[index]?.response?.indexOf(e.target.value) ?? -1

                        const newResponse = newFormDataList[index]?.response ?? []
                        if(itemIndex === -1){
                            newResponse.push(e.target.value)
                            newFormDataList[index].response = newResponse
                        } else {
                            newResponse.splice(itemIndex, 1)
                            newFormDataList[index].response = newResponse
                        }
                        setFormDataList(newFormDataList)
                      }}>
                        {item.options &&
                            item.options.length > 0 &&
                            item.options.map((opt, key) => {
                                return (
                                    <div className='flex-align-center m-b-10' key={opt?.id}>
                                        <input type="checkbox" className="check-box" id={opt?.id} name={item?.value} value={opt?.id} 
                                            checked={formDataList[index]?.response?.some(resp => resp === opt?.id)} />
                                        <span >{opt?.value}</span>
                                    </div>
                                )
                            })
                        }
                        </form>
                    </div>
                );
            case "dropDown":
                const dropDownData = item?.listData?.split(', ')
                return (
                    <div className={`${style.dateTimePickerContainer} m-l-20`}>
                        <select className={`dropdown-list ${style.selectContainer}`}
                        value={formDataList[index]?.response ?? ""}
                        onChange={(e) => {
                            e.preventDefault()
                            const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                            newFormDataList[index].response = e.target.value
                            setFormDataList(newFormDataList)
                        }}
                        >
                            {
                                dropDownData.map((item, index) => {
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                );
            case "date":
                return (
                    <div className={`${style.dateTimePickerContainer} m-l-20`}>
                        <DatePickerInput
                            placeholder='Select Date'
                            value={formDataList[index]?.response ? Date.parse(formDataList[index]?.response) :  ""}
                            onChange={(date) => { 
                                const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                                newFormDataList[index].response = date
                                setFormDataList(newFormDataList)}
                            }
                        />
                    </div>
                );
            case "time":
                return (
                    <div className={`${style.dateTimePickerContainer} m-l-20`}>
                        <DatePickerInput
                            placeholder='Select Time'
                            value={formDataList[index]?.response ? Date.parse(formDataList[index]?.response) :  ""}
                            onChange={(date) => { 
                                const newFormDataList = JSON.parse(JSON.stringify(formDataList))
                                newFormDataList[index].response = date
                                setFormDataList(newFormDataList)}
                            }
                            timePicker
                        />
                    </div>
                );

            default:
                return null

        }
    }

    return (
        <div className={style.formFillContainer}>
            <div className={style.formTitle}>{selectedFormData?.Title}</div>
            <div className='m-b-20 p-b-20'>{selectedFormData?.Description}</div>
            {formDataList?.map((formItem, index) => {
                return (
                    <div className='m-b-20' key={formItem?.id}>
                        <div className='m-b-10'>
                            {`${index + 1}. ${formItem?.value}`}
                            {formItem?.required &&
                                <span className='red'>*</span>
                            }
                        </div>
                        {element(formItem, index)}
                    </div>
                )
            })}
            <div className='flex-center-middle'>
                <button
                    className="secondary-btn m-r-20"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button className="add-btn"
                onClick={onSave}
                >Save</button>
            </div>
        </div>
    )
}

export default FormFill