import React, { useState } from "react";
import Nestable from "react-nestable";
import { HolderOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Switch, message } from 'antd';

import { getId } from "./utils.js";
import { formEl, formCategories, formSubCategories } from "./constants.js";
import Header from "./Header.jsx";
import Element from "./element.jsx";
import Input from '../../common/input'
import Dropdown from '../dropdown.jsx';
import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore.js'
import { emailRegEx, phoneRegEx, } from "../../utils/constants";

import style from './FormBuilder.module.scss'
import 'react-nestable/dist/styles/index.css';
import { addNewForm } from "../../services/drawingService.js";

const newContactDefaultState = { name: '', email: '', phone: '' }
const defaultFormData = {
    id: "field_1720027066292",
    required: false,
    type: "text",
    value: null,
}

const FormBuilder = ({ screenContainerStyle, currentUser, closeModal, addFormToShape }) => {
    const filterdContacts = useDiagramStore((state) => state.filterdContacts);

    const initVal = formEl[0]?.value;

    //State
    const [step, setStep] = useState(1)
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({ name: '' });
    const [selectedCategories, setSelectedCategories] = useState({ category: '', subCategory: '' });
    const [description, setDescription] = useState("");
    const [data, setData] = useState([defaultFormData]);
    const [formData, setFormData] = useState("text");
    const [contactList, setContactList] = useState([]);
    const [newContactInput, setNewContactInput] = useState(newContactDefaultState);
    const [newContactInputErrors, setNewContactInputErrors] = useState(newContactDefaultState);

    const items = data;

    const onChangeTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const moveToFormStep = () => setStep(1)
    const moveToParticipantsStep = () => setStep(2)

    const onSelectContact = (e) => {
        e.preventDefault();

        const newContacts = JSON.parse(JSON.stringify(contactList))

        newContacts.push(e.target.value)
        setContactList(newContacts)
    }

    const validateFields = () => {
        let valid = true;

        if (!newContactInput.name) {
            setNewContactInputErrors(pre => ({ ...pre, name: 'Please enter name' }))
            valid = false
        }
        if (!newContactInput.email || !emailRegEx.test(newContactInput.email)) {
            setNewContactInputErrors(pre => ({ ...pre, email: 'Please enter valid email' }))
            valid = false
        }
        if (!newContactInput.phone || !phoneRegEx.test(newContactInput.phone)) {
            setNewContactInputErrors(pre => ({ ...pre, phone: 'Please enter valid phone number' }))
            valid = false
        }

        return valid
    }

    const onAddNewParticipant = () => {
        if (validateFields()) {
            const newContacts = JSON.parse(JSON.stringify(contactList))

            newContacts.push(newContactInput)
            setContactList(newContacts)

            setNewContactInput(newContactDefaultState)
        }
    }

    const onRemoveParticipant = (participant) => {
        const newContacts = JSON.parse(JSON.stringify(contactList))

        const index = contactList.findIndex(contact => contact.name === participant.name)

        newContacts.splice(index, 1)
        setContactList(newContacts)
    }

    const validateFormSave = () => {
        let valid = true;

        if (!name) {
            setErrors(pre => ({ ...pre, name: 'Please enter form name' }))
            valid = false
        }

        return valid
    }

    const onSaveForm = () => {
        if (validateFormSave()) {
            const payload = {
                Name: name,
                CategoryId: selectedCategories.category,
                SubCategoryId: selectedCategories.subCategory,
                Title: title,
                Description: description,
                FormData: JSON.stringify(data)
            }

            addNewForm(currentUser, payload).then((result) => {
                message.success("Form saved")
                // moveToParticipantsStep();
                addFormToShape && addFormToShape(null, result)
                closeModal && closeModal()
            }).catch(e => {
                message.error("Form save failed please try again")
            })
        }
    }

    const onSaveParticipants = () => {
        closeModal && closeModal()
    }

    const onChangeCategoryType = (e, elementName) => {
        e.preventDefault();
        setSelectedCategories({ ...selectedCategories, [elementName]: e.target.value });
        setErrors(pre => ({ ...pre, [elementName]: '' }))
    }

    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value)
        setErrors(pre => ({ ...pre, name: '' }))
    }

    const onNewParticipantField = (e, type) => {
        e.preventDefault();
        setNewContactInput(pre => ({ ...pre, [type]: e.target.value }))
        setNewContactInputErrors(pre => ({ ...pre, [type]: '' }))
    }

    const onCancel = () => {
        closeModal && closeModal()
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
                const objVal = el?.options ?? [];
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

    const formPage = () => {
        return (
            <div>
                <div className={style.headerBarContainer}>
                    <div className={style.headerNameContainer}>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={onChangeName}
                            error={errors.name}
                        />
                    </div>
                    <Dropdown
                        values={formCategories}
                        onChange={e => onChangeCategoryType(e, 'category')}
                        selected={selectedCategories.category}
                        placeholder='Category'
                        dataName="label"
                        valueName="value"
                    />
                    <Dropdown
                        values={formSubCategories}
                        onChange={e => onChangeCategoryType(e, 'subCategory')}
                        selected={selectedCategories.subCategory}
                        placeholder="Sub Category"
                        dataName="label"
                        valueName="value"
                    />
                    <div>
                        <button
                            className="secondary-btn m-r-20"
                            onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="add-btn"
                            onClick={onSaveForm}
                        >Save</button>
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
        )
    }

    const participantsPage = () => {
        return (
            <div>
                <div className={style.headerBarContainer}>
                    <div className={style.headerNameContainer}>
                        Participant
                        <Dropdown
                            values={filterdContacts}
                            dataName="value"
                            onChange={onSelectContact}
                            selected={undefined}
                            placeholder="Search Users/Contact Per."
                        />
                    </div>
                    <div>
                        Add New Participant
                        <div className={style.nameTypeRow}>
                            <div className="m-r-10">
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    value={newContactInput.name}
                                    onChange={(e) => onNewParticipantField(e, 'name')}
                                    error={newContactInputErrors.name}
                                />
                            </div>
                            <div className="m-r-10">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={newContactInput.email}
                                    onChange={(e) => onNewParticipantField(e, 'email')}
                                    error={newContactInputErrors.email}
                                />
                            </div>
                            <div className="m-r-10">
                                <Input
                                    type="text"
                                    placeholder="Phone"
                                    value={newContactInput.phone}
                                    onChange={(e) => onNewParticipantField(e, 'phone')}
                                    error={newContactInputErrors.phone}
                                />
                            </div>
                            <i
                                className="icon-plus-circled hover-hand close-icon"
                                onClick={onAddNewParticipant}
                            />
                        </div>
                    </div>


                    <div className="m-t-20">
                        <button
                            className="secondary-btn m-r-20"
                            onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="add-btn"
                            onClick={onSaveParticipants}
                        >Save</button>
                    </div>
                </div>
                <div className="p-l-20">
                    {contactList.map((contact, index) => {
                        return (
                            <div key={index} className={style.contactItem}>
                                {contact?.name ?? contact?.value}
                                < i className='icon-close-small-x grey hover-hand' onClick={onRemoveParticipant} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className={screenContainerStyle ?? style.screenContainer} >
            {/* <div className={style.screenStepContainer}>
                <span className={`m-r-10 hover-hand ${step === 1 && 'blue'}`} onClick={moveToFormStep}>Form</span>
                <i className="icon-arrow-right-circled close-icon" />
                <span className={`m-l-10 hover-hand ${step === 2 && 'blue'}`} onClick={moveToParticipantsStep}>Participant/s</span>
            </div> */}
            {step === 1 ?
                formPage() :
                participantsPage()
            }

        </div>

    );
};
export default FormBuilder;