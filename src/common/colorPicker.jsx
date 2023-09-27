import React from "react";
import { SketchPicker } from 'react-color'

const ColorPicker = ({ onMouseLeave, onChange, color }) => (
    <div className="color-picker-container" onMouseLeave={onMouseLeave}>
        <SketchPicker color={color} onChangeComplete={onChange} />
    </div>
);

export default ColorPicker;