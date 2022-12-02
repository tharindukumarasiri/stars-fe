import React, { useEffect, useState } from "react";
import { Tabs, Modal } from "antd";
import Dropdown from "../../common/dropdown";
import { FilePdfTwoTone, CopyTwoTone, ShareAltOutlined } from '@ant-design/icons';
import { getTendersByNoticeNumber } from "../../services/organizationsService";
import { FetchCurrentLanguage } from "../../hooks";
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

const { TabPane } = Tabs;


const TenderDetails = (props) => {
    const [allTenders, setAllTenders] = useState([]);
    const [tenderDetails, setTenderDetails] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [allLanguages, setAllLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

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
        return `https://ted.europa.eu/udl?uri=TED:NOTICE:539585-2022:PDF:${selectedLanguage}:HTML&tabId=0`
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
                {currentLanguage !== selectedLanguage &&
                    <div className="notification-box flex-center-middle">
                        <div className="white">This Notice is not available in your “Default” Language.Please select options below.</div>
                    </div>
                }

                <div className="language-dropdown">
                    <Dropdown values={allLanguages}
                        onChange={onLanguageSelect}
                        selected={selectedLanguage}
                        placeholder="Available Language/s"
                    />
                </div>
                <TextRow label="Description" value={tenderDetails?.buyerDescription} />
                <TextRow label="Main CPV code" value={tenderDetails?.mainCPVCode} />
                <TextRow label="Email" value={tenderDetails?.buyerDetails?.email} />
                <TextRow label="State" value={tenderDetails?.noticeStatus} />
                <h3 className="fl m-t-20 p-t-20">Buyer Details</h3>
                <TextRow label="Company Name" value={tenderDetails?.buyerDetails?.name} />
                <TextRow label="Organisarion ID" />
                <TextRow label="Location" value={tenderDetails?.buyerDetails?.postalAddress} />
                <TextRow label="Date" value={""} />
                <a className="fl m-t-20 p-t-20" href={downloadLink()} download >
                    <div><FilePdfTwoTone className="m-r-5" />Download original Pdf</div>
                </a>
                <div className="fl m-t-20 p-t-20 m-l-20 hover-hand" onClick={() => { navigator.clipboard.writeText(downloadLink()) }} >
                    <div><CopyTwoTone className="m-r-5" />Copy Download Link</div>
                </div>
                <div className="fl m-t-20 p-t-20 m-l-20 hover-hand" onClick={toggelModal} >
                    <div className="share-btn"><ShareAltOutlined className="m-r-5" />Share</div>
                </div>
            </>
        )
    }

    const AdditionalAttachments = () => {
        return (
            <>
                {
                    !(tenderDetails?.doffinExpreeofintUrl || tenderDetails?.attachDocument || tenderDetails?.attachParticipant) &&
                    <div>No Attachments</div>
                }
                {tenderDetails?.doffinExpreeofintUrl &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails?.doffinExpreeofintUrl} download >
                        <div><FilePdfTwoTone className="m-r-5" />Doffin Expree of int</div>
                    </a>
                }
                {tenderDetails?.attachDocument &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails.attachDocument} download >
                        <div><FilePdfTwoTone className="m-r-5" />Attach Document</div>
                    </a>
                }
                {tenderDetails?.attachParticipant &&
                    <a className="fl m-t-20 p-t-20" href={tenderDetails?.attachParticipant} download >
                        <div><FilePdfTwoTone className="m-r-5" />Attach Participant</div>
                    </a>
                }
            </>
        )
    }

    return (
        <>
            <div className="g-row m-l-20 m-b-20 m-t-10">
                <TextColumn label={'Document Number'} value={tenderDetails?.noticeNumber} containerStyle="g-col-2" />
                <TextColumn label={'NUTS Code'} value={tenderDetails?.buyerDetails?.nutsCode} />
                <TextColumn label={'Location'} value={tenderDetails?.buyerDetails?.country} />
                <TextColumn label={'published Date'} value={tenderDetails?.publicationDate} containerStyle="g-col-2" />
                <TextColumn label={'Deadline'} value={tenderDetails?.deletionDate} containerStyle="g-col-2" />
                <TextColumn label={'Contact Person'} value={tenderDetails?.buyerDetails?.contactPerson} />
                <TextColumn label={'Original Language'} value={tenderDetails?.originalLanguage} containerStyle="g-col-2 fr m-l-20" />
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
                title={'Share'}
                visible={modalVisible}
                centered={true}
                footer={null}
                onCancel={toggelModal}
                width={380}
            >
                <div className="m-b-20 p-b-10 m-l-20 p-l-20">
                    <EmailShareButton children={
                        <div className="flex-center-middle m-r-20 p-r-20">
                            <EmailIcon size={32} />
                            <div className="m-l-10">E-mail</div>
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