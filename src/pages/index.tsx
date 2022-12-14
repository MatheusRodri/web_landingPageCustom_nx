import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import techsImages from '../../public/images/techs.svg';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import {RichText} from 'prismic-dom';


type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileBanner: string;
  mobileContent: string;
  titleWeb: string;
  webContent: string;
  webBanner:string;
}
interface ContentProps{
    content: Content;
}

export default function Home({content}: ContentProps) {

  console.log(content);
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
              <button>
                Começar agora
              </button>
            </a>

          </section>
          <img src="/images/banner-conteudos.png" alt='image' />
        </div>
        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img src={content.mobileBanner} alt='teste' />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src={content.webBanner} alt='teste' />

          <section>
            <h2>{content.titleWeb}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImages} alt='text' />
          <h2>Mais de <span className={styles.studentsAmount}>15 mil</span> já levaram sua carreira para o proximo nivel.</h2>
          <span>Lorem ipsum dolor sit amet doloremque dol ore asperiores deserunt distinctio</span>
          <a href={content.linkAction}>
            <button>ACESSAR TURMA </button>
          </a>

        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])


  const { 
    title, sub_title, link_action,
    mobile,mobile_content, mobile_banner,
    title_web, web_content, web_banner 
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    titleWeb: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  };

  return {
    props: {
      content
    },
    revalidate: 60 * 2 // 2 minutes
  }
}