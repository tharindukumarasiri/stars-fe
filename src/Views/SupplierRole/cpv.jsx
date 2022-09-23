import React, { useContext, useEffect, useMemo, useState } from "react";
import { message } from 'antd';
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { levelOneReq } from "../../utils/constants";
import { getOrganization, getCpvCodes, updateCpvCodes, searchCpvCodes, updateOrganization } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png";
import { FetchCurrentCompany } from "../../hooks/index"

const Cpv = () => {
    const { organizationData, setOrganizationData, haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] });
    const [expanded, setExpanded] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [] });
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false);
    const [selectedCompany] = FetchCurrentCompany()

    useEffect(() => {
        getCpvCodes(levelOneReq).then(result => {
            setCpvData({
                ...cpvData, division: result
            })
        });

        const unloadCallback = (event) => {
            if (haveUnsavedDataRef.current) {
                event.preventDefault();
                event.returnValue = "";
                return "";
            }
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);

    }, []);

    useEffect(() => {
        if (selectedCompany.companyRegistrationId && JSON.stringify(organizationData) === '{}') {
            getOrganization(`"${selectedCompany.companyRegistrationId}"`).then(result => {
                setOrganizationData(result)
            });
        }
    }, [selectedCompany])

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
        searchCpvCodes(searchText).then(result => {
            setSearchResult(result)
            setShowingSearchedCodes(true);
            setLoading(false);
        }).catch(() => setLoading(false))
    }

    const clearSearch = () => {
        setSearchText('');
        setShowingSearchedCodes(false);
    }

    const divisionData = useMemo(() => {
        if (showingSearchedCodes) {
            const divisionCodes = searchResult.map(item => {
                return item.code.slice(0, 2)
            })

            const displayUnspscData = cpvData.division.filter(division => {
                return divisionCodes.includes(division.code.slice(0, 2))
            })

            return displayUnspscData
        } else {
            return cpvData.division
        }
    }, [cpvData, showingSearchedCodes, searchResult])

    const getCpvGroupData = (code) => {
        const indexOfCode = expanded.division.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 2,
                "code": code
            }
            const isDataAvailavle = cpvData.cpvGroup.filter(cpvGroup => cpvGroup.parent === code).length > 0

            if (!isDataAvailavle) {
                getCpvCodes(data).then(result => {
                    const newGroupData = [...cpvData.cpvGroup]
                    newGroupData.push({ parent: code, data: result })
                    setCpvData({ ...cpvData, cpvGroup: newGroupData })
                });
            }

            const newExpandedCodes = [...expanded.division]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, division: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.division]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, division: newExpandedCodes })
        }
    }

    const getClassData = (code) => {
        const indexOfCode = expanded.cpvGroup.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 3,
                "code": code
            }

            const isDataAvailable = cpvData.cpvClass.filter(cpvClass => cpvClass.parent === code).length > 0

            if (!isDataAvailable) {
                getCpvCodes(data).then(result => {
                    const newClassData = [...cpvData.cpvClass]
                    newClassData.push({ parent: code, data: result })
                    setCpvData({ ...cpvData, cpvClass: newClassData })
                });
            }

            const newExpandedCodes = [...expanded.cpvGroup]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, cpvGroup: newExpandedCodes })
        } else {
            const newExpandedCodes = [...expanded.cpvGroup]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, cpvGroup: newExpandedCodes })
        }


    }

    const getCategoryData = (code) => {
        const indexOfCode = expanded.cpvClass.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 4,
                "code": code
            }

            const isDataAvailable = cpvData.category.filter(category => category.parent === code).length > 0

            if (!isDataAvailable) {
                getCpvCodes(data).then(result => {
                    const newCommodityData = [...cpvData.category]
                    newCommodityData.push({ parent: code, data: result })
                    setCpvData({ ...cpvData, category: newCommodityData })
                });
            }

            const newExpandedCodes = [...expanded.cpvClass]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, cpvClass: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.cpvClass]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, cpvClass: newExpandedCodes })
        }

    }

    const getSubCategoryData = (code) => {
        const indexOfCode = expanded.category.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": 5,
                "code": code
            }

            const isDataAvailable = cpvData.subCategory.filter(subCategory => subCategory.parent === code).length > 0

            if (!isDataAvailable) {
                getCpvCodes(data).then(result => {
                    const newSubCategoryData = [...cpvData.subCategory]
                    newSubCategoryData.push({ parent: code, data: result })
                    setCpvData({ ...cpvData, subCategory: newSubCategoryData })
                });
            }

            const newExpandedCodes = [...expanded.category]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, category: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.category]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, category: newExpandedCodes })
        }

    }

    const handleChekBox = ({ mostChild, parents } = {}) => {
        const index = organizationData.cpvs?.findIndex(data => data.code === mostChild.code)
        setHaveUnsavedDataRef(true);

        if (index < 0 || !index) {
            const newOrganizationData = { ...organizationData }
            const newCpvs = index ? [...organizationData.cpvs] : []

            newCpvs.push({ code: mostChild.code, description: [{ lang: 'en', parent: parents, value: mostChild.value }] })
            newOrganizationData.cpvs = newCpvs

            setOrganizationData(newOrganizationData)
        } else {
            const newOrganizationData = { ...organizationData }
            const newCpvs = [...organizationData.cpvs]

            newCpvs.splice(index, 1);
            newOrganizationData.cpvs = newCpvs
            setOrganizationData(newOrganizationData)
        }
    }

    const onDelete = (code) => {
        const index = organizationData.cpvs.findIndex(data => data.code === code)

        const newOrganizationData = { ...organizationData }
        const newCpvs = [...organizationData.cpvs]

        newCpvs.splice(index, 1);
        newOrganizationData.cpvs = newCpvs
        setHaveUnsavedDataRef(true);
        setOrganizationData(newOrganizationData);
    }

    const onUpdate = async () => {
        setLoading(true);
        window.scrollTo(0, 0);
        await updateOrganization({ organizationId: selectedCompany.companyRegistrationId, name: selectedCompany.name});
        updateCpvCodes(selectedCompany.companyRegistrationId, organizationData.cpvs).then(result => {
            setLoading(false);
            setHaveUnsavedDataRef(false);
            if (result === 'Ok') {
                message.success('Update successful');
            } else {
                message.error('Update failed please try again');
            }
        }).catch(() => {
            setLoading(false);
            message.error('Update failed please try again');
        })
    }

    const YourCpvData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} containerStyle='selected-codes' />
                <UserSelectedFields data={organizationData.cpvs} dataFeieldName='description' closable={true} onClose={onDelete} />
            </>
        )
    }

    const CPVData = () => {
        return (
            divisionData.map((division, divIndex) => {
                return (
                    <div key={divIndex}>
                        <div className="result-item hover-hand bg-blue-light" onClick={() => { getCpvGroupData(division.code) }}>
                            <div className="body-text">
                                <i className={expanded.division.includes(division.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{division.code}</div>
                                {division.desscription}
                            </div>
                        </div>
                        {expanded.division.includes(division.code) &&
                            cpvData.cpvGroup.map((cpvGroup) => {
                                if (cpvGroup.parent === division.code) {
                                    return (
                                        cpvGroup.data.map((cpvGroupData, famIndex) => {
                                            return (
                                                <div key={famIndex}>
                                                    <div className="result-item hover-hand bg-blue-lighter" style={getIndent(2)} onClick={() => { getClassData(cpvGroupData.code) }}>
                                                        <div className="body-text">
                                                            <i className={expanded.cpvGroup.includes(cpvGroupData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                            <div className="body-text-bold m-r-10 fl">{cpvGroupData.code}</div>
                                                            {cpvGroupData.desscription}
                                                        </div>
                                                    </div>
                                                    {expanded.cpvGroup.includes(cpvGroupData.code) &&
                                                        cpvData.cpvClass.map((cpvClass) => {
                                                            if (cpvClass.parent === cpvGroupData.code) {
                                                                return (
                                                                    cpvClass.data.map((cpvClassData, classIndex) => {
                                                                        return (
                                                                            <div key={classIndex}>
                                                                                <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(3)} onClick={() => { getCategoryData(cpvClassData.code) }}>
                                                                                    <div className="body-text">
                                                                                        <i className={expanded.cpvClass.includes(cpvClassData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                                        <div className="body-text-bold m-r-10 fl">{cpvClassData.code}</div>
                                                                                        {cpvClassData.desscription}
                                                                                    </div>
                                                                                </div>
                                                                                {expanded.cpvClass.includes(cpvClassData.code) &&
                                                                                    cpvData.category.map((category) => {
                                                                                        if (category.parent === cpvClassData.code) {
                                                                                            return (
                                                                                                category.data.map((categoryData, comIndex) => {
                                                                                                    return (
                                                                                                        <div key={comIndex}>
                                                                                                            <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(4)} onClick={() => { getSubCategoryData(categoryData.code) }}>
                                                                                                                <div className="body-text">
                                                                                                                    <i className={expanded.category.includes(categoryData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                                                                    <div className="body-text-bold m-r-10 fl">{categoryData.code}</div>
                                                                                                                    {categoryData.desscription}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {expanded.category.includes(categoryData.code) &&
                                                                                                                cpvData.subCategory.map((subCategory) => {
                                                                                                                    if (subCategory.parent === categoryData.code) {
                                                                                                                        return (
                                                                                                                            subCategory.data.map((subCategoryData, subCategoryIndex) => {
                                                                                                                                return (
                                                                                                                                    <div className="result-item hover-hand bg-blue-lighter3" style={getIndent(5)} key={subCategoryIndex}
                                                                                                                                        onClick={() =>
                                                                                                                                            handleChekBox(
                                                                                                                                                {
                                                                                                                                                    mostChild: { code: subCategoryData.code, value: subCategoryData.desscription },
                                                                                                                                                    parents: [
                                                                                                                                                        { code: division.code, value: division.desscription },
                                                                                                                                                        { code: cpvGroupData.code, value: cpvGroupData.desscription },
                                                                                                                                                        { code: cpvClassData.code, value: cpvClassData.desscription },
                                                                                                                                                        { code: categoryData.code, value: categoryData.desscription }
                                                                                                                                                    ]
                                                                                                                                                })}
                                                                                                                                    >
                                                                                                                                        <div className="body-text m-l-10">
                                                                                                                                            <div className="body-text-bold m-r-10 fl">{subCategoryData.code}</div>
                                                                                                                                            {subCategoryData.desscription}
                                                                                                                                        </div>
                                                                                                                                        <input type="checkbox" className="check-box"
                                                                                                                                            checked={organizationData.cpvs?.findIndex(data => data.code === subCategoryData.code) > -1}
                                                                                                                                            onChange={() =>
                                                                                                                                                handleChekBox(
                                                                                                                                                    {
                                                                                                                                                        mostChild: { code: subCategoryData.code, value: subCategoryData.desscription },
                                                                                                                                                        parents: [
                                                                                                                                                            { code: division.code, value: division.desscription },
                                                                                                                                                            { code: cpvGroupData.code, value: cpvGroupData.desscription },
                                                                                                                                                            { code: cpvClassData.code, value: cpvClassData.desscription },
                                                                                                                                                            { code: categoryData.code, value: categoryData.desscription }
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
                            })
                        }
                    </div>
                )
            })
        )
    }

    return (
        <>
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
                        <h3 className="text-center">CPV Codes</h3>
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
                        <CPVData />
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">Your selected CPV Codes</h3>
                        <YourCpvData />
                    </div>
                    <div className="g-col-2 text-center">
                        <h3>How to update your CPV Codes?</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                        <div className="static-content-container">
                            <div className="body-text-bold  m-t-20">What are CPV Codes?</div>
                            <div className="body-text m-t-20">Common Procurement Vocabulary (CPV) codes are a framework of classification for public procurement that makes use of a standardized vocabulary. With the aid of CPV codes, procurement staff may consistently classify their contract notices and make it simpler for suppliers and contracting authorities to locate notices. The vocabulary is built on a tree structure comprising codes up to 9 digits which is a 8 digit code with a verification digit that are linked to terminology that defines the kind of goods or services that the contract is for.</div>
                            <div className="body-text"><strong>XX</strong>000000-Y : The first two digits for <strong>divisions</strong></div>
                            <div className="body-text"><strong>XXX</strong>00000-Y : The first three digits for <strong>groups</strong></div>
                            <div className="body-text"><strong>XXXX</strong>0000-Y : The first four digits for <strong>classes</strong></div>
                            <div className="body-text"><strong>XXXXX</strong>000-Y : The first five digits for <strong>categories</strong></div>
                            <div className="body-text m-b-20">XXXXX<strong>000</strong>-Y : Last three digits for <strong>sub categories</strong></div>

                            <div className="body-text-bold  m-t-20 ">Why update CPV Codes?</div>
                            <div className="body-text">Your company will be listed on the "Star Search Engine," which is also a global standard.
                                Benefit from the ability to be notified whenever new tenders are updated in TED & Doffin.</div>

                            <div className="body-text-bold  m-t-20 ">How to update CPV Codes?</div>
                            <div className="body-text">1. The CPV Codes displays according to the hierarchy in selected language (Default language would be logged in language)</div>
                            <div className="body-text">2. Using "+," make the codes expanded to discover your precise business domain, and "-," make them unfold.</div>
                            <div className="body-text">3. Check all the boxes to choose the codes that apply to your business domain.</div>
                            <div className="body-text">4. You may uncheck/remove the unintended codes.</div>
                            <div className="body-text">5. To save your work, choose "Update”. The CPV Codes will be saved in selected Language.(Do a new update if you want to include a different language.)</div>
                        </div>
                    </div>
                </div>

            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >Update</button>
        </>
    )
}

export default Cpv;