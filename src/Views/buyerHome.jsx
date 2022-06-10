import React, { useContext } from "react";
import starLogo from "../assets/images/starLogo.png"
import { TabContext } from "../utils/contextStore";
import { NAVIGATION_PAGES } from "../utils/enums";

export default function BuyerHome() {
    const { changeActiveTab } = useContext(TabContext)

    const getCard = (name, cardColour, imageName, navigate = '') => {
        const tileContainer = "tile " + cardColour;
        return (
            <div className="g-col-3" onClick={() => navigate ? changeActiveTab(navigate) : {}}>
                <div className={tileContainer}>
                    <div className="dots"><i className="icon-more"></i></div>
                    <div className="icon-text">
                        <i className={imageName}></i>
                        <h3>{name}</h3>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="g-row m-b-20">
                <div className="g-col-3 compo-tile">
                    <div className="top">
                        <div className="icon-text">
                            <i className='icon-buyer' />
                            <h3>Buyer</h3>
                        </div>
                    </div>
                    <div className="bottom">
                        <img src={starLogo}   />
                    </div>
                </div>
                <div className="g-col-9 p-l-20">
                    <h4>Buyer Role Space</h4>
                    <div>"Buyer" is a Role space, comes with several inbuilt functionalities.</div>
                    <div>1- Search Engine : you can use the this to search for products or service providers</div>
                    <div>2- Under Projects you can "Pick and link" search results to start a Project</div>
                    <div>3- You can monitor the project you Started under "Operations Management"</div>
                </div>
            </div>
            <div className="g-row">
                {getCard("SEARCH ENGINE", "bg-vialot", 'icon-search-module', NAVIGATION_PAGES.SEARCH)}
                {getCard("PROJECTS", "bg-green-lite", 'icon-projects')}
                {getCard("OPERATIONS MANAGEMENT", "bg-green-dark", 'icon-op-manage')}
            </div>
            <div className="g-row">
                {getCard("PURCHASE CATALOGUES", "bg-blue-purple", 'icon-catalogs')}
                {getCard("PURCHASE ANALYZING TOOL", "bg-dark-blue", 'icon-purchase-analyze')}
                {getCard("SERVEY MODULE", "bg-light-dark-blue", 'icon-survey')}
            </div>
        </>
    )
}