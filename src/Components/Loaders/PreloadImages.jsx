import React from 'react'
import Head from 'next/head';

function PreloadImages({ imageUrls }) {
  return (
    <Head>
      {imageUrls?.map((url, index) => (
        <link key={index} rel="preload" href={url} as="image" />
      ))}
    </Head>
  )
}

export default PreloadImages