import React, { useContext } from "react";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import TitleCard from "../../common/titleCard";
import NavigationCard from "../../common/navigationCard";

const SupplierHome = () => {
    const { changeActiveTab } = useContext(TabContext);

    const onClickCard = (navigate = '') => {
        changeActiveTab(navigate)
    }

    return (
        <>
            <div className="g-row m-b-20">
                <TitleCard title={'Supplier'} topIcon={'icon-employees'} topBgColor='bg-bluish-green' />
                <div className="g-col-5 p-l-20">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia est vitae sapien</h2>
                    <div>ursus, vel semper justo dapibus. Nullam blandit fermentum eros eget pellentesque. Nam facilisis iaculis tortor eu dapibus. Duis euismod, justo non pulvinar suscipit, ursus, vel semper justo dapibus. Nullam blandit fermentum eros eget pellentesque. Nam facilisis iaculis tortor eu dapibus. Duis euismod, justo non pulvinar suscipit, leo libero ullamcorper</div>

                </div>
            </div>
            <div className="g-row">
                <NavigationCard name={"SUMMARY"} cardColour={"bg-bluish-green-dark"} imageName={'icon-summary'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_SUMMARY)} />
                <NavigationCard name={"UNSPSC"} cardColour={"bg-blue-purple"} imageName={'icon-unspsc'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_UNSPSC)} />
                <NavigationCard name={"CPV"} cardColour={"bg-blue"} imageName={'icon-cpv'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_CPV)} />
            </div>
            <div className="g-row">
                <NavigationCard name={"NACE"} cardColour={"bg-vialot"} imageName={'icon-nace'} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_NACE)} />
                <NavigationCard name={"MARKETS"} cardColour={"bg-green-lite"} imageName={'icon-nuts'} />
            </div>
        </>
    )
}

export default SupplierHome;