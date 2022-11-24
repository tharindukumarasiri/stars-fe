import React from "react";

const CountryDropDown = ({ dataList, selectedList, setSelectedState, apiCalls, containerStyle = '' } = {}) => {
    const getDropdownBar = () => {
        return (
            <select className="dropdown-list" onChange={handleDropdownSelect} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >Country</option>
                {
                    dataList.map(item => {
                        return <option value={`{"name":"${item.name}", "id":"${item.code}"}`} key={item.code} >{item.name}</option>
                    })
                }
            </select>
        )
    }

    const getDropdownSelection = () => {
        return (
            <>
                {
                    selectedList.selectedCountries?.map(item => {
                        return (
                            <div className="selected-item" key={item.id}>
                                <i className="close-btn icon-close-small-x m-t-5" onClick={() => onCloseBtnClick(item)} > </i>
                                {item.name}
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
        const index = selectedList.selectedCountries.findIndex(item => value.id === item.id)
        apiCalls(value.id)
        if (index < 0) {
            const newSelectedCriteria = [...selectedList.selectedCountries];
            newSelectedCriteria.push(value);
            setSelectedState({ ...selectedList, selectedCountries: newSelectedCriteria });
        }
    }

    const onCloseBtnClick = (item) => {
        const newSelectedList = [...selectedList.selectedCountries];
        newSelectedList.splice(selectedList.selectedCountries.findIndex(value => value.id === item.id), 1)

        setSelectedState({ ...selectedList, selectedCountries: newSelectedList, selectedCities: [] }) //TODO cant set selectedCities: [] when there are many countries
    }

    return (
        <div className={(dataList.length == 0 ? "disable-div" : '') + ' m-b-10 ' + containerStyle}>
            {getDropdownBar()}
            {getDropdownSelection()}
        </div>
    )
}

export default CountryDropDown;