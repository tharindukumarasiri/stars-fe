import React, { useContext, useEffect, useMemo, useState } from "react";
import { message } from 'antd';
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { nacSectionReq } from "../../utils/constants";
import { getOrganization, getNacCodes, updateNaceCodes, searchNaceCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png";
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";

const Nace = () => {
    const { organizationData, setOrganizationData, haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const [naceData, setNaceData] = useState({ section: [], divition: [], group: [], class: [] })
    const [expanded, setExpanded] = useState({ section: [], divition: [], group: [] })
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false)
    const [selectedCompany] = FetchCurrentCompany()
    const { t } = useTranslation();

    useEffect(() => {
        getNacCodes(nacSectionReq).then(result => {
            setNaceData({
                ...naceData, section: result
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
        searchNaceCodes(searchText).then(result => {
            setSearchResult(result)
            setShowingSearchedCodes(true);
            setLoading(false);
        }).catch(() => setLoading(false))
    }

    const clearSearch = () => {
        setSearchText('');
        setShowingSearchedCodes(false);
    }

    const sectionData = useMemo(() => {
        if (showingSearchedCodes) {
            const sectionCodes = searchResult.map(item => {
                return item.code.slice(0, 2)
            })

            const displayNaceData = naceData.section.filter(section => {
                return sectionCodes.includes(section.code.slice(0, 2))
            })

            return displayNaceData
        } else {
            return naceData.section
        }
    }, [naceData, showingSearchedCodes, searchResult])

    const getDivitionData = (code) => {
        const indexOfCode = expanded.section.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": '2',
                "parent": code
            }
            const isDataAvailavle = naceData.divition.filter(divition => divition.parent === code).length > 0

            if (!isDataAvailavle) {
                getNacCodes(data).then(result => {
                    const newDivitionData = [...naceData.divition]
                    newDivitionData.push({ parent: code, data: result })
                    setNaceData({ ...naceData, divition: newDivitionData })
                });
            }

            const newExpandedCodes = [...expanded.section]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, section: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.section]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, section: newExpandedCodes })
        }
    }

    const getGroupData = (code) => {
        const indexOfCode = expanded.divition.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": '3',
                "parent": code
            }

            const isDataAvailable = naceData.group.filter(group => group.parent === code).length > 0

            if (!isDataAvailable) {
                getNacCodes(data).then(result => {

                    const newGroupData = [...naceData.group]
                    newGroupData.push({ parent: code, data: result })
                    setNaceData({ ...naceData, group: newGroupData })
                });
            }

            const newExpandedCodes = [...expanded.divition]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, divition: newExpandedCodes })
        } else {
            const newExpandedCodes = [...expanded.divition]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, divition: newExpandedCodes })
        }


    }

    const getClassData = (code) => {
        const indexOfCode = expanded.group.indexOf(code)

        if (indexOfCode < 0) {
            const data = {
                "level": '4',
                "parent": code
            }

            const isDataAvailable = naceData.class.filter(clas => clas.parent === code).length > 0

            if (!isDataAvailable) {
                getNacCodes(data).then(result => {
                    const newClassData = [...naceData.class]
                    newClassData.push({ parent: code, data: result })
                    setNaceData({ ...naceData, class: newClassData })
                });
            }

            const newExpandedCodes = [...expanded.group]
            newExpandedCodes.push(code)
            setExpanded({ ...expanded, group: newExpandedCodes })

        } else {
            const newExpandedCodes = [...expanded.group]
            newExpandedCodes.splice(indexOfCode, 1)
            setExpanded({ ...expanded, group: newExpandedCodes })
        }

    }

    const handleChekBox = ({ mostChild, parents } = {}) => {
        const index = organizationData.naces?.findIndex(data => data.code === mostChild.code)
        setHaveUnsavedDataRef(true);

        if (index < 0 || index === undefined) {
            const newOrganizationData = { ...organizationData }
            const newNaces = index ? [...organizationData.naces] : []

            newNaces.push({ code: mostChild.code, description: [{ lang: 'en', parent: parents, value: mostChild.value }] })
            newOrganizationData.naces = newNaces
            setOrganizationData(newOrganizationData)
        } else {
            const newOrganizationData = { ...organizationData }
            const newNaces = [...organizationData.naces || null]
            newNaces.splice(index, 1);
            newOrganizationData.naces = newNaces
            setOrganizationData(newOrganizationData)
        }
    }

    const onDelete = (code) => {
        const index = organizationData.naces.findIndex(data => data.code === code)

        const newOrganizationData = { ...organizationData }
        const newNaces = [...organizationData.naces]

        newNaces.splice(index, 1);
        newOrganizationData.naces = newNaces
        setOrganizationData(newOrganizationData);
        setHaveUnsavedDataRef(true);
        setOrganizationData(newOrganizationData);
    }

    const onUpdate = () => {
        setLoading(true);
        window.scrollTo(0, 0);
        updateNaceCodes(selectedCompany.companyRegistrationId, organizationData.naces).then(result => {
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

    const YourNaceData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['SECTION', 'DIVISION', 'GROUP', 'CLASS']} containerStyle='selected-codes' />
                <div className="supplier-dropdown-content-container">
                    <UserSelectedFields data={organizationData.naces} dataFeieldName='description' closable={true} onClose={onDelete} />
                </div>
            </>
        )
    }

    const NaceData = () => {
        return (
            sectionData.map((section, secIndex) => {
                return (
                    <div key={secIndex}>
                        <div className="result-item hover-hand bg-blue-light g-row" onClick={() => { getDivitionData(section.code) }}>
                            <div className="body-text g-col-11">
                                <i className={expanded.section.includes(section.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{section.code}</div>
                                {section.desscription}
                            </div>
                            <input type="checkbox" className="check-box g-col-1" onClick={stopPropagateCheckBox}
                                checked={organizationData?.naces?.findIndex(data => data.code === section.code) > -1}
                                onChange={() =>
                                    handleChekBox(
                                        {
                                            mostChild: { code: section.code, value: section.desscription },
                                        })}
                            />
                        </div>
                        {expanded.section.includes(section.code) &&
                            naceData.divition.map((divition) => {
                                if (divition.parent === section.code) {
                                    return (
                                        divition.data.map((divitionData, famIndex) => {
                                            return (
                                                <div key={famIndex}>
                                                    <div className="result-item hover-hand bg-blue-lighter" style={getIndent(2)} onClick={() => { getGroupData(divitionData.code) }}>
                                                        <div className="body-text">
                                                            <i className={expanded.divition.includes(divitionData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                            <div className="body-text-bold m-r-10 fl">{divitionData.code}</div>
                                                            {divitionData.desscription}
                                                        </div>
                                                        <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                                            checked={organizationData?.naces?.findIndex(data => data.code === divitionData.code) > -1}
                                                            onChange={() =>
                                                                handleChekBox(
                                                                    {
                                                                        mostChild: { code: divitionData.code, value: divitionData.desscription },
                                                                        parents: [
                                                                            { code: section.code, value: section.desscription },
                                                                        ]
                                                                    })}
                                                        />
                                                    </div>
                                                    {expanded.divition.includes(divitionData.code) &&
                                                        naceData.group.map((group) => {
                                                            if (group.parent === divitionData.code) {
                                                                return (
                                                                    group.data.map((groupData, groupIndex) => {
                                                                        return (
                                                                            <div key={groupIndex}>
                                                                                <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(3)} onClick={() => { getClassData(groupData.code) }}>
                                                                                    <div className="body-text">
                                                                                        <i className={expanded.group.includes(groupData.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                                        <div className="body-text-bold m-r-10 fl">{groupData.code}</div>
                                                                                        {groupData.desscription}
                                                                                    </div>
                                                                                    <input type="checkbox" className="check-box" onClick={stopPropagateCheckBox}
                                                                                        checked={organizationData?.naces?.findIndex(data => data.code === groupData.code) > -1}
                                                                                        onChange={() =>
                                                                                            handleChekBox(
                                                                                                {
                                                                                                    mostChild: { code: groupData.code, value: groupData.desscription },
                                                                                                    parents: [
                                                                                                        { code: section.code, value: section.desscription },
                                                                                                        { code: divitionData.code, value: divitionData.desscription },
                                                                                                    ]
                                                                                                })}
                                                                                    />
                                                                                </div>
                                                                                {expanded.group.includes(groupData.code) &&
                                                                                    naceData.class.map((clas) => {
                                                                                        if (clas.parent === groupData.code) {
                                                                                            return (
                                                                                                clas.data.map((classData, clsIndex) => {
                                                                                                    return (
                                                                                                        <div className="result-item hover-hand bg-blue-lighter3" style={getIndent(4)} key={clsIndex}>
                                                                                                            <div className="body-text m-l-10">
                                                                                                                <div className="body-text-bold m-r-10 fl">{classData.code}</div>
                                                                                                                {classData.desscription}
                                                                                                            </div>
                                                                                                            <input type="checkbox" className="check-box"
                                                                                                                checked={organizationData?.naces?.findIndex(data => data.code === classData.code) > -1}
                                                                                                                onChange={() =>
                                                                                                                    handleChekBox(
                                                                                                                        {
                                                                                                                            mostChild: { code: classData.code, value: classData.desscription },
                                                                                                                            parents: [
                                                                                                                                { code: section.code, value: section.desscription },
                                                                                                                                { code: divitionData.code, value: divitionData.desscription },
                                                                                                                                { code: groupData.code, value: groupData.desscription }
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
                        <h3 className="text-center">{t("NACE_CODES")}</h3>
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
                            <NaceData />
                        </div>
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">{t("SELECTED_NACE_CODES")}</h3>
                        <YourNaceData />
                    </div>
                    <div className="g-col-2 text-center">
                        <h3>{t("HOW_TO_UPDATE_NACE_CODES")}</h3>
                        <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                        <div className="static-content-container">
                            <div className="body-text-bold  m-t-20">{t("WHAT_ARE_NACE_CODES")}</div>
                            <div className="body-text m-t-20">{("NACE_INTRO")}</div>
                            <div className="body-text"><strong>A to U</strong> : {t("NACE_INTRO_SUB_1")} <strong>{t("SECTION")}</strong></div>
                            <div className="body-text"><strong>01 to 99</strong> : {t("NACE_INTRO_SUB_2")} <strong>{t("DIVISION")}</strong></div>
                            <div className="body-text"><strong>01.1 to 99.0</strong> : t{("NACE_INTRO_SUB_2")} <strong>{t("GROUP")}</strong></div>
                            <div className="body-text m-b-20"><strong>01.11 to 99.00</strong> : {t("NACE_INTRO_SUB_2")} <strong>{t("CLASS")}</strong></div>

                            <div className="body-text-bold  m-t-20 ">{t("WHY_UPDATE_NACE_CODES")}</div>
                            <div className="body-text">{t("WHY_UPDATE_NACE_CODES_REASON")}</div>

                            <div className="body-text-bold  m-t-20 ">{t("HOW_TO_UPDATE_NACE_CODES")}</div>
                            <div className="body-text">1. {t("HOW_TO_UPDATE_NACE_CODES_R1")}</div>
                            <div className="body-text">2. {t("HOW_TO_UPDATE_NACE_CODES_R2")}</div>
                            <div className="body-text">3. {t("HOW_TO_UPDATE_NACE_CODES_R3")}</div>
                            <div className="body-text">4. {t("HOW_TO_UPDATE_NACE_CODES_R4")}</div>
                            <div className="body-text">5. {t("HOW_TO_UPDATE_NACE_CODES_R5")}</div>
                        </div>
                    </div>
                </div>

            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >{t("UPDATE")}</button>
        </div>
    )
}

export default Nace;