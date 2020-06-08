import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { getAllPostsIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'

import Date from '../../components/date'
import Layout from '../../components/layouts'

export default function Post({ postData }) {
    return (<Layout>
        <Head>
            <title>{ postData.title }</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{ postData.title }</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        </article>
    </Layout>)
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllPostsIds(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}