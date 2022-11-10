import React from "react";
import { useTranslation } from "react-i18next";

const CriteriaColorGuideTab = ({ dataArr = [], containerStyle = '' }) => {
    const { t } = useTranslation();

    let guideContainerStyle = 'color-guide-container '
    if (dataArr.length === 5) {
        guideContainerStyle = guideContainerStyle + 'g-col-2 '
    } else {
        guideContainerStyle = guideContainerStyle + 'g-col-3 '
    }

    const getColor = (index) => {
        switch (index) {
            case 0:
                return guideContainerStyle + 'bg-bluish-green-light1';
            case 1:
                return guideContainerStyle + 'bg-bluish-green-light2';
            case 2:
                return guideContainerStyle + 'bg-bluish-green-light3';
            case 3:
                return guideContainerStyle + 'bg-bluish-green-light4';
            case 4:
                return guideContainerStyle + 'bg-bluish-green-light5';
            default:
                break;
        }
    }

    return (
        <div className={"g-row " + containerStyle}>
            {dataArr.map((item, index) => {
                return (
                    <div className={getColor(index)} key={index}>
                        <div className="h3-semi text-center" >{t(item)}</div>
                    </div>
                )
            })
            }

        </div>
    )
}

export default CriteriaColorGuideTab