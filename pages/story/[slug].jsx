import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'

import { API_PATH, SITE_URL } from '@/def'
import { timeAgo } from '@/utils/timeAgo'

import Gallery from '../../components/Gallery'
import Navbar from '../../components/Navbar'
import Head from 'next/head'

export async function getServerSideProps(context) {
  const { slug } = context.params

  const res = await axios(SITE_URL + `/getpostbyslug/${slug}/story`, {
    method: 'GET',
  })
  return {
    props: {
      data: res.data,
    },
  }
}
export default function ReelsPage({ data }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { slug } = router.query
  const [isLiked, setIsLiked] = useState(false)
  const getComment = async () => {}
  const handleOnComment = async () => {}
  const handleCommentDelete = async () => {}
  const handleLike = async () => {
    setIsLiked(true)
    axios(SITE_URL + '/updatelike/', {
      method: 'POST',
      'Access-Control-Allow-Origin' : '*',
      data: { id: data.obj.id, module: 'posts' },
    })
      .then((resp) => {
        if (resp.status == 'success') {
          if (setIsLiked == false) {
            setIsLiked(true)
          }
        } else {
          setIsLiked(false)
        }
      })
      .catch(() => {
        setIsLiked(false)
      })
  }
  const handleDislike = async () => {
    setIsLiked(false)
    axios(SITE_URL + '/updatedislike/', {
      method: 'POST',
      data: { id: data.obj.id, module: 'posts' },
    })
      .then((resp) => {
        if (resp.status == 'success') {
          if (setIsLiked == false) {
            setIsLiked(false)
          }
        } else {
          setIsLiked(true)
        }
      })
      .catch((err) => {
        setIsLiked(true)
      })
  }
  const onShare = async () => {}
  const onDownload = async () => {}

  let mediaType = ''
  let media

  switch (data?.obj.story_type) {
    case 1:
      mediaType = 'photo'
      media = (
        <div
          style={{
            height: '600px',
            borderRadius: 14,
            width: '300px',
            backgroundImage: `url(${data?.obj.story})`,
            backgroundSize: 'contain',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <a
            href={data?.obj.link}
            target="_blank"
            style={{ background: '#000000ee', padding: 12, borderRadius: 12 }}
          >
            {/* Know More */}
            {data?.obj.link}

          </a>{' '}
        </div>
      )
      break

    case 2:
      mediaType = 'video'
      media = (
        <ReactPlayer
          height={'calc(100% - 100px)'}
          controls
          loop
          playing
          url={data?.obj.story}
        />
      )
      break
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Memesmaza - {`${data?.obj.meta_title}`} Reel</title>
        <meta name="description" content={data?.obj.meta_desc} />
        <meta name="keywords" content={data?.obj.meta_keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="author" content="Mememaza" />

        {/* <!-- Open Graph (OG) Tags --> */}
        <meta property="og:title" content="Your Open Graph Title" />
        <meta
          property="og:description"
          content="A description for Open Graph."
        />
        <meta
          property="og:image"
          content={data?.obj.vdo_image || data?.obj.story}
        />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:title" content={data?.obj.meta_title} />
        <meta property="og:description" content={data?.obj.meta_title} />
        <meta property="og:type" content="article" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content={data?.obj.meta_desc} />
        <meta name="twitter:site" content="@memesmaza" />
        <meta name="twitter:title" content={data?.obj.meta_title} />
        <meta name="twitter:description" content={data?.obj.meta_desc} />
        <meta
          name="twitter:image"
          content={data?.obj.vdo_image || data?.obj.story}
        />
      </Head>
      {slug && mounted && (
        <>
          <Navbar bgOpacity={1} />
          <Gallery
            type="story"
            id={data?.obj.id}
            comments={data?.obj.comments}
            slug={slug}
            mediaType={mediaType}
            previousLink={data?.previous}
            nextLink={data?.next}
            isLiked={isLiked}
            loading={false}
            getComment={getComment}
            onComment={handleOnComment}
            onLike={handleLike}
            onCommentDelete={handleCommentDelete}
            onDislike={handleDislike}
            onShare={onShare}
            onDownload={onDownload}
            media={media}
            title={<></>}
            timeAgo={timeAgo(data?.obj.created_at)}
            likes={data?.obj.like}
          />
        </>
      )}
    </>
  )
}
