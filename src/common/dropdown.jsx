import React from "react";

const Dropdown = ({ placeholder, dataList, dataName = 'name', criteriaName, selectedList, setSelectedState, selectedCodeList = false, setSelectedCodeList, keyName, apiCalls = () => { }, codelevel = 0, multiSelect = false } = {}) => {
    // const [multiSelectOpen, setMultiSelectOpen] = useState({ profGroup: false, cpvGroup: false })

    const getDropdownBar = () => {
        // const multiOnclick = () => {
        //     setMultiSelectOpen({ ...multiSelectOpen, [criteriaName]: !multiSelectOpen[criteriaName] });
        // }

        if (!multiSelect) {
            return (
                <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                    {
                        dataList.map(item => {
                            return <option value={item[dataName]} key={item[keyName]}>{item[dataName]}</option>
                        })
                    }
                </select>
            )
        } else {
            // return (
            //     <div className="muli-select-container">
            //         <select className="dropdown-list" value={"0"}
            //              onClick={() => multiOnclick()}
            //             onChange={() => { }} >
            //             <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
            //         </select>
            //         {multiSelectOpen[criteriaName] &&
            //             <div className="multi-select-dropdown-container">
            //                 {
            //                     dataList.map(item => {
            //                         return (
            //                             <div className="g-col-12" key={item[keyName]}>
            //                                 <input type="checkbox" className="check-box p-r-10" value={item.name} key={item[keyName]} checked={selectedList[criteriaName].indexOf(item.name) > -1} onChange={(e) => handleDropdownSelect(e, selectedList, setSelectedState, criteriaName, apiCalls, codelevel, true)} />
            //                                 {item.name}
            //                             </div>
            //                         )
            //                     })
            //                 }
            //             </div>
            //         }
            //     </div>
            // )
        }
    }

    const getDropdownSelection = () => {
        return (
            <>
                {selectedList[criteriaName]?.length == 0 &&
                    <div className="selected-item" key={'all'}>
                        <i className="close-btn icon-close-small-x m-t-5" onClick={() => { }} > </i>
                        All
                    </div>
                }
                {
                    selectedList[criteriaName]?.map(item => {
                        return (
                            <div className="selected-item" key={item}>
                                <i className="close-btn icon-close-small-x m-t-5" onClick={() => setSelectedState({ ...selectedList, [criteriaName]: onCloseBtnClick(item, selectedList[criteriaName]) })} > </i>
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
                newSelectedCodes.push(selectedData[keyName]);
                setSelectedCodeList(newSelectedCodes)
            }
        } else if (multiSelect) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.splice(index, 1);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
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

export default Dropdown;