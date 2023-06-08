import React from "react";
import "./dropdownList.scss"

const DropdownList = ({ placeholder, dataList, dataName = 'name', criteriaName, selectedList, setSelectedState, selectedCodeList = false, setSelectedCodeList, keyName, apiCalls = () => { }, codelevel = 0 } = {}) => {

    const getDropdownBar = () => {
        return (
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList.map(item => {
                        return <option value={item[dataName]} key={item[keyName]}>{item.code} {item[dataName]}</option>
                    })
                }
            </select>
        )
    }

    const getDropdownSelection = () => {
        return (
            <>
                {selectedList[criteriaName]?.length == 0 &&
                    <div className="selected-item" key={'all'}>
                        <i className="close-btn  icon-x-bold" > </i>
                        All
                    </div>
                }
                {
                    selectedList[criteriaName]?.map(item => {
                        return (
                            <div className="selected-item" key={item}>
                                <i className="close-btn  icon-x-bold" onClick={() => setSelectedState({ ...selectedList, [criteriaName]: onCloseBtnClick(item, selectedList[criteriaName]) })} > </i>
                                {item}
                            </div>
                        )
                    })
                }
            </>
        )
    }

    const handleDropdownSelect = (e) => {
        e.preventDefault();
        const index = selectedList[criteriaName].indexOf(e.target.value)
        if (index < 0) {
            if (codelevel > 0) {
                apiCalls(e.target.value, codelevel);

            } else {
                apiCalls(e.target.value);
            }
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.push(e.target.value);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });

            if (selectedCodeList) {
                const newSelectedCodes = [...selectedCodeList];
                const selectedData = dataList.find((item) => item[dataName] === e.target.value)

                if (codelevel === 2) {
                    newSelectedCodes.push(selectedData[keyName]);
                } else {
                    newSelectedCodes.splice(newSelectedCodes.length - 1, 1, selectedData[keyName]);
                }

                setSelectedCodeList(newSelectedCodes)
            }
        }
    }

    const onCloseBtnClick = (country, selectedList) => {
        const newSelectedList = [...selectedList];
        newSelectedList.splice(selectedList.indexOf(country), 1)
        return newSelectedList;
    }

    return (
        <div className={dataList.length == 0 ? "disable-div" : ''}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default DropdownList;