import React, { useState, useMemo, useEffect, useContext } from "react";
import { message } from 'antd';
import { getCpvCodes, searchCpvCodes, updateTenementCPV, getTenementCPV, getSubscribedPartyTsByTenantId, getNotSubscribedPartyTsByTenantId, SaveSubscriptions } from "../../services/organizationsService";
import { levelOneReq } from "../../utils/constants";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from 'react-i18next'
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import DropdownMultiSelect from "../../common/dropdownMultiSelect"
import { FetchCurrentCompany } from "../../hooks/index"

const GetNotified = () => {
    const { haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('')
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] });
    const [expanded, setExpanded] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [] });
    const [searchResult, setSearchResult] = useState('');
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false);
    const [tenderCpvs, setTenderCpvs] = useState([]);
    const [allCpvCodes, setAllCpvCodes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [selectedCompany] = FetchCurrentCompany();

    useEffect(() => {
        getCpvCodes(levelOneReq).then(result => {
            setCpvData({
                ...cpvData, division: result.map(val => { return { code: val.code2, desscription: val.desscription } })
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
        if (selectedCompany.companyRegistrationId && tenderCpvs.length === 0) {
            Promise.all([
                getTenementCPV(selectedCompany.companyRegistrationId, 'NO').then(result => {
                    if (result?.cpvs?.length > 0) {
                        setTenderCpvs(result?.cpvs)
                        // const formattedUserList = result?.contactUsers.map(val => {
                        //     return { Value: val?.name, Key: val?.userId }
                        // })
                        // setSelectedUsers(formattedUserList)

                        let newAllCpvCodes = [];
                        for (let i = 0; i < result.cpvs.length; i++) {
                            const parentCodelist = result.cpvs[i].description[0].parent.map(val => { return val.code })
                            newAllCpvCodes = newAllCpvCodes.concat(parentCodelist);
                            newAllCpvCodes.push(result.cpvs[i].code);
                        }

                        setAllCpvCodes(newAllCpvCodes)
                    }

                }),

                getSubscribedPartyTsByTenantId(selectedCompany?.tenantId).then(result => {
                    setSelectedUsers(result)
                }),

                getNotSubscribedPartyTsByTenantId(selectedCompany?.tenantId).then(result => {
                    setUsers(result);
                })
            ]).finally(() => setLoading(false));
        }
    }, [selectedCompany]);

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
    }, [cpvData, showingSearchedCodes, searchResult]);

    const getCpvGroupData = (code, desscription) => {
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
                    if (result.length === 0) {
                        newGroupData.push({ parent: code, data: [{ code: code, desscription: desscription }] })
                    } else {
                        newGroupData.push({ parent: code, data: result.map(val => { return { code: val.code2, desscription: val.desscription } }) })
                    }
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

    const getClassData = (code, desscription) => {
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
                    if (result.length === 0) {
                        newClassData.push({ parent: code, data: [{ code: code, desscription: desscription }] })
                    } else {
                        newClassData.push({ parent: code, data: result.map(val => { return { code: val.code2, desscription: val.desscription } }) })
                    }
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

    const getCategoryData = (code, desscription) => {
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
                    if (result.length === 0) {
                        newCommodityData.push({ parent: code, data: [{ code: code, desscription: desscription }] })
                    } else {
                        newCommodityData.push({ parent: code, data: result.map(val => { return { code: val.code2, desscription: val.desscription } }) })
                    }
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

    const getSubCategoryData = (code, desscription) => {
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
                    if (result.length === 0) {
                        newSubCategoryData.push({ parent: code, data: [{ code: code, desscription: desscription }] })
                    } else {
                        newSubCategoryData.push({ parent: code, data: result.map(val => { return { code: val.code2, desscription: val.desscription } }) })
                    }
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
        const index = tenderCpvs?.findIndex(data => data.code === mostChild.code)
        setHaveUnsavedDataRef(true);

        if (index < 0 || index === undefined) {
            const newCpvs = index ? [...tenderCpvs] : []
            newCpvs.push({ code: mostChild.code, description: [{ lang: 'en', parent: parents, value: mostChild.value }] })
            setTenderCpvs(newCpvs)

            const parentCodeSet = parents.map(val => { return val.code })
            const newAllCpvs = allCpvCodes.concat(parentCodeSet)
            newAllCpvs.push(mostChild.code);
            setAllCpvCodes(newAllCpvs)
        } else {
            const newCpvs = [...tenderCpvs]
            newCpvs.splice(index, 1);
            setTenderCpvs(newCpvs)

            const allCpvIndex = allCpvCodes.indexOf(mostChild.code);
            const newAllCpvs = [...allCpvCodes]
            if (allCpvIndex > 0) {
                newAllCpvs.splice(allCpvIndex - 4, 5)
                setAllCpvCodes(newAllCpvs)
            }
        }
    }

    const onDelete = (code) => {
        const index = tenderCpvs.findIndex(data => data.code === code)
        const newCpvs = [...tenderCpvs]

        newCpvs.splice(index, 1);
        setHaveUnsavedDataRef(true);
        setTenderCpvs(newCpvs)
    }

    const getFormattedUserList = () => {
        return selectedUsers?.map(val => {
            return { name: val?.Value, userId: val?.Key }
        })
    }

    const onUpdate = async () => {
        setLoading(true);
        window.scrollTo(0, 0);
        const params = {
            organizationId: selectedCompany.companyRegistrationId,
            tenantId: selectedCompany.tenantId,
            countryCode: 'NO',
            cpvs: tenderCpvs,
            cpvCodes: [...new Set(allCpvCodes)],
            contactUsers: getFormattedUserList(),
        }

        const userParams = selectedUsers.map(user => {
            return ({ TenantId: selectedCompany?.tenantId, MessageTypeId: 2, PartyTId: user?.Key })
        })

        updateTenementCPV(params).then(result => {
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

        SaveSubscriptions(userParams)
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

    const getIndent = (level = 1) => {
        return {
            marginLeft: 20 * level
        }
    }

    const YourCpvData = () => {
        return (
            <div className="m-t-10">
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} containerStyle='selected-codes' />
                <UserSelectedFields data={tenderCpvs} dataFeieldName='description' closable={true} onClose={onDelete} />
            </div>
        )
    }

    const CPVData = () => {
        return (
            divisionData.map((division, divIndex) => {
                return (
                    <div key={divIndex}>
                        <div className="result-item hover-hand bg-bluish-green-light1" onClick={() => { getCpvGroupData(division.code, division.desscription) }}>
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
                                                    <div className="result-item hover-hand bg-bluish-green-light2" style={getIndent(2)} onClick={() => { getClassData(cpvGroupData.code, cpvGroupData.desscription) }}>
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
                                                                                <div className="result-item hover-hand bg-bluish-green-light3" style={getIndent(3)} onClick={() => { getCategoryData(cpvClassData.code, cpvClassData.desscription) }}>
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
                                                                                                            <div className="result-item hover-hand bg-bluish-green-light4" style={getIndent(4)} onClick={() => { getSubCategoryData(categoryData.code, categoryData.desscription) }}>
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
                                                                                                                                    <div className="result-item hover-hand bg-bluish-green-light5" style={getIndent(5)} key={subCategoryIndex}
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
                                                                                                                                            checked={tenderCpvs?.findIndex(data => data.code === subCategoryData.code) > -1}
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
                    <h6>How to get notified for Tenders?</h6>
                    <div className="g-row flex-center-middle m-b-15">
                        <form onSubmit={onSearch} className="search-bar g-col-11">
                            <i className="search-btn icon-search" onClick={onSearch} ></i>
                            <input type="text" placeholder="Search Text" onChange={handleSearch} value={searchText} />
                        </form>
                        <button className="primary-btn filters-btn g-col-3" onClick={clearSearch} >Filters</button>
                    </div>
                    <CPVData />
                </div>
                <div className="g-col-5">
                    <h3 className="text-center p-b-20">You will get notifications for  the  below slected CPV Codes </h3>
                    <YourCpvData />
                </div>
                <div className="g-col-2 m-t-5">
                    <h3>Receivers</h3>
                    {/* <div className="static-content-container">
                        <div className="body-text-bold  m-t-20">Get notified</div>
                        <div className="body-text m-t-20">Being updated on the new tenders that have been updated is vital to win the competition. Tenders can be figured out by the CPV codes included in the tender notice. CPV codes is the taxonomy used to find the business domains/areas in Europea region. This is a feature where we let you save separate CPV codes to receive notifications when new tenders have been updated in our global tender's database. We will send the assigned user emails when new tenders are updated, and you can view them in your “Local Tenders” features. You can select/ update the CPV codes which covers your interested business domain/area at any time to receive the updates. </div>

                        <div className="body-text-bold  m-t-20 ">How you can get notified?</div>
                        <div className="body-text">You can simply view all the CPV codes available in all levels and select the codes related to your interested business domain/area to save them and get tender update notifications. We will send you emails for each matching tender for what you have selected. </div>

                        <div className="body-text-bold  m-t-20 ">Steps: </div>
                        <div className="body-text">Expand the CPV codes and check the domains</div>
                        <div className="body-text">Select any level of the hierarchy by checking the checkbox available in each level.</div>
                        <div className="body-text">Select “Update” to save your work.</div>
                        <div className="body-text">We will send all the updates for tenders including the lowest levels of the CPV codes if you have selected the higher levels.</div>
                        <div className="body-text">Select the link on email notifications to navigate to the updated tenders.</div>
                        <div className="body-text">View the new tender notices. </div>
                    </div> */}
                    <h6 className="m-t-20 text-left">Select user(s)</h6>
                    <DropdownMultiSelect placeholder="Users" dataList={users} dataName='Value' keyName="Key" selectedList={selectedUsers} setSelectedState={setSelectedUsers} />
                </div>
            </div>
            <button className="primary-btn update-btn" onClick={onUpdate} >Update</button>
        </div>
    )
}

export default GetNotified