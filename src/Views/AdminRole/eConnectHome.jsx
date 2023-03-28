import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import NavigationCard from "../../common/navigationCard";
import TitleCard from "../../common/titleCard";

const EConnectHome = () => {
    const { changeActiveTab } = useContext(TabContext);

    const onClickCard = (navigate = "") => {
        changeActiveTab(navigate);
    };

    return (
        <div className="page-container econnect">
            <div className="g-row m-b-20">
                <TitleCard title={"eConnect"} topIcon={"icon-partners-1"} topBgColor={"bg-green-dark"} />
                <div className="g-col-9 p-l-20">
                    <h4 className="text-left">eConnect: The place where to connect with the business communities</h4>
                    <div className="g-row">
                        <div className="g-col-6">
                            <h5 className="text-left">COMMUNICATION TYPES/TEMPLATES</h5>
                            <p>Here you can create Templates to use in your emails </p><br></br>
                            <h5 className="text-left">COMMUNICATIONS</h5>
                            <p>Here you can create emails using Templates and Baskets</p><br></br>
                        </div>
                        <div className="g-col-6">
                            <h5 className="text-left">COMMUNICATION BASKET</h5>
                            <p>Here you can create Create and Schedule emails</p><br></br>
                            <h5 className="text-left">COMMUNICATIONS LOGS</h5>
                            <p>If you the Client Admin User, you can see all the logs reated to your Tenant</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={"COMMUNICATION TYPES/TEMPLATES"}
                    cardColour={"bg-green-dark"}
                    imageName={"icon-templates"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.ADMIN_TEMPLATES)}
                />
                <NavigationCard
                    name={"COMMUNICATION BASKET"}
                    cardColour={"bg-green-dark1"}
                    imageName={"icon-baskets"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS_BASKET)}
                />
                <NavigationCard
                    name={"COMMUNICATIONS"}
                    cardColour={"bg-green-dark2"}
                    imageName={"icon-communications"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS)}
                />
                <NavigationCard
                    name={"COMMUNICATIONS LOGS"}
                    cardColour={"bg-green-dark3"}
                    imageName={"icon-log"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS_LOG)}
                />
            </div>
        </div>
    );
}

export default EConnectHome;