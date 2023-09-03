import React from 'react'
import Head from 'next/head'

export default function register() {
  return (
    <>
      <Head>
        <meta http-equiv="refresh" content="0; url=/auth/register" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
      </div>
    </>
  )
}
