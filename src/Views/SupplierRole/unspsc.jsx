import React, { useContext, useEffect, useMemo, useState } from "react";
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { levelOneReq } from "../../utils/constants";
import { getOrganization, getUnspscCodes, updateUnspscCodes, searchUnspscCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png"

const Unspsc = () => {
    const { organizationData, setOrganizationData } = useContext(TabContext);
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], class: [], commodity: [] })
    const [expanded, setExpanded] = useState({ segmant: [], family: [], class: [] })
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false)

    useEffect(() => {
        getUnspscCodes(levelOneReq).then(result => {
            setUnspscData({
                ...unspscData, segmant: result
            })
        });

        if (JSON.stringify(organizationData) === '{}') {
            getOrganization().then(result => {
                setOrganizationData(result)
            });
        }

    }, []);

    const getIndent = (level = 1) => {
        return {
            marginLeft: 20 * level
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const onSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        searchUnspscCodes(searchText).then(result => {
            setSearchResult(result)
            setShowingSearchedCodes(true);
            setLoading(false);
        }).catch(() => setLoading(false))
    }

    const clearSearch = () => {
        setSearchText('');
        setShowingSearchedCodes(false);
    }

    const segmentData = useMemo(() => {
        if (showingSearchedCodes) {
            const segmentCodes = searchResult.map(item => {
                return item.code.slice(0, 2)
            })

            const displayUnspscData = unspscData.segmant.filter(segmant => {
                return segmentCodes.includes(segmant.code.slice(0, 2))
            })

            return displayUnspscData
        } else {
            return unspscData.segmant
        }
    }, [unspscData, showingSearchedCodes, searchResult])

    const getFamilyData = (code) => {
        const indexOfCode = expanded.segmant.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 2,
                "code": code
            }
            const isDataAvailavle = unspscData.family.filter(family => family.parent === code).length > 0

            if (!isDataAvailavle) {
                getUnspscCodes(data).then(result => {
                    const newFamilyData = [...unspscData.family]
                    newFamilyData.push({ parent: code, data: result })
                    setUnspscData({ ...unspscData, family: newFamilyData })
                });
            }

            const newExpandedCodes = [...expanded.segmant]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, segmant: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.segmant]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, segmant: newExpandedCodes })
        }
    }

    const getClassData = (code) => {
        const indexOfCode = expanded.family.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 3,
                "code": code
            }

            const isDataAvailable = unspscData.class.filter(clas => clas.parent === code).length > 0

            if (!isDataAvailable) {
                getUnspscCodes(data).then(result => {
                    const newClassData = [...unspscData.class]
                    newClassData.push({ parent: code, data: result })
                    setUnspscData({ ...unspscData, class: newClassData })
                });
            }

            const newExpandedCodes = [...expanded.family]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, family: newExpandedCodes })
        } else {
            const newExpandedCodes = [...expanded.family]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, family: newExpandedCodes })
        }


    }

    const getCommodityData = (code) => {
        const indexOfCode = expanded.class.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 4,
                "code": code
            }

            const isDataAvailable = unspscData.commodity.filter(commodity => commodity.parent === code).length > 0

            if (!isDataAvailable) {
                getUnspscCodes(data).then(result => {
                    const newCommodityData = [...unspscData.commodity]
                    newCommodityData.push({ parent: code, data: result })
                    setUnspscData({ ...unspscData, commodity: newCommodityData })
                });
            }

            const newExpandedCodes = [...expanded.class]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, class: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.class]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, class: newExpandedCodes })
        }

    }

    const handleChekBox = ({ mostChild, parents } = {}) => {
        const index = organizationData.unspscs?.findIndex(data => data.code === mostChild.code)

        if (index < 0 || !index) {
            const newOrganizationData = { ...organizationData }
            const newUnspscs = index ? [...organizationData.unspscs] : []

            newUnspscs.push({ code: mostChild.code, title: [{ lang: 'en', parent: parents, value: mostChild.value }] })
            newOrganizationData.unspscs = newUnspscs
            setOrganizationData(newOrganizationData)
        } else {
            const newOrganizationData = { ...organizationData }
            const newUnspscs = [...organizationData.unspscs]

            newUnspscs.splice(index, 1);
            newOrganizationData.unspscs = newUnspscs
            setOrganizationData(newOrganizationData)
        }
    }

    const onDelete = (code) => {
        const index = organizationData.unspscs.findIndex(data => data.code === code)

        const newOrganizationData = { ...organizationData }
        const newUnspscs = [...organizationData.unspscs]

        newUnspscs.splice(index, 1);
        newOrganizationData.unspscs = newUnspscs
        setOrganizationData(newOrganizationData)
    }

    const onUpdate = () => {
        setLoading(true);
        window.scrollTo(0, 0);
        updateUnspscCodes(927379759, organizationData.unspscs).then(result => {
            setLoading(false);
            if (result !== 'Ok') {
                alert("Update failed please try again");
            }
        }).catch(error => {
            setLoading(false);
            alert("Update failed please try again");
        })
    }

    const YourUnspscData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Segmant', 'Family', 'Class', 'Commodity']} containerStyle='selected-codes' />
                <UserSelectedFields data={organizationData.unspscs} dataFeieldName='title' closable={true} onClose={onDelete} />
            </>
        )
    }

    const UnspscData = () => {
        return (
            segmentData.map((segmant, segIndex) => {
                return (
                    <div key={segIndex}>
                        <div className="result-item hover-hand bg-blue-light" onClick={() => { getFamilyData(segmant.code) }}>
                            <div className="body-text">
                                <i className={expanded.segmant.includes(segmant.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{segmant.code}</div>
                                {segmant.title}
                            </div>
                        </div>
                        {expanded.segmant.includes(segmant.code) &&
                            unspscData.family.map((family) => {
                                if (family.parent === segmant.code) {
                                    return (
                                        family.data.map((familyData, famIndex) => {
                                            return (
                                                <div key={famIndex}>
                                                    <div className="result-item hover-hand bg-blue-lighter" style={getIndent(2)} onClick={() => { getClassData(familyData.code) }}>
                                                        <div className="body-text">
                                                            <i className={expanded.family.includes(familyData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                            <div className="body-text-bold m-r-10 fl">{familyData.code}</div>
                                                            {familyData.title}
                                                        </div>
                                                    </div>
                                                    {expanded.family.includes(familyData.code) &&
                                                        unspscData.class.map((clas) => {
                                                            if (clas.parent === familyData.code) {
                                                                return (
                                                                    clas.data.map((classData, classIndex) => {
                                                                        return (
                                                                            <div key={classIndex}>
                                                                                <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(3)} onClick={() => { getCommodityData(classData.code) }}>
                                                                                    <div className="body-text">
                                                                                        <i className={expanded.class.includes(classData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                                        <div className="body-text-bold m-r-10 fl">{classData.code}</div>
                                                                                        {classData.title}
                                                                                    </div>
                                                                                </div>
                                                                                {expanded.class.includes(classData.code) &&
                                                                                    unspscData.commodity.map((commodity) => {
                                                                                        if (commodity.parent === classData.code) {
                                                                                            return (
                                                                                                commodity.data.map((commodityData, comIndex) => {
                                                                                                    return (
                                                                                                        <div className="result-item hover-hand bg-blue-lighter3" style={getIndent(4)} key={comIndex}
                                                                                                            onClick={() =>
                                                                                                                handleChekBox(
                                                                                                                    {
                                                                                                                        mostChild: { code: commodityData.code, value: commodityData.title },
                                                                                                                        parents: [
                                                                                                                            { code: segmant.code, value: segmant.title },
                                                                                                                            { code: familyData.code, value: familyData.title },
                                                                                                                            { code: classData.code, value: classData.title }
                                                                                                                        ]
                                                                                                                    })}
                                                                                                        >
                                                                                                            <div className="body-text m-l-10">
                                                                                                                <div className="body-text-bold m-r-10 fl">{commodityData.code}</div>
                                                                                                                {commodityData.title}
                                                                                                            </div>
                                                                                                            <input type="checkbox" className="check-box"
                                                                                                                checked={organizationData.unspscs?.findIndex(data => data.code === commodityData.code) > -1}
                                                                                                                onChange={() =>
                                                                                                                    handleChekBox(
                                                                                                                        {
                                                                                                                            mostChild: { code: commodityData.code, value: commodityData.title },
                                                                                                                            parents: [
                                                                                                                                { code: segmant.code, value: segmant.title },
                                                                                                                                { code: familyData.code, value: familyData.title },
                                                                                                                                { code: classData.code, value: classData.title }
                                                                                                                            ]
                                                                                                                        })}
                                                                                                            />
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }
                            })
                        }
                    </div>
                )
            })
        )
    }

    return (
        <>
            <div className="g-row m-l-10">
                <i className="icon-cubes-1 header-icon m-t-10 m-r-15 fl" />
                <h3 className="m-t-20">(United Nations Standard Products and Services Code )</h3>
            </div>
            <div className="page-container">
                {loading &&
                    <div className="loading center-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                <div className="g-row">
                    <div className="g-col-5">
                        <h3 className="text-center">UNSPSC Codes</h3>
                        <div className="g-row flex-center-middle m-b-15">
                            <form onSubmit={onSearch} className="search-bar g-col-8 m-r-10">
                                <i className="search-btn icon-search" onClick={onSearch} ></i>
                                <input type="text" placeholder="Search by Location, Product or Service" onChange={handleSearch} value={searchText} />
                            </form>
                            <h3 className="g-col-2 hover-hand" onClick={clearSearch} >Clear</h3>
                            <div className="g-col-2 g-row hover-hand">
                                <span className="fl g-col-6 m-r-10">English </span>
                                <span className="fl g-col-3"><img src={gb_flag} className="flag-image a-row m-r-5" alt='img' /></span>
                                <i className="g-col-1 icon-arrow-down fl" />
                            </div>
                        </div>
                        <UnspscData />
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">Your selected UNSPSC Codes</h3>
                        <YourUnspscData />
                    </div>
                    <div className="g-col-2 text-center">
                        <h3>How to update your UNSPSC Codes?</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                        <div className="static-content-container">
                            <div className="body-text-bold  m-t-20">What are UNSPSC Codes?</div>
                            <div className="body-text m-t-20">The United Nations Standard Products and Services Code (UNSPSC) is a taxonomy of products and services was created to cater to the many demands of organizations and corporations engaged in the global trade, analysis, and regulation of goods and services. It is an eight-digit number that represents a four-level structure.</div>
                            <div className="body-text"><strong>XX</strong>000000 the first two digits for <strong>Segment</strong></div>
                            <div className="body-text">XX<strong>XX</strong>0000 second two digits for <strong>Family</strong></div>
                            <div className="body-text">XXXX<strong>XX</strong>00 third two digits for <strong>Class</strong></div>
                            <div className="body-text m-b-20">XXXXXXXX<strong>XX</strong>last two digits for <strong>Commodity</strong></div>

                            <div className="body-text-bold  m-t-20 ">Why update UNSPSC Codes</div>
                            <div className="body-text">Your company will be listed on the "Star Search Engine," which is also a global standard.</div>

                            <div className="body-text-bold  m-t-20 ">How to update UNSPSC Codes?</div>
                            <div className="body-text">1. The UNSPSC Codes displays according to the hierarchy in selected language (Default language would be logged in language)</div>
                            <div className="body-text">2. Using "+," make the codes expanded to discover your precise business domain, and "-," make them unfold.</div>
                            <div className="body-text">3. Check all the boxes to choose the codes that apply to your business domain.</div>
                            <div className="body-text">4. You may uncheck/remove the unintended codes.</div>
                            <div className="body-text">5. To save your work, choose "Update”. The UNSPSC Codes will be saved in selected Language.(Do a new update if you want to include a different language.)</div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >Update</button>
        </>
    )
}

export default Unspsc;