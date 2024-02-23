import React from 'react'
import { LoginPage } from '@/features';
import Head from 'next/head';

const Login = () => {
  return (
    <div>
      <LoginPage />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />

      </Head>
    </div>
  )
}

export default Login