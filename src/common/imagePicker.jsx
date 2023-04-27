import React, { useRef, useState, useCallback } from "react";
import { Modal, Slider } from 'antd';
import Cropper from 'react-easy-crop';

import image_thumb from "../assets/images/image_thumb.png"

const ImagePicker = ({ setImage, selectedImage = null }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(selectedImage)

    const UPLOAD_BTN_REF = useRef(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleImageUpload = () => UPLOAD_BTN_REF.current.click();
    const toggleImagePicker = () => setModalVisible(pre => !pre)

    const createImage = (url) => {
        const image = new Image()
        image.src = url

        return image
    }

    const getRadianAngle = (degreeValue) => {
        return (degreeValue * Math.PI) / 180
    }

    const rotateSize = (width, height, rotation) => {
        const rotRad = getRadianAngle(rotation)

        return {
            width:
                Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }

    async function getCroppedImg(
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) {
        const image = createImage(imageSrc)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        const rotRad = getRadianAngle(rotation)

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)

        // As Base64 string
        return canvas.toDataURL('image/jpeg');
    }

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            setCroppedImage(croppedImage)
            setImage(croppedImage)
            setImageSrc(null)
            toggleImagePicker()
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {

            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            setImageSrc(imageDataUrl)
            toggleImagePicker()
        }
    }

    return (
        <>
            <div className="upload-image-container">
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={UPLOAD_BTN_REF}
                    onChange={onFileChange}
                />
                <div className="user-image-container">
                    <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={handleImageUpload} />
                    <img src={croppedImage ? croppedImage : image_thumb} className="user-image hover-hand" alt="img" onClick={handleImageUpload} />
                </div>
            </div>
            <Modal
                title="Upload Image"
                visible={modalVisible}
                onCancel={toggleImagePicker}
                onOk={showCroppedImage}
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}>
                <>
                    <div className="image-picker-img-container">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            cropShape={"round"}
                            aspect={1}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            objectFit={'auto-cover'}
                        />
                    </div>

                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={setZoom}
                        tooltip={{
                            formatter: null,
                        }}
                    />
                </>
            </Modal>
        </>
    )
}

export default ImagePicker;