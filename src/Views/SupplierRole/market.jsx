import React from "react";
import Dropdown from "../../common/dropdown";

const Market = () => {
    return (
        <>
            <div className="g-row m-t-20 m-l-15">
                <div className="g-col-3 country-dropdown-container">
                    <Dropdown values={["Norway", "Sweden", "Denmark"]} />

                </div>
                <div className="g-col-3">
                    <div>Country Code</div>
                </div>
            </div>
            <div className="page-container">

            </div>
        </>


    )
}

export default Market;