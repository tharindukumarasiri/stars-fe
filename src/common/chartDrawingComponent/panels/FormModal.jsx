import React from "react";
import { Modal } from "antd";

import FormBuilder from "../../formBuilder";

import style from '../DndStyles.module.scss'

const FormModal = ({ modalVisible, setModalVisible }) => {
    const closeModal = () => setModalVisible(false);

    if (!modalVisible) return null

    return (
        <Modal
            title='Create New Form'
            open={modalVisible}
            footer={[]}
            onCancel={closeModal}
            width={'95vw'}
            height={'80vh'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>
            <FormBuilder screenContainerStyle={style.formContainer} />
            <div className="n-float" />
        </Modal>
    )
}

export default FormModal;