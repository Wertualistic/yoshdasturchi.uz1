import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Result = () => {
    const ResultPage = dynamic(() => import('@/features/result'), { ssr: false })
    return (
        <>
            <Head>
                <title>Yoshdasturchi</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResultPage />
        </>
    )
}

export default Result