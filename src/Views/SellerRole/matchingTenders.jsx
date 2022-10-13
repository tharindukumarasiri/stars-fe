import React, { useState } from "react";
import Input from "../../common/input";

const MatchingTenders = () => {
    const [searchText, setSearchText] = useState('');

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    return (
        <>
            <div className="g-row">
                <div className="g-col-4">
                    <Input value={searchText} placeholder='Search by Location, Product or Service' onChange={onChangeSearchText} endImage={'icon-search-1'} />
                </div>
                <div className="fr">New Tender</div>
            </div>
        </>
    )

}

export default MatchingTenders;