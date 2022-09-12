import React from "react";

const SearchSelectedValues = ({ selectedValues, setSelectedValues, selectedRows, setSelectedRows, apiCalls } = {}) => {
    const getBgColor = (value, index) => {
        switch (value[0] + index) {
            case 3:
                return "bg-grey-light";
            case 4:
                return "bg-grey-lighter";
            case 5:
                return "bg-super-light-grey";
            case 6:
                return "bg-super-light-grey";
            default:
                break;
        }
    }

    const getValueFeilds = (value) => {
        if (typeof value.value === 'string') {
            return (
                <div className="result-item">
                    <div className="body-text">
                        <div className="body-text-bold fl m-r-10">{value.code}</div>
                        {value.value}
                    </div>
                    <i className="icon-close-small-x hover-hand m-r-5" onClick={() => onClose(value.code)} > </i>
                </div>
            )
        } else if (Array.isArray(value) && value.length > 0) {
            return (
                <div style={{ marginLeft: 20 * value[0] }}>
                    {
                        value.map((val, index) => {
                            const resultStyle = "result-item " + getBgColor(value, index);

                            if (index !== 0)
                                return (
                                    <div style={{ marginLeft: 20 * index }} className={resultStyle} key={index}>
                                        <div className="g-col-11 body-text">
                                            <div className="body-text-bold fl m-r-10">{val.code}</div>
                                            {val.value}
                                        </div>
                                        <i className="icon-close-small-x hover-hand m-r-5" onClick={() => onClose(val.code)} > </i>
                                    </div>
                                )

                        })
                    }
                </div>
            )
        }
    }

    const onClose = (code) => {
        // TODO: This coppies the same array reference find better way
        const newSelectedValues = selectedValues.slice()

        for (let mainRowIndex = 0; selectedValues.length > mainRowIndex; mainRowIndex++) {
            const secondArr = selectedValues[mainRowIndex]
            if (secondArr[0].code === code) {
                newSelectedValues.splice(mainRowIndex, 1);
                setSelectedValues(newSelectedValues);
                return;
            } else {
                for (let secondRowIndex = 1; secondArr.length > secondRowIndex; secondRowIndex++) {
                    const valuesArr = secondArr[secondRowIndex];
                    let closeLevel = valuesArr[0] - 1;

                    for (let valuesArrIndex = 1; valuesArr.length > valuesArrIndex; valuesArrIndex++) {
                        closeLevel++;
                        if (valuesArr[valuesArrIndex].code === code) {
                            newSelectedValues[mainRowIndex][secondRowIndex].splice(valuesArrIndex);
                            const newSecondArr = newSelectedValues[mainRowIndex];
                            let removeCount = 0;

                            for (let secondArrIndex = secondRowIndex + 1; newSecondArr.length > secondArrIndex; secondArrIndex++) {
                                if (newSecondArr[secondArrIndex][0] > closeLevel) {
                                    removeCount++;
                                } else {
                                    break;
                                }
                            }

                            newSelectedValues[mainRowIndex].splice((secondRowIndex + 1), removeCount);
                            setSelectedValues(newSelectedValues);
                            return;
                        }
                    }
                }
            }
        }
    }

    const changeSelectedRow = (value) => {
        const changeRowIndex = selectedValues.findIndex(item => item[0].code === value.code)
        if (changeRowIndex > 0)
            setSelectedRows({ ...selectedRows, cuurentRow: changeRowIndex })

        apiCalls(value.value, 2);
    }

    if (selectedValues.flat(3).length < 1)
        return null

    return (
        <div className="results-box n-float">
            {
                selectedValues.map((value, index) => {
                    if (value[0].length !== 0) {
                        const resultGroupStyle = 'results-group ' +
                            (selectedRows.cuurentRow ===
                                selectedValues.findIndex(item => item[0].code === value[0].code) ? 'selected-group' : '')
                        return (
                            <div className={resultGroupStyle} key={index} onClick={() => changeSelectedRow(value[0])}>
                                {
                                    value.map((val, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                    getValueFeilds(val)
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }


                })
            }
        </div>
    )
}

export default SearchSelectedValues;