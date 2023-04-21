import React from "react";
import { useTranslation } from "react-i18next";

const CitiesDropDown = ({ dataList, selectedList, setSelectedState, containerStyle = '' } = {}) => {
    const {t} = useTranslation();

    const getDropdownBar = () => {
        return (
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{t('CITY')}</option>
                {
                    dataList.map(item => {
                        return <option value={item.name} key={item.name} >{item.name}</option>
                    })
                }
            </select>
        )
    }

    const getDropdownSelection = () => {
        return (
            <>
                {
                    selectedList.selectedCities?.map(item => {
                        return (
                            <div className="selected-item" key={item}>
                                <i className="close-btn  icon-x-bold m-t-5" onClick={() => onCloseBtnClick(item)} > </i>
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
        const value = e.target.value
        const index = selectedList.selectedCities.indexOf(value)
        if (index < 0) {
            const newSelectedCriteria = [...selectedList.selectedCities];
            newSelectedCriteria.push(value);
            setSelectedState({ ...selectedList, selectedCities: newSelectedCriteria });
        }
    }

    const onCloseBtnClick = (item) => {
        const newSelectedList = [...selectedList.selectedCities];
        newSelectedList.splice(selectedList.selectedCities.indexOf(item), 1)

        setSelectedState({ ...selectedList, selectedCities: newSelectedList })
    }

    return (
        <div className={(dataList.length == 0 ? "disable-div" : '') + ' m-b-10 ' + containerStyle}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default CitiesDropDown;