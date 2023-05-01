import React from "react";
import "./navigationCard.scss"
import { useTranslation } from 'react-i18next'

const NavigationCard = ({ name, cardColour, imageName, value = '', onClick = () => { } } = {}) => {
    const tileContainer = "tile " + cardColour;
    const { t } = useTranslation();

    return (
        <div onClick={onClick}>
            <div className={tileContainer}>
                <div className="icon-text">
                    {value === '' ?
                        <i className={imageName}></i>
                        : <h1>{value}</h1>
                    }
                </div>
                <div className="name">{t(name)}</div>
            </div>
        </div>
    )
}

export default NavigationCard;