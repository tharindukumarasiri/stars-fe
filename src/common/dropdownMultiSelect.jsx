import React from "react";

const DropdownMultiSelect = ({ placeholder, dataList, dataName = 'name', keyName = 'id', selectedList, setSelectedState, containerStyle = '' } = {}) => {
    const getDropdownBar = () => {
        return (
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList?.map(item => {
                        return <option value={`{"${dataName}":"${item[dataName]}", "${keyName}":"${item[keyName]}"}`} key={item[keyName]} >{item[dataName]}</option>
                    })
                }
            </select>
        )
    }

    const getDropdownSelection = () => {
        return (
            <>
                {
                    selectedList?.map(item => {
                        return (
                            <div className="selected-item-hetti" key={item[keyName]}>
                                <i className="close-btn icon-close-small-x fr" onClick={() => onCloseBtnClick(item)} > </i>
                                {item[dataName]}
                            </div>
                        )
                    })
                }
            </>
        )
    }

    const handleDropdownSelect = (e) => {
        e.preventDefault();
        const value = JSON.parse(e.target.value)
        const index = selectedList?.findIndex(item => value[keyName] === item[keyName])
        if (index < 0) {
            const newSelectedCriteria = [...selectedList];
            newSelectedCriteria.push(value);
            setSelectedState(newSelectedCriteria);
        }
    }

    const onCloseBtnClick = (item) => {
        const newSelectedList = [...selectedList];
        newSelectedList.splice(selectedList.findIndex(value => value[keyName] === item[keyName]), 1)

        setSelectedState(newSelectedList)
    }

    return (
        <div className={(dataList?.length === 0 ? "disable-div" : '') + ' m-b-10 ' + containerStyle}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default DropdownMultiSelect;