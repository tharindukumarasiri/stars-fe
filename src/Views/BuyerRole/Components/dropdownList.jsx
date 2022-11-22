import React from "react";
import "./dropdownList.scss"

const DropdownList = ({
    placeholder,
    dataList,
    dataName = 'name',
    criteriaName,
    selectedList,
    setSelectedState,
    keyName,
    selectedMarketHierarchy,
    setSelectedMarketHierarchy,
    marketLastSelectedCodeLvl,
    setMarketLastSelectedCodeLvl,
    codeLevel,
    apiCalls = () => { },
} = {}) => {

    const getDropdownBar = () => {
        return (
            <select className={(marketLastSelectedCodeLvl + 1 === codeLevel || marketLastSelectedCodeLvl === codeLevel || codeLevel === 0) ? "dropdown-list" : "dropdown-list disable-div"} onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList.map(item => {
                        return <option value={item[dataName]} key={item[dataName]}>{item.code} {item[dataName]}</option>
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
                        <i className="close-btn icon-close-small-x m-t-5" > </i>
                        All
                    </div>
                }
                {
                    selectedList[criteriaName]?.map(item => {
                        return (
                            <div className="selected-item" key={item}>
                                <i className="close-btn icon-close-small-x m-t-5" onClick={() => onCloseBtnClick(item)} > </i>
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
        const index = selectedList[criteriaName].indexOf(e.target.value);

        if (index < 0) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.push(e.target.value);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        }

        if (marketLastSelectedCodeLvl <= codeLevel) {
            const newSelectedMarketHierarchy = [...selectedMarketHierarchy];
            const lastSelectedHierarchy = selectedMarketHierarchy[selectedMarketHierarchy.length - 1];
            if (marketLastSelectedCodeLvl === codeLevel && codeLevel !== 0) {
                lastSelectedHierarchy.push('SME_LVL', e.target.value)
            } else {
                lastSelectedHierarchy.push(e.target.value)
            }
            newSelectedMarketHierarchy[selectedMarketHierarchy.length - 1] = lastSelectedHierarchy;
            setSelectedMarketHierarchy(newSelectedMarketHierarchy)
        } else {
            const newSelectedMarketHierarchy = [...selectedMarketHierarchy];
            newSelectedMarketHierarchy.push([e.target.value]);
            setSelectedMarketHierarchy(newSelectedMarketHierarchy)
        }

        apiCalls(e.target.value);
        setMarketLastSelectedCodeLvl(codeLevel)
    }

    const onCloseBtnClick = (item) => {
        const itemsToRemove = []

        for (let lvl1 = 0; lvl1 < selectedMarketHierarchy.length; lvl1++) {
            const lvl2index = selectedMarketHierarchy[lvl1].findIndex(val => val === item)

            if (lvl2index >= 0) {
                if (selectedMarketHierarchy[lvl1][lvl2index + 1] === 'SME_LVL') {
                    itemsToRemove.push(selectedMarketHierarchy[lvl1][lvl2index]);

                    const newlevel2 = selectedMarketHierarchy[lvl1];
                    newlevel2.splice(lvl2index, 2);
                    selectedMarketHierarchy[lvl1] = newlevel2;
                } else {
                    for (let i = lvl2index; i < selectedMarketHierarchy[lvl1].length; i++) {
                        if (selectedMarketHierarchy[lvl1][i] !== 'SME_LVL') {
                            itemsToRemove.push(selectedMarketHierarchy[lvl1][i])
                        }
                    }

                    const newlevel2 = selectedMarketHierarchy[lvl1];
                    newlevel2.splice(lvl2index);
                    selectedMarketHierarchy[lvl1] = newlevel2;
                }
            }
        }




        const newSelectedList = {
            selectedCountries: selectedList.selectedCountries.filter(val => !itemsToRemove.includes(val)),
            selectedRegions: selectedList.selectedRegions.filter(val => !itemsToRemove.includes(val)),
            selectedCities: selectedList.selectedCities.filter(val => !itemsToRemove.includes(val)),
            selectedMunicipalities: selectedList.selectedMunicipalities.filter(val => !itemsToRemove.includes(val)),
        }

        setSelectedState(newSelectedList)
    }

    return (
        <div className={dataList.length === 0 ? "disable-div" : ''}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default DropdownList;