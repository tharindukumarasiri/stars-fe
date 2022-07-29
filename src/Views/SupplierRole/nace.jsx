import React, { useContext, useEffect, useMemo, useState } from "react";
import { TabContext } from "../../utils/contextStore";
import gb_flag from "../../assets/images/gb_flag.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import UserSelectedFields from "./Components/userSelectedFields";
import { nacSectionReq } from "../../utils/constants";
import { getOrganization, getNacCodes, updateNaceCodes, searchNaceCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png"

const Nace = () => {
    const { organizationData, setOrganizationData } = useContext(TabContext);
    const [naceData, setNaceData] = useState({ section: [], divition: [], group: [], class: [] })
    const [expanded, setExpanded] = useState({ section: [], divition: [], group: [] })
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [showingSearchedCodes, setShowingSearchedCodes] = useState(false)

    useEffect(() => {
        getNacCodes(nacSectionReq).then(result => {
            setNaceData({
                ...naceData, section: result
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

        if (index < 0 || !index) {
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
    console.log(organizationData)
    const onDelete = (code) => {
        const index = organizationData.naces.findIndex(data => data.code === code)

        const newOrganizationData = { ...organizationData }
        const newNaces = [...organizationData.naces]

        newNaces.splice(index, 1);
        newOrganizationData.naces = newNaces
        setOrganizationData(newOrganizationData)
    }

    const onUpdate = () => {
        setLoading(true);
        window.scrollTo(0, 0);
        updateNaceCodes(927379759, organizationData.naces).then(result => {
            setLoading(false);
            if (result !== 'Ok') {
                alert("Update failed please try again");
            }
        }).catch(() => {
            setLoading(false);
            alert("Update failed please try again");
        })
    }

    const YourNaceData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Section', 'Division', 'Group', 'Class']} containerStyle='selected-codes' />
                <UserSelectedFields data={organizationData.naces} dataFeieldName='description' closable={true} onClose={onDelete} />
            </>
        )
    }

    const NaceData = () => {
        return (
            sectionData.map((section, secIndex) => {
                return (
                    <div key={secIndex}>
                        <div className="result-item hover-hand bg-blue-light" onClick={() => { getDivitionData(section.code) }}>
                            <div className="body-text">
                                <i className={expanded.section.includes(section.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{section.code}</div>
                                {section.desscription}
                            </div>
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
                                                                                </div>
                                                                                {expanded.group.includes(groupData.code) &&
                                                                                    naceData.class.map((clas) => {
                                                                                        if (clas.parent === groupData.code) {
                                                                                            return (
                                                                                                clas.data.map((classData, clsIndex) => {
                                                                                                    return (
                                                                                                        <div className="result-item hover-hand bg-blue-lighter3" style={getIndent(4)} key={clsIndex}
                                                                                                            onClick={() =>
                                                                                                                handleChekBox(
                                                                                                                    {
                                                                                                                        mostChild: { code: classData.code, value: classData.desscription },
                                                                                                                        parents: [
                                                                                                                            { code: section.code, value: section.desscription },
                                                                                                                            { code: divitionData.code, value: divitionData.desscription },
                                                                                                                            { code: groupData.code, value: groupData.desscription }
                                                                                                                        ]
                                                                                                                    })}
                                                                                                        >
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
                        <h3 className="text-center">NACE Codes</h3>
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
                        <NaceData />
                    </div>
                    <div className="g-col-5">
                        <h3 className="text-center">Your selected NACE Codes</h3>
                        <YourNaceData />
                    </div>
                    <div className="g-col-2">
                        <h3 className="text-center">How to update your NACE Codes?</h3>
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

export default Nace;