import Input from '../../common/input'
import style from './FormBuilder.module.scss'

const Header = ({ title, description, setTitle, setDescription }) => {
    return (
        <div className={style.headerContainer}>
            <Input
                value={title}
                onChange={setTitle}
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