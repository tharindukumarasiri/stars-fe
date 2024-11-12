import React, { useState, memo } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Collapse } from 'antd';

import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import style from '../DndStyles.module.scss'
import Shapes, { Categories, uploadNodeId, OtherCategories } from '../ShapesData.js';
import Input from '../../../common/input'
import { readFile } from '../utils';

const { Dragger } = Upload;
const { Panel } = Collapse;

const savedShapesKey = 'SAVED_SHAPES';

const SideBar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [closedCategories, setClosedCategories] = useState(Object.keys(Categories));
    const [searchText, setSearchText] = useState('');

    const loading = useDiagramStore((state) => state.loading);
    const uploadedImages = useDiagramStore((state) => state.uploadedImages);
    const uploadImage = useDiagramStore((state) => state.uploadImage);


    const props = {
        name: 'file',
        multiple: false,
        accept: "image/png, mage/jpg, image/jpeg",
        disabled: loading,
        showUploadList: false,
        async customRequest(info) {
            const file = info.file;
            const imageDataUrl = await readFile(file);

            const payload = {
                'ImageString': imageDataUrl,
            }
            uploadImage(payload);
        },
    };

    const onDragStart = (event, nodeType, image = null) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        if (image)
            event.dataTransfer.setData('application/reactflow/uploaded', image);

        event.dataTransfer.effectAllowed = 'move';
    };

    const onArrowClicked = () => setSidebarVisible(pre => !pre);

    const CustomShape = ({ shape }) => {
        return (
            <svg viewBox={shape?.viewBox} fill="#ffffff" stroke="#434343" >
                {shape?.image}
            </svg>
        )
    }

    const UploadedShape = ({ image }) => (
        <img src={image} className="" alt="img" />
    )

    const onCategoryClick = (category) => {
        const index = closedCategories?.findIndex(cat => cat === category)
        const newClosedCategories = [...closedCategories]

        if (index < 0) {
            newClosedCategories.push(category)
        } else {
            newClosedCategories.splice(index, 1)
        }

        setClosedCategories(newClosedCategories);
    }

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.sidebarColapsBtnContainer}>
                {sidebarVisible &&
                    <h3>Drawing Types</h3>
                }
                <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-left' : ' icon-circle-arrow-right')}
                    onClick={onArrowClicked} />
            </div>
            {sidebarVisible &&
                <div className='m-t-10'>
                    <Input placeholder="Search" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                </div>
            }
            <div className={style.sidebarMainContainer}>
                {sidebarVisible &&
                    <>
                        {searchText.length > 0 ?
                            <div className={style.sidebarCategoryContainer}>
                                {
                                    Object.entries(Shapes)?.map(shape => {
                                        if (shape[0]?.toLowerCase().includes(searchText.toLocaleLowerCase()))
                                            return (
                                                <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                    <CustomShape shape={shape[1]} />
                                                </div>
                                            )
                                    })
                                }
                            </div> :
                            <Collapse accordion>
                                <Panel header="Shapes" key="1">
                                    <Collapse accordion>
                                        {Object.entries(Categories)?.map(category => {
                                            return (
                                                <Panel header={category[1]} key={category[1]}>
                                                    <div className={style.sidebarCategoryContainer}>
                                                        {
                                                            Object.entries(Shapes)?.map(shape => {
                                                                if (shape[1]?.category?.includes(category[1]))
                                                                    return (
                                                                        <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                                            <CustomShape shape={shape[1]} />
                                                                        </div>
                                                                    )
                                                            })
                                                        }
                                                    </div>
                                                </Panel>
                                            )
                                        })}
                                    </Collapse>
                                </Panel>

                                {Object.entries(OtherCategories)?.map(category => {
                                    return (
                                        <Panel header={category[1]} key={category[1]}>
                                            <div className={style.sidebarCategoryContainer}>
                                                {
                                                    Object.entries(Shapes)?.map(shape => {
                                                        if (shape[1]?.category?.includes(category[1]))
                                                            return (
                                                                <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                                    <CustomShape shape={shape[1]} />
                                                                </div>
                                                            )
                                                    })
                                                }
                                            </div>
                                        </Panel>
                                    )
                                })}

                                <Panel header="My saved shapes" key="4">
                                    {!closedCategories.includes(savedShapesKey) &&
                                        <div className={style.sidebarCategoryImageUploadContainer}>
                                            <Dragger {...props}>
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                {loading ?
                                                    <p className="ant-upload-text">Uploading...</p>
                                                    : <p className="ant-upload-text">Click or drag shapes to this area to upload</p>
                                                }
                                            </Dragger>
                                            <div className={style.sidebarCategoryImageUploadedContainer}>
                                                {uploadedImages.map((imageData, index) => (
                                                    <div className={style.sidebarItemContainer}
                                                        onDragStart={(event) => onDragStart(event, uploadNodeId, imageData.ImageString)}
                                                        draggable key={index}>
                                                        <UploadedShape image={imageData.ImageString} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </Panel>
                            </Collapse>
                        }

                    </>
                }
            </div>
        </aside>
    );
};

export default memo(SideBar);