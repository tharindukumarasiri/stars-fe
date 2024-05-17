import React, { useState } from "react";
import Nestable from "react-nestable";
import { HolderOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

import { getId } from "./utils.js";
import { formEl, formCategories, formSubCategories } from "./constants.js";
import Header from "./Header.jsx";
import Element from "./element.jsx";
import Input from '../../common/input'
import Dropdown from '../dropdown.jsx';

import style from './FormBuilder.module.scss'
import 'react-nestable/dist/styles/index.css';

const FormBuilder = ({ screenContainerStyle }) => {
    const initVal = formEl[0]?.value;

    //State
    const [title, setTitle] = useState("Untitled Form");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState("text");

    const items = data;

    const onChangeTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    //Function to add new element
    const addElement = () => {
        const data = {
            id: getId(),
            value: null,
            type: formData,
            required: false,
        };
        setData((prevState) => [...prevState, data]);
        setFormData(initVal);
    };

    //Function to delete element
    const deleteEl = (id) => {
        setData((prevState) => prevState.filter((val) => val.id !== id));
    };

    //Function to add element at specific pos and return arr
    const addAfter = (elArray, index, newEl) => {
        return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
    };

    //Function to duplicate element
    const duplicateElement = (item) => {
        let elIdx = data.findIndex((el) => el.id === item.id);
        let newEl = {
            id: getId(formData),
            value: item?.value,
            type: item.type,
            required: item?.required,
            options: item?.options
        }
        let newArr = addAfter(data, elIdx, newEl)
        setData(newArr)
    };

    //Function to handle sorting of elements
    const handleOnChangeSort = ({ items }) => {
        setData(items);
    };

    //Function to Handle Input Values
    const handleValue = (id, e) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, value: e.target.value };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Required
    const handleRequired = (id) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, required: !el.required };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Element Type
    const handleElType = (id, type) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, type: type };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Options
    const addOption = (id, newOption) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                const objVal = "options" in el ? el?.options : [];
                return { ...el, options: [...objVal, newOption] };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Drop Down
    const handleListData = (id, e) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, listData: e.target.value };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Change Option Values
    const handleOptionValues = (elId, optionId, optionVal) => {
        let newArr = data.map((el) => {
            if (el.id == elId) {
                el?.options &&
                    el?.options.map((opt) => {
                        if (opt.id == optionId) {
                            opt.value = optionVal;
                        }
                    });
                return el;
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Delete Option
    const deleteOption = (elId, optionId) => {
        let newArr = data.map((el) => {
            if (el.id == elId) {
                let newOptions =
                    el?.options && el?.options.filter((opt) => opt.id != optionId);
                return { ...el, options: newOptions };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Render items
    const renderElements = ({ item }) => {
        return (
            <div className={style.itemContainer}>
                <div className={style.dragIndicatorContainer}>
                    <HolderOutlined rotate={90} />
                </div>
                <div className={style.nameTypeRow}>
                    <div className={style.nameContainer}>
                        <Input
                            placeholder="Question"
                            value={item.value || ''}
                            onChange={(e) => handleValue(item.id, e)}
                        />
                    </div>
                    <Dropdown
                        values={formEl}
                        selected={item.type}
                        onChange={(e) => handleElType(item.id, e.target.value)}
                        dataName="label"
                        valueName="value"
                    />
                </div>
                <div className={style.nameTypeRow}>
                    <Element
                        item={item}
                        addOption={addOption}
                        handleOptionValues={handleOptionValues}
                        deleteOption={deleteOption}
                        handleListData={handleListData}
                    />
                    <div className={style.hiddenElm}>
                        <Dropdown
                            values={formEl}
                            selected={'text'}
                            onChange={() => { }}
                            dataName="label"
                        />
                    </div>
                </div>
                <div className={`${style.nameTypeRow} m-t-20`}>
                    <div className={style.optionsIcons}>
                        <DeleteOutlined onClick={() => deleteEl(item.id)} />
                    </div>
                    <div className={style.optionsIcons}>
                        <CopyOutlined onClick={() => duplicateElement(item)} />
                    </div>
                    <div className="toggle-btn">
                        <Switch checked={item.required} onChange={() => handleRequired(item.id)} />
                    </div>
                    <div className="p-l-15">Required</div>
                </div>

            </div>
        )
    };

    return (
        <div className={screenContainerStyle ?? style.screenContainer} >
            <div className={style.headerBarContainer}>
                <div className={style.headerNameContainer}>
                    <Input
                        placeholder="Name"
                    />
                </div>
                <Dropdown
                    values={formCategories}
                    placeholder='Category'
                    dataName="label"
                    valueName="value"
                />
                <Dropdown
                    values={formSubCategories}
                    placeholder="Sub Category"
                    dataName="label"
                    valueName="value"
                />
                <div>
                    <button className={`add-btn m-r-20`} >Save</button>

                    <button className={`secondary-btn`}  >Cancel</button>
                </div>

            </div>
            <div className={style.mainContainer}>
                <div className={style.inputsContainer}>
                    <Header
                        title={title}
                        setTitle={onChangeTitle}
                        description={description}
                        setDescription={onChangeDescription}
                    />
                    <Nestable
                        items={items}
                        renderItem={renderElements}
                        maxDepth={1}
                        onChange={handleOnChangeSort}
                    />
                </div>
                <div>
                    <button className={`add-btn ${style.BtnContainer}`} onClick={addElement} >Add Question</button>
                </div>
            </div>
        </div>

    );
};
export default FormBuilder;