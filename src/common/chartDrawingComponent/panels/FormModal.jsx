import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import FormBuilder from "../../formBuilder";

import style from '../DndStyles.module.scss'
import { useDiagramStore } from "../../../Views/ChartDrawing/chartDrawingStore";
import FormFill from "../../formBuilder/FormFill";

const { confirm } = Modal;

const FormModal = ({ addFormToShape, onFormResponse }) => {
    const currentUser = useDiagramStore((state) => state.currentUser);
    const getFormsData = useDiagramStore((state) => state.getFormsData);
    const formsModalVisible = useDiagramStore((state) => state.formsModalVisible);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const formFillData = useDiagramStore((state) => state.formFillData);
    const setFormFillData = useDiagramStore((state) => state.setFormFillData);

    const onCancel =() => {
        if(formFillData){
            confirm({
                title: 'Are you sure you want to cancel',
                icon: <ExclamationCircleOutlined />,
    
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
    
                onOk() {
                    closeModal()
                },
            });
        } else {
            closeModal()
        }
      
    }

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
            onCancel={onCancel}
            width={'80vw'}
            height={'80vh'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>
            {formFillData ?
                <FormFill 
                onCancel={onCancel} 
                closeModal={closeModal}
                currentUser={currentUser?.Id}
                onFormResponse={onFormResponse}
                />
                : <FormBuilder
                    screenContainerStyle={style.formContainer}
                    currentUser={currentUser?.Id}
                    closeModal={closeModal}
                    addFormToShape={addFormToShape}
                />
            }
            <div className="n-float" />
        </Modal>
    )
}

export default FormModal;