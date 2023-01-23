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
        <div className="page-container">
            <div className="g-row m-b-20">
                <TitleCard title={"eConnect"} topIcon={"icon-partners-1"} topBgColor={"bg-green-dark"} />
                <div className="g-col-9 p-l-20">
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia est vitae sapien</h4>
                    <div>ursus, vel semper justo dapibus. Nullam blandit fermentum eros eget pellentesque. Nam facilisis iaculis tortor eu dapibus. Duis euismod, justo non pulvinar suscipit, leo libero ullamcorpe</div>
                    <div>ursus, vel semper justo dapibus. Nullam blandit fermentum eros eget pellentesque. Nam facilisis iaculis tortor eu dapibus. Duis euismod, justo non pulvinar suscipit, leo libero ullamcorpe</div>
                </div>
            </div>
            <div className="g-row">
                <NavigationCard
                    name={"COMMUNICATION TYPES/TEMPLATES"}
                    cardColour={"bg-green-dark"}
                    imageName={"icon-search-module"}
                // onClick={() => onClickCard(NAVIGATION_PAGES.BUYER_SEARCH)}
                />
                <NavigationCard
                    name={"COMMUNICATIONS"}
                    cardColour={"bg-green"}
                    imageName={"icon-projects"}
                    // onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS)}
                />
                <NavigationCard
                    name={"COMMUNICATIONS LOGS"}
                    cardColour={"bg-green-lite"}
                    imageName={"icon-projects"}
                    onClick={() => onClickCard(NAVIGATION_PAGES.COMMUNICATIONS)}
                />
            </div>
        </div>
    );
}

export default EConnectHome;