import React from "react";
import { SketchPicker } from 'react-color'

const ColorPicker = ({ onMouseLeave, onChange, color, styles = {} }) => (
    <div className="color-picker-container" onMouseLeave={onMouseLeave} style={styles} >
        <SketchPicker color={color} onChangeComplete={onChange} />
    </div>
);

export default ColorPicker;