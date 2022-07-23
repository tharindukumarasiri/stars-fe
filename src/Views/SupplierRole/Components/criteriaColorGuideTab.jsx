import React from "react";

const CriteriaColorGuideTab = ({ dataArr = [], containerStyle = '' }) => {
    let guideContainerStyle = 'color-guide-container '
    if (dataArr.length === 5) {
        guideContainerStyle = guideContainerStyle + 'g-col-2 '
    } else {
        guideContainerStyle = guideContainerStyle + 'g-col-3 '
    }

    const getColor = (index) => {
        switch (index) {
            case 0:
                return guideContainerStyle + 'bg-blue-light';
            case 1:
                return guideContainerStyle + 'bg-blue-lighter';
            case 2:
                return guideContainerStyle + 'bg-blue-lighter2';
            case 3:
                return guideContainerStyle + 'bg-blue-lighter3';
            case 4:
                return guideContainerStyle + 'bg-grey-lighter';
            default:
                break;
        }
    }

    return (
        <div className={"g-row " + containerStyle}>
            {dataArr.map((item, index) => {
                return (
                    <div className={getColor(index)} key={index}>
                        <div className="h3-semi text-center" >{item}</div>
                    </div>
                )
            })
            }

        </div>
    )
}

export default CriteriaColorGuideTab