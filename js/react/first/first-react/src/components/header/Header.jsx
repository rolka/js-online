import './Header.css'; // global
import styles from './HeaderMod.module.css';

const Header = () =>
{
    const name = 'Ro';
    const surname = 'Za';

    return <div className={`red-bg ${styles.anotherBg}`}>
        Hello {surname && 'Mr.'} {name} {surname || 'Smith'} from header!!!
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
}

export default Header;