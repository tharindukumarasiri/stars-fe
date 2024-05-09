import { useState } from "react";
import Nestable from "react-nestable";
import { HolderOutlined } from '@ant-design/icons';

import { formEl } from "./constants.js";
import Header from "./Header.jsx";
import Input from '../../common/input'
import Dropdown from '../dropdown.jsx';

import style from './FormBuilder.module.scss'
import 'react-nestable/dist/styles/index.css';

const getId = (type) => `${type}_${+new Date()}`;

const FormBuilder = () => {
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
            id: getId(formData),
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
    const duplicateElement = (elId, elType) => {
        let elIdx = data.findIndex((el) => el.id === elId);
        let newEl = {
            id: getId(formData),
            value: null,
            type: elType,
            required: false,
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

    //Function to Handle Date
    const handleDate = (id, dateVal) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, date: dateVal };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Time
    const handleTime = (id, dateVal) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, time: dateVal };
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

    //Function to Delete Optin
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
                            value={''}
                            onChange={setTitle}
                        />
                    </div>
                    <Dropdown values={formEl} dataName="label" />
                </div>
                <div className={style.nameTypeRow}>
                    <div className={style.nameContainer}>
                        <Input
                            value={''}
                            placeholder="Text Input"
                            disabled
                            onChange={() => { }}
                        />
                    </div>
                    <Dropdown placeholder="Logic" values={formEl} dataName="label" />
                </div>

            </div>
        )
    };

    console.log(data);

    return (
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
            <div className={style.BtnContainer}>
                <button className="add-btn" onClick={addElement} >Add Element</button>
            </div>
        </div>
    );
};
export default FormBuilder;