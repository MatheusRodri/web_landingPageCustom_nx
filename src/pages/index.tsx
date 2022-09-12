import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import techsImages from '../../public/images/techs.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Levando vc ao proximo nivel!</h1>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos libero eius ea vel, reprehenderit eaque impedit, natus fugit officia soluta eveniet vero, minima neque! Maiores inventore natus cumque doloribus nihil!</span>
            <a>
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
            <h2>Aprenda criar app</h2>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat autem voluptatum harum ducimus veniam sit alias nostrum? Dolore tempore inventore expedita nostrum deleniti eius nihil in neque dolorum, quo tenetur!  </span>
          </section>

          <img src="/images/financasApp.png" alt='teste' />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src="/images/webDev.png" alt='teste' />

          <section>
            <h2>Aprenda criar app</h2>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat autem voluptatum harum ducimus veniam sit alias nostrum? Dolore tempore inventore expedita nostrum deleniti eius nihil in neque dolorum, quo tenetur!  </span>
          </section>
        </div>

         <div className={styles.nextLevelContent}>
          <Image src={techsImages} alt='text' />
          <h2>Mais de <span className={styles.studentsAmount}>15 mil</span> já levaram sua carreira para o proximo nivel.</h2>
          <span>Lorem ipsum dolor sit amet doloremque dol ore asperiores deserunt distinctio</span>
          <a>
            <button>ACESSAR TURMA </button>
          </a>
         
         </div>
      </main>
    </>
  )
}
