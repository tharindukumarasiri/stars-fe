import React from "react";

const DropdownMultiSelect = ({ placeholder, dataList, dataName = 'name', keyName = 'id', selectedList, setSelectedState, criteriaName, containerStyle = '' } = {}) => {
    const getDropdownBar = () => {
        return (
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList.map(item => {
                        return <option value={`{"name":"${item[dataName]}", "id":"${item[keyName]}"}`} key={item[keyName]} >{item[dataName]}</option>
                    })
                }
            </select>
        )
    }

    const getDropdownSelection = () => {
        return (
            <>
                {
                    selectedList[criteriaName]?.map(item => {
                        return (
                            <div className="selected-item" key={item.id}>
                                <i className="close-btn icon-close-small-x m-t-5" onClick={() => onCloseBtnClick(item)} > </i>
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
        const index = selectedList[criteriaName].findIndex(item => value.id === item.id)
        if (index < 0) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.push(value);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        }
    }

    const onCloseBtnClick = (item) => {
        const newSelectedList = [...selectedList[criteriaName]];
        newSelectedList.splice(selectedList[criteriaName].findIndex(value => value.id === item.id), 1)

        setSelectedState({ ...selectedList, [criteriaName]: newSelectedList })
    }

    return (
        <div className={(dataList.length == 0 ? "disable-div" : '') + ' m-b-10 ' + containerStyle}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default DropdownMultiSelect;