import React, { useEffect, useState } from "react";
import { Tabs, Modal } from "antd";
import Dropdown from "../../common/dropdown";
import { FilePdfTwoTone, CopyTwoTone, ShareAltOutlined } from '@ant-design/icons';
import { getTendersByNoticeNumber } from "../../services/organizationsService";
import { FetchCurrentLanguage } from "../../hooks";
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const TenderDetails = ({props}) => {
    const [allTenders, setAllTenders] = useState([]);
    const [tenderDetails, setTenderDetails] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [allLanguages, setAllLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const {t} = useTranslation();

    const currentLanguage = FetchCurrentLanguage();

    useEffect(() => {
        getTendersByNoticeNumber(props?.noticeNumber).then(result => {
            const allLangs = result.map(tender => tender.noticeLanguage)

            setAllTenders(result);
            setSelectedLanguage(result[0]?.noticeLanguage);
            setAllLanguages(allLangs);
            setTenderDetails(result[0]);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [props]);

    const onLanguageSelect = (e) => {
        e.preventDefault();
        const tender = allTenders.find(val => val.noticeLanguage === e.target.value)
        setSelectedLanguage(e.target.value);
        setTenderDetails(tender);
    }

    const downloadLink = () => {
        if (props?.serviceProvider === "Ted") {
            return `https://ted.europa.eu/udl?uri=TED:NOTICE:539585-2022:PDF:${selectedLanguage}:HTML&tabId=0`
        } else {
            return `https://www.doffin.no/en/Notice/Details/${props.noticeNumber}`
        }
    }

    const toggelModal = () => {
        setModalVisible(prev => !prev)
    }

    const GeneralView = () => {
        return (
            <>
                {loading &&
                    <div className="loading center-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                <div className="overflow-scroll-y h-400">
                    {currentLanguage !== selectedLanguage &&
                        <div className="ant-alert ant-alert-warning">
                            {t('TENDER_WARNING')}
                        </div>
                    }
                    <div className="g-row">
                    <div className="g-col-6">
                

                <div className="language-dropdown">
                    <Dropdown values={allLanguages}
                        onChange={onLanguageSelect}
                        selected={selectedLanguage}
                        placeholder={t('AVAILABLE_LANGUAGES')}
                    />
                </div>
                <TextRow label={t('DESCRIPTION')} value={tenderDetails?.buyerDescription} />
                            <TextRow label={t('MAIN_CPV_CODE')} value={tenderDetails?.mainCPVCode} />
                            <TextRow label={t("EMAIL")} value={tenderDetails?.buyerDetails?.email} />
                <TextRow label={t('STAUS')} value={tenderDetails?.noticeStatus} />
                <h3 className="fl m-t-20 p-t-20">{t('BUYER_DETAILS')}</h3>
                <TextRow label={t('COMPANY_NAME')} value={tenderDetails?.buyerDetails?.name} />
                <TextRow label={t('ORGANIZATION_ID')} />
                <TextRow label={t('LOCATION')} value={tenderDetails?.buyerDetails?.postalAddress} />
                    <TextRow label={t('DATE')} value={""} />
                    </div>
                        <div className="g-col-6">
                            <ul className="list-style-none">
                                <li><a href={downloadLink()} download >
                                    <FilePdfTwoTone className="m-r-5" />{t('DOWNLOAD_ORIGINAL_PDF')}
                                </a></li>
                                <li>
                                    <div className="link" onClick={() => { navigator.clipboard.writeText(downloadLink()) }} >
                                        <CopyTwoTone className="m-r-5" />{t('COPY_DOWNLOAD_LINK')}
                                    </div>
                                </li>
                                <li>
                                    <div className="btn g-btn-default" onClick={toggelModal}><ShareAltOutlined className="m-r-5" />{t('SHARE')}</div>
                                  </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const AdditionalAttachments = () => {
        return (
            <>
                {
                    !(tenderDetails?.doffinExpreeofintUrl || tenderDetails?.attachDocument || tenderDetails?.attachParticipant) &&
                    <div>{t('NO_ATTACHMENTS')}</div>
                }
                {tenderDetails?.doffinExpreeofintUrl &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails?.doffinExpreeofintUrl} download >
                        <div><FilePdfTwoTone className="m-r-5" />{t('DOFFIN_EXPRESSION')}</div>
                    </a>
                }
                {tenderDetails?.attachDocument &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails.attachDocument} download >
                        <div><FilePdfTwoTone className="m-r-5" />{t('ATTACH_DOCUMENT')}</div>
                    </a>
                }
                {tenderDetails?.attachParticipant &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails?.attachParticipant} download >
                        <div><FilePdfTwoTone className="m-r-5" />{t('ATTACH_PARTICIPANT')}</div>
                    </a>
                }
            </>
        )
    }

    return (
        <>
            <div className="g-row detail-view-header">
                <TextColumn label={t('DOCUMENT_NUMBER')} value={tenderDetails?.noticeNumber} containerStyle="g-col-2" />
                <TextColumn label={t('NUTS_CODE')} value={tenderDetails?.buyerDetails?.nutsCode} containerStyle="g-col-2" />
                <TextColumn label={t('LOCATION')} value={tenderDetails?.buyerDetails?.country} />
                <TextColumn label={t('PUBLISHED_DATE')} value={tenderDetails?.publicationDate} containerStyle="g-col-2" />
                <TextColumn label={t('DEADLINE')} value={tenderDetails?.deletionDate} containerStyle="g-col-2" />
                <TextColumn label={t('CONTACT_PERSON')} value={tenderDetails?.buyerDetails?.contactPerson} />
                <TextColumn label={t('ORIGINAL_LANGUAGE')} value={tenderDetails?.originalLanguage} containerStyle="g-col-2 fr" />
                
            </div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" >
                        <TabPane tab="GENERAL" key="1">
                            <GeneralView />
                        </TabPane>
                        <TabPane tab="ADDITIONAL ATTACHMENTS" key="2">
                            <AdditionalAttachments />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Modal
                title={t('SHARE')}
                visible={modalVisible}
                centered={true}
                footer={null}
                onCancel={toggelModal}
                width={380}
                closeIcon={< i className='icon-close close-icon'/>}
            >
                <div className="m-b-20 p-b-10 m-l-20 p-l-20">
                    <EmailShareButton children={
                        <div className="flex-center-middle m-r-20 p-r-20">
                            <EmailIcon size={32} />
                            <div className="m-l-10">{t('EMAIL')}</div>
                        </div>}
                        url={downloadLink()}
                    />
                    <FacebookShareButton children={
                        <div className="flex-center-middle m-r-20 p-r-20">
                            <FacebookIcon size={32} />
                            <div className="m-l-10">FaceBook</div>
                        </div>}
                        url={downloadLink()}
                    />
                    <br />
                </div>
                <div className="m-b-20 p-b-10 m-l-20 p-l-20">
                    <TwitterShareButton children={
                        <div className="flex-center-middle m-r-20 p-r-20">
                            <TwitterIcon size={32} />
                            <div className="m-l-10">Twitter</div>
                        </div>}
                        url={downloadLink()}
                    />
                    <LinkedinShareButton children={
                        <div className="flex-center-middle m-r-20 p-r-20">
                            <LinkedinIcon size={32} />
                            <div className="m-l-10">Linkedin</div>
                        </div>}
                        url={downloadLink()}
                    />
                    <br />
                </div>
            </Modal>
        </>
    )

}

export default TenderDetails;

const TextColumn = ({ label, value, containerStyle = "" }) => {
    return (
        <div className={"g-col-1 " + containerStyle}>
            <div>{label}</div>
            <div className="body-text-bold">{value}</div>
        </div>
    )
}

const TextRow = ({ label, value, containerStyle = "" }) => {
    return (
        <div className={"g-row m-t-20 " + containerStyle}>
            <div className="g-col-2">{label}</div>
            <div className="g-col-3">{value}</div>
        </div>
    )
}