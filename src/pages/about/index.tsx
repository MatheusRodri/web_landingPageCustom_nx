import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss';
import {getPrismicClient} from '../../services/prismic';
import {RichText} from 'prismic-dom';
import Prismic from '@prismicio/client';
import {FaFacebook,FaLinkedin,FaInstagram,FaGithub} from 'react-icons/fa'



type Content = {
    title: string;
    description: string;
    banner: string;
    facebook: string;
    instagram: string;
    github: string;
    linkedin: string;
}

interface ContentProps {
    content: Content;
}

export default function About({content}:ContentProps){
    return(
        <>
            <Head>
                <title>About</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>{content.title}</h1>
                        <p>{content.description}</p>

                        <a href={content.facebook}>
                            <FaFacebook size={40} color='#fff'/>
                        </a>
                        <a href={content.instagram}>
                            <FaInstagram size={40} color='#fff'/>
                        </a>
                        <a href={content.github}>
                            <FaGithub size={40} color='#fff'/>
                        </a>
                        <a href={content.linkedin}>
                            <FaLinkedin size={40} color='#fff'/>
                        </a>
                    </section>

                    <img src={content.banner} alt='mercedes'/>

                </div>
            </main>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () =>{
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type','about')
    ])

    console.log(response.results[0].data);
    const {
        title,
        description,
        banner,
        facebook,
        instagram,
        github,
        linkedin,
    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url,
        facebook: facebook.url,
        instagram: instagram.url,
        github: github.url,
        linkedin: linkedin.url,
    }


    return{
        props:{
            content
        },
        revalidate: 60 * 60 * 24 * 30, //30 days
    }
}

