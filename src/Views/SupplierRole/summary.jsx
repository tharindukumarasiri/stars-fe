import React, { useEffect, useState, useContext, useMemo } from "react";
import { Tabs } from 'antd';
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import Expandable from "./Components/expandable";
import NavigationCard from "../../common/navigationCard";
import { getOrganization, getAllNutsCountries } from "../../services/organizationsService";
import UserSelectedFields from "./Components/userSelectedFields";
import { FetchCurrentCompany } from "../../hooks/index";

const { TabPane } = Tabs;

const Summary = () => {
    const [expandedItem, setExpandedItem] = useState('');
    const { changeActiveTab, organizationData, setOrganizationData } = useContext(TabContext);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [activeKey, setActiveKey] = useState('');
    const [nutsCodes, setNutsCodes] = useState(organizationData?.nuts?.find(lvl0Codes => lvl0Codes.code === selectedCountry?.code));
    const [selectedCompany] = FetchCurrentCompany()

    const onClickCard = (navigate = '') => {
        changeActiveTab(navigate)
    }

    useEffect(() => {
        getAllNutsCountries().then(result => {
            setCountries(result);
            setSelectedCountry(result[0]);
            setActiveKey(result[0].code);
        });
    }, []);

    useEffect(() => {
        if (selectedCompany.companyRegistrationId && JSON.stringify(organizationData) === '{}') {
            getOrganization(`"${selectedCompany.companyRegistrationId}"`).then(result => {
                setOrganizationData(result)
            });
        }

        setNutsCodes(organizationData?.nuts?.find(lvl0Codes => lvl0Codes.code === selectedCountry?.code)
            || {
            children: [],
            code: selectedCountry?.code,
            name: selectedCountry?.name,
        });

    }, [selectedCompany, organizationData, selectedCountry]);

    const getIndent = (level = 1) => {
        return {
            marginLeft: 20 * level
        }
    }

    const onTabChange = (key) => {
        const country = countries.find(count => count.code === key)
        setSelectedCountry(country)
        setActiveKey(key);
    };

    const tabName = (name, nameCode) => {
        const count = organizationData?.nuts?.find(nuts => nuts.code === nameCode)?.children?.length;
        return `${name} (${count || 0})`
    }

    const marketsCount = useMemo(() => {
        let count = 0;
        organizationData?.nuts?.map((nuts) => {
            count += nuts?.children?.length;
        })

        return count;
    }, [organizationData])

    const UnspscData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Segmant', 'Family', 'Class', 'Commodity']} />
                <UserSelectedFields data={organizationData.unspscs} dataFeieldName='title' />
            </>
        )
    }

    const CpvData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} />
                <UserSelectedFields data={organizationData.cpvs} />
            </>
        )
    }

    const NaceData = () => {
        return (
            <>
                <CriteriaColorGuideTab dataArr={['Division', 'Group', 'Class', 'Category', 'Sub Category']} />
                <UserSelectedFields data={organizationData.naces} />
            </>
        )
    }

    const UserSelecteNutsCodes = () => {
        return (
            nutsCodes?.children.map((lvl1Codes, lvl1Index) => {
                return (
                    <div key={lvl1Index}>
                        <div className='result-item bg-blue-light' >
                            <div className="body-text">
                                <div className="body-text-bold m-r-10 fl">{lvl1Codes.code}</div>
                                {lvl1Codes.name}
                            </div>
                        </div>
                        {lvl1Codes.children?.map((lvl2Codes, lvl2Index) => {
                            return (
                                <div key={lvl2Index}>
                                    <div className='result-item bg-blue-lighter' style={getIndent(2)}  >
                                        <div className="body-text">
                                            <div className="body-text-bold m-r-10 fl">{lvl2Codes.code}</div>
                                            {lvl2Codes.name}
                                        </div>
                                    </div>
                                    {lvl2Codes.children?.map((lvl3Codes, lvl3Index) => {
                                        return (
                                            <div key={lvl3Index}>
                                                <div className='result-item bg-blue-lighter2' style={getIndent(3)} >
                                                    <div className="body-text">
                                                        <div className="body-text-bold m-r-10 fl">{lvl3Codes.code}</div>
                                                        {lvl3Codes.name}
                                                    </div>
                                                </div>
                                                {lvl3Codes.children?.map((lvl4Codes, lvl4Index) => {
                                                    return (
                                                        <div key={lvl4Index}>
                                                            <div className='result-item bg-blue-lighter3' style={getIndent(4)} >
                                                                <div className="body-text">
                                                                    <div className="body-text-bold m-r-10 fl">{lvl4Codes.code}</div>
                                                                    {lvl4Codes.name}
                                                                </div>
                                                            </div>
                                                            {lvl4Codes.children?.map((lvl5Codes, lvl5Index) => {
                                                                return (
                                                                    <div key={lvl5Index}>
                                                                        <div className='result-item bg-grey-lighter' style={getIndent(5)} >
                                                                            <div className="body-text">
                                                                                <div className="body-text-bold m-r-10 fl">{lvl5Codes.code}</div>
                                                                                {lvl5Codes.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            )
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
                <i className="icon-summary header-icon m-t-10 m-r-15 fl" />
                <h3 className="m-t-20">SUMMARY</h3>
            </div>
            <div className="page-container">
                <div className="g-row">
                    <NavigationCard name={"UNSPSC CODES"} cardColour={"bg-blue-purple"} value={organizationData.unspscs?.length} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_UNSPSC)} />
                    <NavigationCard name={"CPV CODES"} cardColour={"bg-blue"} value={organizationData.cpvs?.length} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_CPV)} />
                    <NavigationCard name={"NACE CODES"} cardColour={"bg-vialot"} value={organizationData.naces?.length} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_NACE)} />
                    <NavigationCard name={"MARKETS"} cardColour={"bg-green-lite"} value={marketsCount} onClick={() => onClickCard(NAVIGATION_PAGES.SUPPLIER_MARKET)} />
                </div>
                <Expandable title={"UNSPSC (United Nations Standard Products and Services Code )"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='UNSPSC' >
                    <UnspscData />
                </Expandable>
                <Expandable title={"CPV"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='CPV' >
                    <CpvData />
                </Expandable>
                <Expandable title={"NACE"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='NACE' >
                    <NaceData />
                </Expandable>
                <Expandable title={"Markets"} expandedItem={expandedItem} setExpandedItem={setExpandedItem} label='MKT' >
                    <div className="custom-tab-container">
                        <Tabs
                            onChange={onTabChange}
                            activeKey={activeKey}
                            type="card"
                        >
                            {countries.map(pane => <TabPane tab={tabName(pane.name, pane.code)} key={pane.code}>{UserSelecteNutsCodes()}</TabPane>)}
                        </Tabs>
                    </div>
                </Expandable>
            </div>
        </>
    )
}

export default Summary;