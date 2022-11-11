import React, { useContext, useEffect, useMemo, useState } from "react";
import { message } from 'antd';
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { levelOneReq } from "../../utils/constants";
import { getOrganization, getUnspscCodes, updateUnspscCodes, searchUnspscCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png"
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";

const Unspsc = () => {
    const { organizationData, setOrganizationData, haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], class: [], commodity: [] })
    const [expanded, setExpanded] = useState({ segmant: [], family: [], class: [] })
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false)
    const [selectedCompany] = FetchCurrentCompany()
    const { t } = useTranslation();
    useEffect(() => {
        getUnspscCodes(levelOneReq).then(result => {
            setUnspscData({
                ...unspscData, segmant: result
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
            getOrganization(`${selectedCompany.companyRegistrationId}`).then(result => {
                setOrganizationData(result)
            });
        }
    }, [selectedCompany]);

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
        setHaveUnsavedDataRef(true);

        if (index < 0 || index === undefined) {
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
        setOrganizationData(newOrganizationData);
        setHaveUnsavedDataRef(true);
        setOrganizationData(newOrganizationData);
    }

    const onUpdate = () => {
        setLoading(true);
        window.scrollTo(0, 0);
        updateUnspscCodes(selectedCompany.companyRegistrationId, organizationData.unspscs).then(result => {
            setLoading(false);
            setHaveUnsavedDataRef(false);
            if (result === 'Ok') {
                message.success('Update successful');
            } else {
                message.error('Update failed please try again');
            }
        }).catch(error => {
            setLoading(false);
            message.error('Update failed please try again');
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
                <h3 className="m-t-20">{t("(United Nations Standard Products and Services Code)")}</h3>
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
                        <h3 className="text-center">{t("UNSPSC Codes")}</h3>
                        <div className="g-row flex-center-middle m-b-15">
                            <form onSubmit={onSearch} className="search-bar g-col-8 m-r-10">
                                <i className="search-btn icon-search" onClick={onSearch} ></i>
                                <input type="text" placeholder={t("Search by Location, Product or Service")} onChange={handleSearch} value={searchText} />
                            </form>
                            <h3 className="g-col-2 hover-hand" onClick={clearSearch} >{t("Clear")}</h3>
                            <div className="g-col-2 g-row hover-hand">
                                <span className="fl g-col-6 m-r-10">English </span>
                                <span className="fl g-col-3"><img src={gb_flag} className="flag-image fl m-r-5" alt='img' /></span>
                                <i className="g-col-1 icon-arrow-down fl" />
                            </div>
                        </div>
                        <UnspscData />
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">{t("Your selected UNSPSC Codes")}</h3>
                        <YourUnspscData />
                    </div>
                    <div className="g-col-2 text-center">
                        <h3>{t("How to update your UNSPSC Codes?")}</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                        <div className="static-content-container">
                            <div className="body-text-bold  m-t-20">{t("What are UNSPSC Codes?")}</div>
                            <div className="body-text m-t-20">{t("The United Nations Standard Products and Services Code (UNSPSC) is a taxonomy of products and services was created to cater to the many demands of organizations and corporations engaged in the global trade, analysis, and regulation of goods and services. It is an eight-digit number that represents a four-level structure.")}</div>
                            <div className="body-text"><strong>XX</strong>000000 {t("the first two digits for")} <strong>{t("Segment")}</strong></div>
                            <div className="body-text">XX<strong>XX</strong>0000 {t("second two digits for")} <strong>{t("Family")}</strong></div>
                            <div className="body-text">XXXX<strong>XX</strong>00 {t("third two digits for")} <strong>{t("Class")}</strong></div>
                            <div className="body-text m-b-20">XXXXXXXX<strong>XX</strong>{t("last two digits for")} <strong>{t("Commodity")}</strong></div>

                            <div className="body-text-bold  m-t-20 ">{t("Why update UNSPSC Codes")}</div>
                            <div className="body-text">{t("Your company will be listed on the \"Star Search Engine, \" which is also a global standard.")}</div>

                            <div className="body-text-bold  m-t-20 ">{t("How to update UNSPSC Codes?")}</div>
                            <div className="body-text">1. {t("The UNSPSC Codes displays according to the hierarchy in selected language (Default language would be logged in language)")}</div>
                            <div className="body-text">2. {t("Using \"+,\" make the codes expanded to discover your precise business domain, and \"-,\" make them unfold.")}</div>
                            <div className="body-text">3. {t("Check all the boxes to choose the codes that apply to your business domain.")}</div>
                            <div className="body-text">4. {t("You may uncheck/remove the unintended codes.")}</div>
                            <div className="body-text">5. {t("To save your work, choose \"Update\". The UNSPSC Codes will be saved in selected Language.(Do a new update if you want to include a different language.)")}</div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >{t("Update")}</button>
        </>
    )
}

export default Unspsc;