import React, { useEffect, useRef } from "react";

const CustomCheckBox = ({ checked, indeterminate, onChange }) => {
    const CHECKBOX_REF = useRef()

    const stopPropagateCheckBox = (e) => e.stopPropagation();

    useEffect(() => {
        if (checked) {
            CHECKBOX_REF.current.checked = true;
            CHECKBOX_REF.current.indeterminate = false;
        } else if (!checked && indeterminate) {
            CHECKBOX_REF.current.checked = false;
            CHECKBOX_REF.current.indeterminate = true;
        } else {
            CHECKBOX_REF.current.checked = false;
            CHECKBOX_REF.current.indeterminate = false;
        }
    }, [checked, indeterminate]);

    return (
        <input type="checkbox" className="check-box"
            ref={CHECKBOX_REF}
            onChange={onChange}
            onClick={stopPropagateCheckBox}
        />
    )
}

export default CustomCheckBox;