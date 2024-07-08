import React from "react";

import Input from '../../common/input'
import style from './FormBuilder.module.scss'

const Header = ({ title, description, setTitle, setDescription }) => {
    return (
        <div className={style.headerContainer}>
            <Input
                value={title}
                onChange={setTitle}
                placeholder={'Untitled Form'}

            />
            <Input
                value={description}
                lines={3}
                placeholder={'Description'}
                onChange={setDescription}
            />
        </div>
    );
};

export default Header;