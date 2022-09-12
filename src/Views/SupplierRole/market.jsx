import React, { useState, useEffect, useContext } from "react";
import { message } from 'antd';
import { Tabs } from 'antd';
import { TabContext } from "../../utils/contextStore";
import Dropdown from "../../common/dropdown";
import { getAllNutsCountries, getNutsCodes, getOrganization, updateNutsCodes } from "../../services/organizationsService";
import directional_sign from "../../assets/images/directional-sign.png";
import CriteriaColorGuideTab from "./Components/criteriaColorGuideTab";
import { FetchCurrentCompany } from "../../hooks/index";

const { TabPane } = Tabs;

const Market = () => {
    const { organizationData, setOrganizationData, haveUnsavedDataRef, setHaveUnsavedDataRef } = useContext(TabContext);
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState({});
    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [marketData, setMarketData] = useState({});
    const [expanded, setExpanded] = useState([]);
    const [nutsCodes, setNutsCodes] = useState(organizationData?.nuts?.find(lvl0Codes => lvl0Codes.code === selectedCountry?.code));
    const [selectedCompany] = FetchCurrentCompany();

    useEffect(() => {
        getAllNutsCountries().then(result => {
            setCountries(result);
            setSelectedCountry(result[0]);
            setActiveKey(result[0].code);

            getNutsCodes(result[0].code, 1).then(res => {
                setMarketData({ ...marketData, [result[0].code]: { 'lvl1': res } });
                setTabPanes([{
                    label: result[0].name,
                    key: result[0].code
                }]);
            });
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
                setOrganizationData(result);
            });
        }

        setNutsCodes(organizationData?.nuts?.find(lvl0Codes => lvl0Codes.code === selectedCountry?.code));

    }, [selectedCompany, organizationData, selectedCountry]);

    const onClickRow = (level, expandCode) => {
        const levelName = `lvl${level}`;
        const index = expanded.indexOf(expandCode);

        if (selectedCountry.maxLevels >= level) {
            getNutsCodes(selectedCountry.code, level).then(res => {
                setMarketData({ ...marketData, [selectedCountry.code]: { ...marketData[selectedCountry.code], [levelName]: res } });
            })

            if (index < 0) {
                setExpanded([...expanded, expandCode]);
            } else {
                const newExpanded = [...expanded];
                newExpanded.splice(index, 1);
                setExpanded(newExpanded);
            }
        }

    }

    const onCountrySelect = (e) => {
        e.preventDefault()
        const selectedCountryObj = JSON.parse(e.target.value)
        setSelectedCountry(selectedCountryObj);

        const index = tabPanes.findIndex(tab => tab.key === selectedCountryObj.code)

        if (!marketData[selectedCountryObj.code]) {
            getNutsCodes(selectedCountryObj.code, 1).then(res => {
                setMarketData({ ...marketData, [selectedCountryObj.code]: { 'lvl1': res } });
            });
        }

        if (index < 0) {
            setTabPanes([
                ...tabPanes,
                {
                    label: selectedCountryObj.name,
                    key: selectedCountryObj.code
                }]);
        }
        setActiveKey(selectedCountryObj.code);
    }

    const onTabChange = (key) => {
        const country = countries.find(count => count.code === key)
        setSelectedCountry(country)
        setActiveKey(key);
    };

    const onUpdate = () => {
        setLoading(true);
        window.scrollTo(0, 0);
        updateNutsCodes(selectedCompany.companyRegistrationId, organizationData.nuts).then(result => {
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

    const getNutsCodeObj = (code, name, children) => {
        return {
            "code": code,
            "name": name,
            "country": null,
            "level": 0,
            "parentCode": null,
            "children": children ? [children] : []
        }
    }

    const handleCheckBox = (codes) => {
        const nutsCodesIndex = organizationData.nuts.findIndex(lvl0Codes => lvl0Codes.code === selectedCountry.code);
        const index = nutsCodes.children.findIndex(child => JSON.stringify(child) === JSON.stringify(codes));

        setHaveUnsavedDataRef(true);

        if (index < 0) {
            const newOrganizationData = { ...organizationData };
            const newApendedChildren = [...nutsCodes.children, codes];
            const newNuts = newOrganizationData.nuts;

            nutsCodes.children = newApendedChildren;
            newNuts.splice(nutsCodesIndex, 1, nutsCodes);
            newOrganizationData.nuts = newNuts;
            setOrganizationData(newOrganizationData);
        } else {
            const newOrganizationData = { ...organizationData };
            const newApendedChildren = [...nutsCodes.children];
            newApendedChildren.splice(index, 1);
            const newNuts = newOrganizationData.nuts;

            nutsCodes.children = newApendedChildren;
            newNuts.splice(nutsCodesIndex, 1, nutsCodes);
            newOrganizationData.nuts = newNuts;
            setOrganizationData(newOrganizationData);
        }

    }

    const getIndent = (level = 1) => {
        return {
            marginLeft: 20 * level
        }
    }

    const onClose = (codes) => {
        const nutsCodesIndex = organizationData.nuts.findIndex(lvl0Codes => lvl0Codes.code === selectedCountry.code);
        const index = nutsCodes.children.findIndex(child => JSON.stringify(child) === JSON.stringify(codes));

        const newOrganizationData = { ...organizationData };
        const newApendedChildren = [...nutsCodes.children];
        newApendedChildren.splice(index, 1);
        const newNuts = newOrganizationData.nuts;

        nutsCodes.children = newApendedChildren;
        newNuts.splice(nutsCodesIndex, 1, nutsCodes);
        newOrganizationData.nuts = newNuts;
        setOrganizationData(newOrganizationData);
        setHaveUnsavedDataRef(true);
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
                                        {selectedCountry.maxLevels === 2 &&
                                            < i className='icon-close-1 close-icon' onClick={() => onClose(lvl1Codes)} />
                                        }
                                    </div>
                                    {lvl2Codes.children?.map((lvl3Codes, lvl3Index) => {
                                        return (
                                            <div key={lvl3Index}>
                                                <div className='result-item bg-blue-lighter2' style={getIndent(3)} >
                                                    <div className="body-text">
                                                        <div className="body-text-bold m-r-10 fl">{lvl3Codes.code}</div>
                                                        {lvl3Codes.name}
                                                    </div>
                                                    {selectedCountry.maxLevels === 3 &&
                                                        < i className='icon-close-1 close-icon' onClick={() => onClose(lvl1Codes)} />
                                                    }
                                                </div>
                                                {lvl3Codes.children?.map((lvl4Codes, lvl4Index) => {
                                                    return (
                                                        <div key={lvl4Index}>
                                                            <div className='result-item bg-blue-lighter3' style={getIndent(4)} >
                                                                <div className="body-text">
                                                                    <div className="body-text-bold m-r-10 fl">{lvl4Codes.code}</div>
                                                                    {lvl4Codes.name}
                                                                </div>
                                                                {selectedCountry.maxLevels === 3 &&
                                                                    < i className='icon-close-1 close-icon' onClick={() => onClose(lvl1Codes)} />
                                                                }
                                                            </div>
                                                            {lvl4Codes.children?.map((lvl5Codes, lvl5Index) => {
                                                                return (
                                                                    <div key={lvl5Index}>
                                                                        <div className='result-item bg-grey-lighter' style={getIndent(5)} >
                                                                            <div className="body-text">
                                                                                <div className="body-text-bold m-r-10 fl">{lvl5Codes.code}</div>
                                                                                {lvl5Codes.name}
                                                                            </div>
                                                                            {selectedCountry.maxLevels === 3 &&
                                                                                < i className='icon-close-1 close-icon' onClick={() => onClose(lvl1Codes)} />
                                                                            }
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

    const YourMarketData = () => {
        const colorGuidelevels = new Array(selectedCountry.maxLevels).fill(null).map((_, index) => {
            return `level ${index + 1}`
        })
        return (
            <>
                <CriteriaColorGuideTab dataArr={colorGuidelevels} containerStyle='selected-codes' />
                <UserSelecteNutsCodes />
            </>
        )
    }

    const MarketData = () => {
        return (
            marketData[selectedCountry.code]?.lvl1?.map((lvl1Data, lvl1Index) => {
                return (
                    <div key={lvl1Index}>
                        <div className="result-item hover-hand bg-blue-light" onClick={() => { onClickRow(2, lvl1Data.code) }}>
                            <div className="body-text">
                                <i className={expanded.includes(lvl1Data.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                <div className="body-text-bold m-r-10 fl">{lvl1Data.code}</div>
                                {lvl1Data.name}
                            </div>
                        </div>
                        {expanded.includes(lvl1Data.code) &&
                            marketData[selectedCountry.code]?.lvl2?.map((lvl2Data, lvl2Index) => {
                                if (lvl2Data.parent === lvl1Data.code) {
                                    return (
                                        <div key={lvl2Index}>
                                            <div className="result-item hover-hand bg-blue-lighter" style={getIndent(2)} onClick={() => { onClickRow(3, lvl2Data.code) }}>
                                                <div className="body-text">
                                                    {selectedCountry.maxLevels > 2 &&
                                                        <i className={expanded.includes(lvl2Data.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                    }
                                                    <div className="body-text-bold m-r-10 fl">{lvl2Data.code}</div>
                                                    {lvl2Data.name}
                                                </div>
                                                {selectedCountry.maxLevels === 2 &&
                                                    <input type="checkbox" className="check-box"
                                                        checked={nutsCodes.children.findIndex(child => JSON.stringify(child) === JSON.stringify(getNutsCodeObj(
                                                            lvl1Data.code,
                                                            lvl1Data.name,
                                                            getNutsCodeObj(
                                                                lvl2Data.code,
                                                                lvl2Data.name
                                                            )))) > -1}
                                                        onChange={() => handleCheckBox(
                                                            getNutsCodeObj(
                                                                lvl1Data.code,
                                                                lvl1Data.name,
                                                                getNutsCodeObj(
                                                                    lvl2Data.code,
                                                                    lvl2Data.name
                                                                )))}
                                                    />
                                                }
                                            </div>
                                            {expanded.includes(lvl2Data.code) &&
                                                marketData[selectedCountry.code]?.lvl3?.map((lvl3Data, lvl3Index) => {
                                                    if (lvl3Data.parent === lvl2Data.code) {
                                                        return (
                                                            <div key={lvl3Index}>
                                                                <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(3)} onClick={() => { onClickRow(4, lvl3Data.code) }}>
                                                                    <div className="body-text">
                                                                        {selectedCountry.maxLevels > 3 &&
                                                                            <i className={expanded.includes(lvl3Data.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                        }
                                                                        <div className="body-text-bold m-r-10 fl">{lvl3Data.code}</div>
                                                                        {lvl3Data.name}

                                                                    </div>
                                                                    {selectedCountry.maxLevels === 3 &&
                                                                        <input type="checkbox" className="check-box"
                                                                            checked={nutsCodes?.children?.findIndex(child => JSON.stringify(child) === JSON.stringify(getNutsCodeObj(
                                                                                lvl1Data.code,
                                                                                lvl1Data.name,
                                                                                getNutsCodeObj(
                                                                                    lvl2Data.code,
                                                                                    lvl2Data.name,
                                                                                    getNutsCodeObj(
                                                                                        lvl3Data.code,
                                                                                        lvl3Data.name,
                                                                                    )
                                                                                )))) > -1}
                                                                            onChange={() => handleCheckBox(
                                                                                getNutsCodeObj(
                                                                                    lvl1Data.code,
                                                                                    lvl1Data.name,
                                                                                    getNutsCodeObj(
                                                                                        lvl2Data.code,
                                                                                        lvl2Data.name,
                                                                                        getNutsCodeObj(
                                                                                            lvl3Data.code,
                                                                                            lvl3Data.name,
                                                                                        )
                                                                                    )))}

                                                                        />
                                                                    }
                                                                </div>
                                                                {expanded.includes(lvl3Data.code) &&
                                                                    marketData[selectedCountry.code]?.lvl4?.map((lvl4Data, lvl4Index) => {
                                                                        if (lvl4Data.parent === lvl3Data.code) {
                                                                            return (
                                                                                <div key={lvl4Index}>
                                                                                    <div className="result-item hover-hand bg-blue-lighter2" style={getIndent(4)} onClick={() => { onClickRow(5, lvl4Data.code) }}>
                                                                                        <div className="body-text">
                                                                                            {selectedCountry.maxLevels > 3 &&
                                                                                                <i className={expanded.includes(lvl4Data.code) ? 'icon-minus-circled fl toggle-icon' : 'icon-plus-circled fl toggle-icon'} />
                                                                                            }
                                                                                            <div className="body-text-bold m-r-10 fl">{lvl4Data.code}</div>
                                                                                            {lvl4Data.name}

                                                                                        </div>
                                                                                        {selectedCountry.maxLevels === 3 &&
                                                                                            <input type="checkbox" className="check-box"
                                                                                                checked={nutsCodes.children.findIndex(child => JSON.stringify(child) === JSON.stringify(getNutsCodeObj(
                                                                                                    lvl1Data.code,
                                                                                                    lvl1Data.name,
                                                                                                    getNutsCodeObj(
                                                                                                        lvl2Data.code,
                                                                                                        lvl2Data.name,
                                                                                                        getNutsCodeObj(
                                                                                                            lvl3Data.code,
                                                                                                            lvl3Data.name,
                                                                                                            getNutsCodeObj(
                                                                                                                lvl4Data.code,
                                                                                                                lvl4Data.name,
                                                                                                            )
                                                                                                        )
                                                                                                    )))) > -1}
                                                                                                onChange={() => handleCheckBox(
                                                                                                    getNutsCodeObj(
                                                                                                        lvl1Data.code,
                                                                                                        lvl1Data.name,
                                                                                                        getNutsCodeObj(
                                                                                                            lvl2Data.code,
                                                                                                            lvl2Data.name,
                                                                                                            getNutsCodeObj(
                                                                                                                lvl3Data.code,
                                                                                                                lvl3Data.name,
                                                                                                                getNutsCodeObj(
                                                                                                                    lvl4Data.code,
                                                                                                                    lvl4Data.name,
                                                                                                                )
                                                                                                            )
                                                                                                        )))}

                                                                                            />
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>

                )
            })
        )
    }

    const tabView = () => {
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
                            <MarketData />
                        </div>
                        <div className="g-col-5">
                            <YourMarketData />
                        </div>
                        <div className="g-col-2 text-center">
                            <h3>How to update your Markets?</h3>
                            <div className="flex-center-middle"><img src={directional_sign} alt='img' className="directional-img" /></div>

                            <div className="static-content-container-small text-left">
                                <div className="body-text-bold  m-t-20">What are Markets?</div>
                                <div className="body-text m-t-20">The markets are a good way to find your business in a location wise. You can update the locations of your business here. The locations can be saved according to your country’s administrative divisions. As an example, Norway has Counties, Regions and Municipalities</div>

                                <div className="body-text-bold  m-t-20 ">Why update Markets?</div>
                                <div className="body-text">Your company will be listed on the "Star Search Engine," according to the market views you save, So that the others can know that your business is out there in their locations.</div>

                                <div className="body-text-bold  m-t-20 ">How to update Market?</div>
                                <div className="body-text">1. First, you have to select your country from the dropdown.</div>
                                <div className="body-text">2. Then you can select values from dropdowns allocated according to the selected country.</div>
                                <div className="body-text">3. According to the previously selected dropdown, the rest of the dropdowns will be drilled down.</div>
                                <div className="body-text">4. You may remove markets by selecting “X” at the municipality level.</div>
                                <div className="body-text">5. To save your work, choose "Update”. The Markets will be saved and you can view them.</div>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="primary-btn update-btn" onClick={onUpdate} >Update</button>
            </>
        )
    }

    return (
        <>
            <div className="g-row m-t-20 m-l-15">
                <div className="g-col-3 country-dropdown-container m-r-20">
                    <Dropdown values={countries} selected={JSON.stringify(selectedCountry)} dataName='name' keyName='code' onChange={(e) => onCountrySelect(e)} />
                </div>
                <div className="g-col-3 m-l-20 m-r-20">
                    <div className="body-text">Country Code ( NUTS Level 0 )</div>
                    <div className="body-text-bold">{selectedCountry.code}</div>
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs
                    onChange={onTabChange}
                    activeKey={activeKey}
                    type="card"
                >
                    {tabPanes.map(pane => <TabPane tab={pane.label} key={pane.key}>{tabView()}</TabPane>)}
                </Tabs>

            </div>
        </>


    )
}

export default Market;