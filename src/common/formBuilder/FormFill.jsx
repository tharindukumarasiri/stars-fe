import React from 'react'
import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore'
import Input from '../../common/input'
import DatePickerInput from '../datePickerInput.jsx';

import style from './FormBuilder.module.scss'

function FormFill() {
    const formFillData = useDiagramStore((state) => state.formFillData);
    const formsData = useDiagramStore((state) => state.formsData);

    const selectedFormData = formsData?.find(form => form?.Id === formFillData?.Id )

    const formDataList = JSON.parse(selectedFormData?.FormData || '[]');

    const element = (item) => {
        switch (item.type) {
            case "text":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            placeholder="Text Input"
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            lines={3}
                            placeholder="Text Area"
                        />
                    </div>
                );
            case "number":
                return (
                    <div className={style.nameContainer}>
                        <Input
                            placeholder="Number"
                            type="number"
                        />
                    </div>
                );
            case "radio":
                return (
                    <div className={`${style.nameContainer} m-l-20`}>
                        {item.options &&
                            item.options.length > 0 &&
                            item.options.map((opt, key) => {
                                return (
                                    <div key={opt?.id}>
                                        <input
                                            type="radio" id={opt?.id} name={opt?.id} />
                                        <label className="p-l-20" htmlFor={opt?.id}>{opt?.value}</label>
                                    </div>
                                )
                            })

                        }
                    </div>
                );
            case "checkBox":
                return (
                    <div className={`${style.nameContainer} m-l-20`}>
                        {item.options &&
                            item.options.length > 0 &&
                            item.options.map((opt, key) => {
                                return (
                                    <div className='flex-align-center m-b-10' key={opt?.id}>
                                        <input type="checkbox" className="check-box" id={opt?.id} name={opt?.id} />
                                        <span >{opt?.value}</span>
                                    </div>
                                )
                            })

                        }
                    </div>
                );
            case "dropDown":
                const dropDownData = item?.listData?.split(', ')
                return (
                    <div className={`${style.dateTimePickerContainer} m-l-20`}>
                        <select className={`dropdown-list ${style.selectContainer}`}>
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
                            onChange={() => { }}
                        />
                    </div>
                );
            case "time":
                return (
                    <div className={`${style.dateTimePickerContainer} m-l-20`}>
                        <DatePickerInput
                            placeholder='Select  Time'
                            onChange={() => { }}
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
                        {element(formItem)}
                    </div>
                )
            })}
            <div className='flex-center-middle'>
                <button
                    className="secondary-btn m-r-20"
                >
                    Cancel
                </button>
                <button className="add-btn"

                >Save</button>
            </div>
        </div>
    )
}

export default FormFill