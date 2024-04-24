'use client'
import Head from 'next/head'

import { HOME_URL } from '../../def'
import { useLocalStorageAuthToken } from '@/hooks/useLocalStorageToken'

const JeenaHead = () => {
  useLocalStorageAuthToken()
  return (
    <Head>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=400px, initial-scale=1, shrink-to-fit=yes"
      />
      {/* Title */}
      <title>Memesmaza</title>
      {/* Favicon Icon */}
      <link
        rel="shortcut icon"
        href="assets/images/favicon.png"
        type="image/x-icon"
      />
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* Flaticon */}
      <link rel="stylesheet" href={HOME_URL + 'assets/css/flaticon.min.css'} />
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href={HOME_URL + 'assets/css/fontawesome-5.14.0.min.css'}
      />
      {/* Bootstrap */}
      <link rel="stylesheet" href={HOME_URL + 'assets/css/bootstrap.min.css'} />
      {/* Magnific Popup */}
      <link rel="stylesheet" href={HOME_URL + 'assets/css/style.css'} />

      {/* 
		<link rel="stylesheet" href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' />
	   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		*/}
    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9094312587008706" crossorigin="anonymous"></script> */}
    </Head>
  )
}
export default JeenaHead
