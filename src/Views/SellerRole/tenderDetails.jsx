import React from "react";
import { Tabs } from "antd";
import Dropdown from "../../common/dropdown";
import { FilePdfTwoTone, CopyTwoTone } from '@ant-design/icons';
const { TabPane } = Tabs;


const TenderDetails = (props) => {

    const onLanguageSelect = () => {

    }

    const GeneralView = () => {
        return (
            <>
                <div className="notification-box flex-center-middle">
                    <div className="white">This Notice is not available in your “Default” Language.Please select options below.</div>
                </div>
                <div className="language-dropdown">
                    <Dropdown values={["English"]}
                        onChange={onLanguageSelect}
                        selected={""}
                        placeholder="Available Language/s"
                    />
                </div>
                <TextRow label="Description" value={props?.buyerDescription} />
                <TextRow label="Main CPV code" value={props?.mainCPVCode} />
                <TextRow label="Email" value={props?.buyerDetails?.email} />
                <TextRow label="State" value={props?.noticeStatus} />
                <h3 className="fl m-t-20 p-t-20">Buyer Details</h3>
                <TextRow label="Company Name" value={props?.buyerDetails?.name} />
                <TextRow label="Organisarion ID" />
                <TextRow label="Location" value={props?.buyerDetails?.postalAddress} />
                <TextRow label="Date" value={""} />
                <a className="fl m-t-20 p-t-20" href='https://ted.europa.eu/udl?uri=TED:NOTICE:609394-2022:PDF:EN:HTML' download >
                    <div><FilePdfTwoTone className="m-r-5" />Download original Pdf</div>
                </a>
                <div className="fl m-t-20 p-t-20 m-l-20 hover-hand" onClick={() => { navigator.clipboard.writeText('https://ted.europa.eu/udl?uri=TED:NOTICE:609394-2022:PDF:EN:HTML') }} >
                    <div><CopyTwoTone className="m-r-5" />Copy Download Link</div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="g-row m-l-20 m-b-20 m-t-10">
                <TextColumn label={'Docement Number'} value={props?.receiptionId} containerStyle="g-col-2" />
                <TextColumn label={'NUTS Code'} value={props?.buyerDetails?.nutsCode} />
                <TextColumn label={'Location'} value={props?.buyerDetails?.country} />
                <TextColumn label={'published Date'} value={props?.publicationDate} containerStyle="g-col-2" />
                <TextColumn label={'Deadline'} value={props?.deletionDate} containerStyle="g-col-2" />
                <TextColumn label={'Contact Person'} value={props?.buyerDetails?.contactPerson} />
                <TextColumn label={'Original Language'} value={''} containerStyle="g-col-2 fr m-l-20" />
            </div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" >
                        <TabPane tab="GENERAL" key="1">
                            <GeneralView />
                        </TabPane>
                        <TabPane tab="ADDITIONAL ATTACHMENTS" key="2">
                        </TabPane>
                    </Tabs>
                </div>
            </div>
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