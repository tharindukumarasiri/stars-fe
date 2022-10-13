import React from "react"
import starLogo from "../assets/images/starLogo.png"
import "./titleCard.scss"
import { useTranslation } from 'react-i18next'

const TitleCard = ({ title, topIcon = '', topBgColor = "bg-blue-purple", bottomLogo = starLogo } = {}) => {
    const backgroundColor = "top " + topBgColor
    const { t } = useTranslation();

    return (
        <div className="g-col-3 compo-tile">
            <div className={backgroundColor}>
                <div className="icon-text">
                    <i className={topIcon} />
                    <h3>{t(title)}</h3>
                </div>
            </div>
            <div className="bottom">
                <img src={bottomLogo} alt={''} />
            </div>
        </div>
    )
}

export default TitleCard;