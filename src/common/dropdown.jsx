import React from "react";

const Dropdown = ({ placeholder, dataList, dataName = 'name', selectedList, setSelectedState, selectedRows = false, setSelectedRows, keyName, apiCalls = () => { }, codelevel = 0 } = {}) => {
    const handleDropdownSelect = (e) => {
        e.preventDefault();
        const selectedData = dataList.find((item) => item[keyName] === e.target.value)
        const value = selectedData[dataName]
        const code = selectedData[keyName]
        const index = selectedList.flat(3).filter(item => item.code === code)
        apiCalls(value, codelevel + 1);

        if (index.length === 0) {
            // TODO: This coppies the same array reference (because deep array) find better way
            const newSelectedValues = selectedList.slice();

            if (codelevel === 1) {
                newSelectedValues.push([{ value: value, code: code }, [2]])
                setSelectedRows({ ...selectedRows, cuurentRow: newSelectedValues.length - 1, preLevel: 1 })
            } else if (selectedRows.preLevel < codelevel) {
                const newArr = newSelectedValues[selectedRows.cuurentRow][newSelectedValues[selectedRows.cuurentRow].length - 1];
                newArr.push({ value: value, code: code })
                newSelectedValues[selectedRows.cuurentRow][newSelectedValues[selectedRows.cuurentRow].length - 1] = newArr
                setSelectedRows({ ...selectedRows, preLevel: codelevel })
            } else {
                newSelectedValues[selectedRows.cuurentRow][newSelectedValues[selectedRows.cuurentRow].length] = [codelevel, { value: value, code: code }];
                setSelectedRows({ ...selectedRows, preLevel: codelevel })
            }
            setSelectedState(newSelectedValues)
        } else {
            const changeRowIndex = selectedList.findIndex(item => item[0].code === code)
            if (changeRowIndex > 0) {
                setSelectedRows({ ...selectedRows, cuurentRow: changeRowIndex })
            }
        }
    }

    return (
        <div className={dataList.length === 0 ? "disable-div" : ''}>
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList.map((item, index) => {
                        return <option value={item[keyName]} key={index}>{item.code} {item[dataName]}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Dropdown;