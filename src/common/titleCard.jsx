
import starLogo from "assets/images/starLogo.png"
import "./titleCard.scss"

const TitleCard = ({ title, topIcon = '', topBgColor = "bg-blue-purple", bottomLogo = starLogo } = {}) => {
    const backgroundColor = "top " + topBgColor
    return (
        <div className="g-col-3 compo-tile">
            <div className={backgroundColor}>
                <div className="icon-text">
                    <i className={topIcon} />
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="bottom">
                <img src={bottomLogo} alt={''} />
            </div>
        </div>
    )
}

export default TitleCard;