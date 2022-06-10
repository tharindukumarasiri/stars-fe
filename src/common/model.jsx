import React from "react";
import flag_none from "../assets/images/flag-none.png"
import flag_pink from "../assets/images/flag-pink.png"
import flag_green from "../assets/images/flag-green.png"
import flag_ligh_blue from "../assets/images/flag-light-blue.png"
import flag_blue from "../assets/images/flag-blue.png"
import flag_red from "../assets/images/flag-red.png"

const Model = ({ visible, onCloseModel, searchCriteria }) => {

    if (visible) {
        return (
            <div className="my-modal">
                <div className="my-modal-container">
                    <i className="icon-close-small-x close-btn my-model-close" onClick={onCloseModel} />
                    <div className="my-modal-content">
                        <p className="title-txt s-row text-center">Save Search Result</p>
                        Result ID:
                        <div className="input-container s-row m-b-10">
                            <div className="input-hint-text">Search Criteria</div>
                            <input type="text" value={searchCriteria} onChange={() => { }} />
                        </div>
                        <input type="text" className="m-b-10 s-row" value={''} placeholder="Slug" onChange={() => { }} />
                        <input type="text" className="m-b-15 s-row" value={''} placeholder="Special Note" onChange={() => { }} />
                        <div className="s-row">Flag 
                        <img src={flag_none} className="flag-icon m-r-5 m-l-10" />
                        <img src={flag_pink} className="flag-icon m-r-5" />
                        <img src={flag_green} className="flag-icon m-r-5" />
                        <img src={flag_ligh_blue} className="flag-icon m-r-5" />
                        <img src={flag_blue} className="flag-icon m-r-5" />
                        <img src={flag_red} className="flag-icon m-r-5" />
                        </div>
                        <div className="s-row">
                            <button className="primary-btn m-l-10"  onClick={onCloseModel}>Save</button>
                            <button className="primary-btn m-l-10"  onClick={onCloseModel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Model;