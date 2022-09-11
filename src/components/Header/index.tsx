import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';
import ActiveLink from '../ActiveLink';

function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href="/" activeClassName={styles.active}>
                    <a>
                        <Image src={logo} alt="logo" />
                    </a>
                </ActiveLink>
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Conteudos</a>
                    </ActiveLink>

                    <ActiveLink href="/sobre" activeClassName={styles.active}>
                        <a>Quem somos</a>
                    </ActiveLink>
                </nav>

                <a className={styles.readyButton} type='button' href='https://www.google.com'>Começar</a>
            </div>
        </header>
    );
}

export default Header;