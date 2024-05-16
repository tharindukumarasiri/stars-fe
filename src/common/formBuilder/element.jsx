import { DeleteOutlined } from '@ant-design/icons';

import { getId } from "./utils.js";
import Input from '../../common/input'
import DatePickerInput from '../datePickerInput.jsx';

import style from './FormBuilder.module.scss'

const Element = ({ item, addOption, handleOptionValues, deleteOption, handleListData }) => {
    const createNewOption = (id) => {
        const data = {
            id: getId(),
            value: "",
        };
        addOption(id, data);
    };

    switch (item.type) {
        case "text":
            return (
                <div className={style.nameContainer}>
                    <Input
                        placeholder="Text Input"
                        disabled
                    />
                </div>
            );
        case "textarea":
            return (
                <div className={style.nameContainer}>
                    <Input
                        lines={3}
                        placeholder="Text Area"
                        disabled
                    />
                </div>
            );
        case "number":
            return (
                <div className={style.nameContainer}>
                    <Input
                        placeholder="Number"
                        disabled
                    />
                </div>
            );
        case "radio":
            return (
                <div className={style.nameContainer}>
                    {item.options &&
                        item.options.length > 0 &&
                        item.options.map((opt, key) => {
                            return (
                                <div className={style.radioOptionContainer} key={opt?.id}>
                                    <div className={style.radioOption}>
                                        <Input
                                            placeholder={`Radio Option ${key + 1}`}
                                            value={opt?.value}
                                            onChange={(e) =>
                                                handleOptionValues(item?.id, opt?.id, e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={`${style.optionsIcons} m-t-5`}
                                        onClick={() => deleteOption(item.id, opt?.id)}>
                                        <DeleteOutlined />
                                    </div>
                                </div>
                            )
                        })

                    }

                    <div className={style.addOptionBtn} onClick={() => createNewOption(item.id)}>
                        ADD OPTION
                    </div>
                </div>
            );
        case "checkBox":
            return (
                <div className={style.nameContainer}>
                    {item.options &&
                        item.options.length > 0 &&
                        item.options.map((opt, key) => {
                            return (
                                <div className={style.radioOptionContainer} key={opt?.id}>
                                    <div className={style.radioOption}>
                                        <Input
                                            placeholder={`Check Box Option ${key + 1}`}
                                            value={opt?.value}
                                            onChange={(e) =>
                                                handleOptionValues(item?.id, opt?.id, e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={`${style.optionsIcons} m-t-5`}
                                        onClick={() => deleteOption(item.id, opt?.id)}>
                                        <DeleteOutlined />
                                    </div>
                                </div>
                            )
                        })

                    }

                    <div className={style.addOptionBtn} onClick={() => createNewOption(item.id)}>
                        ADD OPTION
                    </div>
                </div>
            );
        case "dropDown":
            return (
                <div className={style.nameContainer}>
                    <div className='m-b-5'>
                        Add list items comma separated ex: <span className='bold'>Oslo, Bergen, Trondheim</span>
                    </div>
                    <Input
                        placeholder="List of items"
                        lines={3}
                        value={item?.listData || ''}
                        onChange={(e) => { handleListData(item?.id, e) }}
                    />
                </div>
            );
        case "date":
            return (
                <div className={style.dateTimePickerContainer}>
                    <DatePickerInput
                        placeholder='Select Date'
                        disabled
                        onChange={() => { }}
                    />
                </div>
            );
        case "time":
            return (
                <div className={style.dateTimePickerContainer}>
                    <DatePickerInput
                        placeholder='Select  Time'
                        disabled
                        onChange={() => { }}
                        timePicker
                    />
                </div>
            );

        default:
            return null

    }
}

export default Element