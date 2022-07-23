import React from "react";
import "./navigationCard.scss"

const NavigationCard = ({ name, cardColour, imageName, value = '', onClick = () => { } } = {}) => {
    const tileContainer = "tile " + cardColour;
    return (
        <div className="g-col-3" onClick={onClick}>
            <div className={tileContainer}>
                <div className="dots"><i className="icon-more" /></div>
                <div className="icon-text">
                    {value === '' ?
                        <i className={imageName}></i>
                        : <h1>{value}</h1>
                    }
                    <h3>{name}</h3>
                </div>
            </div>
        </div>
    )
}

export default NavigationCard;