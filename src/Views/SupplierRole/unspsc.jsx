import React, { useContext, useEffect, useState } from "react";
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { levelOneReq } from "../../utils/constants";
import { getOrganization, getUnspscCodes, updateUnspscCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png"

const Unspsc = () => {
    const { organizationData, setOrganizationData } = useContext(TabContext);
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], class: [], commodity: [] })
    const [expanded, setExpanded] = useState({ segmant: [], family: [], class: [] })
    const [loading, setLoading] = useState(false)

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
        const index = organizationData.unspscs.findIndex(data => data.code === mostChild.code)

        if (index < 0) {
            const newOrganizationData = { ...organizationData }
            const newUnspscs = [...organizationData.unspscs]

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
            unspscData.segmant.map((segmant, segIndex) => {
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
                                                                                                                checked={organizationData.unspscs.findIndex(data => data.code === commodityData.code) > -1}
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
                            <div className="search-bar g-col-10 m-r-10">
                                <i className="search-btn icon-search" ></i>
                                <input type="text" placeholder="Search by Location, Product or Service" />
                            </div>
                            <div className="g-col-2 g-row hover-hand">
                                <span className="fl g-col-6 m-r-10">English </span>
                                <span className="fl g-col-3"><img src={gb_flag} className="flag-image a-row m-r-5" /></span>
                                <i className="g-col-1 icon-arrow-down fl" />
                            </div>
                        </div>
                        <UnspscData />
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">Your selected UNSPSC Codes</h3>
                        <YourUnspscData />
                    </div>
                    <div className="g-col-2">
                        <h3 className="text-center">How to update your UNSPSC Codes?</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>
                        <div className="body-text text-center m-t-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn.</div>
                        <div className="body-text text-center m-t-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn.</div>
                    </div>
                </div>

            </div>
            <button className="primary-btn m-a-10" onClick={onUpdate} >Update</button>

        </>
    )
}

export default Unspsc;