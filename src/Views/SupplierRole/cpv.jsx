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
import { useTranslation } from "react-i18next";

const Cpv = () => {
    const { organizationData, setOrganizationData, haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] });
    const [expanded, setExpanded] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [] });
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false);
    const [selectedCompany] = FetchCurrentCompany();
    const { t } = useTranslation();

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
            getOrganization(`${selectedCompany.companyRegistrationId}`).then(result => {
                setOrganizationData(result)
            });
        }
    }, [selectedCompany])

    const stopPropagateCheckBox = (e) => e.stopPropagation();

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

        if (index < 0 || index === undefined) {
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
        await updateOrganization({ organizationId: selectedCompany.companyRegistrationId, name: selectedCompany.name });
        updateCpvCodes(selectedCompany.companyRegistrationId, organizationData.cpvs).then(result => {
            setLoading(false);
            setHaveUnsavedDataRef(false);
            if (result === 'Ok') {
                message.success(t('UPDATE_SUCCESS'));
            } else {
                message.error(t('UPDATE_FAIL'));
            }
        }).catch(() => {
            setLoading(false);
            message.error(t('UPDATE_FAIL'));
        })
    }

    const YourCpvData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['DIVISION', 'GROUP', 'CLASS', 'CATEGORY', 'SUB_CATEGORY']} containerStyle='selected-codes' />
                <div className="supplier-dropdown-content-container">
                    <UserSelectedFields data={organizationData.cpvs} dataFeieldName='description' closable={true} onClose={onDelete} />
                </div>
            </>
        )
    }

    const CPVData = () => {
        return (
            divisionData.map((division, divIndex) => {
                return (
                    <div key={divIndex}>
                        <div className="result-item hover-hand bg-blue-light g-row" onClick={() => { getCpvGroupData(division.code) }}>
                            <div className="body-text g-col-11">                                <i className={expanded.division.includes(division.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{division.code}</div>
                                {division.desscription}
                            </div>
                            <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                checked={organizationData.cpvs?.findIndex(data => data.code === division.code) > -1}
                                onChange={() =>
                                    handleChekBox(
                                        {
                                            mostChild: { code: division.code, value: division.desscription },
                                        })}
                            />
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
                                                        <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                                            checked={organizationData.cpvs?.findIndex(data => data.code === cpvGroupData.code) > -1}
                                                            onChange={() =>
                                                                handleChekBox(
                                                                    {
                                                                        mostChild: { code: cpvGroupData.code, value: cpvGroupData.desscription },
                                                                        parents: [
                                                                            { code: division.code, value: division.desscription },
                                                                        ]
                                                                    })}
                                                        />
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
                                                                                    <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                                                                        checked={organizationData.cpvs?.findIndex(data => data.code === cpvClassData.code) > -1}
                                                                                        onChange={() =>
                                                                                            handleChekBox(
                                                                                                {
                                                                                                    mostChild: { code: cpvClassData.code, value: cpvClassData.desscription },
                                                                                                    parents: [
                                                                                                        { code: division.code, value: division.desscription },
                                                                                                        { code: cpvGroupData.code, value: cpvGroupData.desscription },
                                                                                                    ]
                                                                                                })}
                                                                                    />
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
                                                                                                                <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                                                                                                    checked={organizationData.cpvs?.findIndex(data => data.code === categoryData.code) > -1}
                                                                                                                    onChange={() =>
                                                                                                                        handleChekBox(
                                                                                                                            {
                                                                                                                                mostChild: { code: categoryData.code, value: categoryData.desscription },
                                                                                                                                parents: [
                                                                                                                                    { code: division.code, value: division.desscription },
                                                                                                                                    { code: cpvGroupData.code, value: cpvGroupData.desscription },
                                                                                                                                    { code: cpvClassData.code, value: cpvClassData.desscription },
                                                                                                                                ]
                                                                                                                            })}
                                                                                                                />
                                                                                                            </div>
                                                                                                            {expanded.category.includes(categoryData.code) &&
                                                                                                                cpvData.subCategory.map((subCategory) => {
                                                                                                                    if (subCategory.parent === categoryData.code) {
                                                                                                                        return (
                                                                                                                            subCategory.data.map((subCategoryData, subCategoryIndex) => {
                                                                                                                                return (
                                                                                                                                    <div className="result-item hover-hand bg-blue-lighter3" style={getIndent(5)} key={subCategoryIndex}>
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
        <div className={loading && 'loading-overlay'}>
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
                        <h3 className="text-center">{t("CPV_CODES")}</h3>
                        <div className="g-row flex-center-middle m-b-15">
                            <form onSubmit={onSearch} className="search-bar g-col-8 m-r-10">
                                <i className="search-btn icon-search" onClick={onSearch} ></i>
                                <input type="text" placeholder={t("SEARCH_BY_LOCATION")} onChange={handleSearch} value={searchText} />
                            </form>
                            <h3 className="g-col-2 hover-hand" onClick={clearSearch} >{t("CLEAR")}</h3>
                            <div className="g-col-2 g-row hover-hand">
                                <span className="fl g-col-6 m-r-10">English </span>
                                <span className="fl g-col-3"><img src={gb_flag} className="flag-image fl m-r-5" alt='img' /></span>
                                <i className="g-col-1 icon-arrow-down fl" />
                            </div>
                        </div>
                        <div className="supplier-dropdown-content-container">
                            <CPVData />
                        </div>
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">{t("SELECTED_CPV_CODES")}</h3>
                        <YourCpvData />
                    </div>
                    <div className="g-col-2 text-center">
                        <h3>{t("HOW_TO_UPDATE_CPV_CODES")}</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                        <div className="static-content-container">
                            <div className="body-text-bold  m-t-20">{t("WHAT_ARE_CPV_CODES")}</div>
                            <div className="body-text m-t-20">{t("CPV_INTRO")}</div>
                            <div className="body-text"><strong>XX</strong>000000-Y : {t("FIRST_TWO_DIGITS_FOR")} <strong>{t("DIVISION")}</strong></div>
                            <div className="body-text"><strong>XXX</strong>00000-Y : {t("FIRST_THREE_DIGITS_FOR")} <strong>{t("GROUP")}</strong></div>
                            <div className="body-text"><strong>XXXX</strong>0000-Y : {t("FIRST_FOUR_DIGITS_FOR")} <strong>{t("CLASS")}</strong></div>
                            <div className="body-text"><strong>XXXXX</strong>000-Y : {t("FIRST_FIVE_DIGITS_FOR")} <strong>{t("CATEGORY")}</strong></div>
                            <div className="body-text m-b-20">XXXXX<strong>000</strong>-Y : {t("LAST_THREE_DIGITS_FOR")} <strong>{t("SUB_CATEGORY")}</strong></div>

                            <div className="body-text-bold  m-t-20 ">{t("WHY_UPDATE_CPV_CODES")}</div>
                            <div className="body-text">{t("WHY_UPDATE_CPV_CODES_REASON")}</div>

                            <div className="body-text-bold  m-t-20 ">{t("HOW_TO_UPDATE_CPV_CODES")}</div>
                            <div className="body-text">1. {t("HOW_TO_UPDATE_CPV_CODES_R1")}</div>
                            <div className="body-text">2. {t("HOW_TO_UPDATE_CPV_CODES_R2")}</div>
                            <div className="body-text">3. {t("HOW_TO_UPDATE_CPV_CODES_R3")}</div>
                            <div className="body-text">4. {t("HOW_TO_UPDATE_CPV_CODES_R4")}</div>
                            <div className="body-text">5. {t("HOW_TO_UPDATE_CPV_CODES_R5")}</div>
                        </div>
                    </div>
                </div>

            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >{t("UPDATE")}</button>
        </ div>
    )
}

export default Cpv;