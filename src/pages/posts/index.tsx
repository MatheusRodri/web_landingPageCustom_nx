import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';

import { GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useState } from 'react';


type Post = {
    slug: string;
    title: string;
    description: string;
    cover: string;
    updatedAt: string;
}
interface PostProps {
    posts: Post[];
    page: string;
    totalPages: string;
}

function Posts({ posts: postsBlog, page, totalPages }: PostProps) {

    const [posts, setPosts] = useState(postsBlog || []);
    const [currentPage, setCurrentPage] = useState(Number(page));


    async function reqPost(pageNumber:number){
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type','post')
        ],{
            orderings: '[document.last_publication_date desc]',
            fetch: ['post.title', 'post.description', 'post.cover'],
            pageSize: 2,
            page: String(pageNumber)
        })

        return response;
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqPost(pageNumber);

        if(response.results.length === 0){
            return;
        }

        const getPosts = response.results.map(post => {
            return {
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        })

        setCurrentPage(pageNumber);
        setPosts(getPosts);
    }

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>

                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a key={post.slug}>
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    width={720}
                                    height={410}
                                    quality={100}
                                    placeholder='blur'
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFhatBwABOAC8/ZxAngAAAABJRU5ErkJggg=='
                                />

                                <strong>{post.title}</strong>
                                <time>{post.updatedAt}</time>
                                <p>{post.description}</p>
                            </a>
                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        {
                            Number(currentPage) >= 2 && (
                                <div className={styles.a}>
                                    <button onClick={()=>navigatePage(1)}>
                                        <FiChevronsLeft size={25} color="#fff" />
                                    </button>
                                    <button onClick={()=>navigatePage(Number(currentPage-1))}>
                                        <FiChevronLeft size={25} color="#fff" />
                                    </button>
                                </div>
                            )
                        }
                        {
                            Number(currentPage) < Number(totalPages) && (
                                <div className={styles.a}>
                                    <button onClick={()=>navigatePage(Number(currentPage+1))}>
                                        <FiChevronRight size={25} color="#fff" />
                                    </button>
                                    <button onClick={()=>navigatePage(Number(totalPages))}>
                                        <FiChevronsRight size={25} color="#fff" />
                                    </button>
                                </div>
                            )
                        }
                    </div>

                </div>


            </main>
        </>
    );
}

export default Posts;


export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]',
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 2,
    })

    const posts = response.results.map(post => {
        console.log(post.data.description)
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
            cover: post.data.cover.url,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })


    return {
        props: {
            posts,
            page: response.page,
            totalPages: response.total_pages,
        },
        revalidate: 60 * 30, //30 minutes
    }
}