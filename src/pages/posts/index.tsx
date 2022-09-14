import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import {FiChevronsLeft,FiChevronLeft,FiChevronRight,FiChevronsRight} from 'react-icons/fi';

import thumbImg from '../../../public/images/thumb.png';

function Posts() {
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link href="/">
                        <a>
                            <Image src={thumbImg} alt="teste" width={720} height={410} quality={100}/>
                            <strong>Testettetstets</strong>
                            <time>14 julho 2022</time>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorem perspiciatis sed deleniti quidem dolore maxime omnis veritatis ducimus eius voluptates molestiae eos nemo harum sint temporibus atque, dolor tempora!</p>
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <Image src={thumbImg} alt="teste" width={720} height={410} quality={100}/>
                            <strong>Testettetstets</strong>
                            <time>14 julho 2022</time>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorem perspiciatis sed deleniti quidem dolore maxime omnis veritatis ducimus eius voluptates molestiae eos nemo harum sint temporibus atque, dolor tempora!</p>
                        </a>
                    </Link>

                    <div className={styles.buttonNavigate}>
                        <div className={styles.a}>
                            <button>
                                <FiChevronsLeft size={25} color="#fff"/>
                            </button>
                            <button>
                                <FiChevronLeft size={25} color="#fff"/>
                            </button>
                        </div>
                        <div className={styles.a}>
                            <button>
                                <FiChevronRight size={25} color="#fff"/>
                            </button>
                            <button>
                                <FiChevronsRight size={25} color="#fff"/>
                            </button>
                        </div>
                    </div>

                </div>


            </main>
        </>
    );
}

export default Posts;