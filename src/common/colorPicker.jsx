import React from "react";
import { SketchPicker, TwitterPicker } from 'react-color'
import { presetColors } from "./chartDrawingComponent/utils";

const ColorPicker = ({ onMouseLeave, onChange, color, styles = {}, reduced = false }) => (
    <div className="color-picker-container" onMouseLeave={onMouseLeave} style={styles} >
        {reduced ?
            <TwitterPicker color={color} onChangeComplete={onChange} />
            : <SketchPicker color={color} onChangeComplete={onChange} presetColors={presetColors} />
        }

    </div>
);

export default ColorPicker;