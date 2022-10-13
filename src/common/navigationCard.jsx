import React from "react";
import "./navigationCard.scss"
import { useTranslation } from 'react-i18next'

const NavigationCard = ({ name, cardColour, imageName, value = '', onClick = () => { } } = {}) => {
    const tileContainer = "tile " + cardColour;
    const { t } = useTranslation();

    return (
        <div className="g-col-3" onClick={onClick}>
            <div className={tileContainer}>
                <div className="dots"><i className="icon-more" /></div>
                <div className="icon-text">
                    {value === '' ?
                        <i className={imageName}></i>
                        : <h1>{value}</h1>
                    }
                    <h3>{t(name)}</h3>
                </div>
            </div>
        </div>
    )
}

export default NavigationCard;