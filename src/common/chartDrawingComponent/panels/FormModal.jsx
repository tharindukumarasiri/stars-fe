import React from "react";
import { Modal } from "antd";

import FormBuilder from "../../formBuilder";

import style from '../DndStyles.module.scss'
import { useDiagramStore } from "../../../Views/ChartDrawing/chartDrawingStore";
import FormFill from "../../formBuilder/FormFill";

const FormModal = () => {
    const currentUser = useDiagramStore((state) => state.currentUser);
    const getFormsData = useDiagramStore((state) => state.getFormsData);
    const formsModalVisible = useDiagramStore((state) => state.formsModalVisible);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const formFillData = useDiagramStore((state) => state.formFillData);
    const setFormFillData = useDiagramStore((state) => state.setFormFillData);

    const closeModal = () => {
        setFormsModalVisible(false);
        getFormsData();
        setFormFillData("")
    };

    if (!formsModalVisible) return null

    return (
        <Modal
            title='Create New Form'
            open={formsModalVisible}
            footer={[]}
            onCancel={closeModal}
            width={'80vw'}
            height={'80vh'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>
            {formFillData ?
                <FormFill />
                : <FormBuilder screenContainerStyle={style.formContainer} currentUser={currentUser?.Id} closeModal={closeModal} />
            }
            <div className="n-float" />
        </Modal>
    )
}

export default FormModal;