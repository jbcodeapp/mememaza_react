import Gallery from '../../components/Gallery'
import { SITE_URL } from '@/def'
import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { timeAgo } from '@/utils/timeAgo'

import RectSkeleton from '../../components/skeletons/RectSkeleton'
import Head from 'next/head'

export async function getServerSideProps(context) {
  const { slug } = context.params

  const res = await axios(SITE_URL + `/getpostbyslug/${slug}/post`, {
    method: 'GET',
  })
  return {
    props: {
      data: res.data,
    },
  }
}

export default function PostPage({ data }) {
  const router = useRouter()
  const { slug } = router.query
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState()
  const [seeMore, setSeeMore] = useState(false)

  const attachSeeMoreLessListeners = () => {
    let seeMoreButton = document.getElementById('seeMore')

    if (seeMoreButton) {
      seeMoreButton.addEventListener('click', (e) => {
        e.preventDefault()
        setSeeMore(true)
        setTimeout(() => {
          let seeLessButton = document.getElementById('seeLess')
          if (seeLessButton) {
            seeLessButton.addEventListener('click', (f) => {
              f.preventDefault()
              setSeeMore(false)
              setTimeout(() => {
                attachSeeMoreLessListeners()
              }, 100)
            })
          }
        }, 100)
      })
    }
  }
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (data?.obj) {
      attachSeeMoreLessListeners()
    }
  }, [data])

  const descriptionLength = 70

  let seeMoreText =
    data?.obj.desc.slice(0, descriptionLength) +
    `${
      data?.obj.desc.length > descriptionLength
        ? `... <a style="font-size: 14px" href="" id="seeMore">See more</a>`
        : ''
    }`

  let seeLessText =
    data?.obj.desc +
    ' <a href="" style="font-size: 14px" id="seeLess">See less</a>'

  if (slug) {
    const getComment = async () => {}
    const handleOnComment = async () => {}
    const handleCommentDelete = async () => {}
    const handleLike = async () => {
      setIsLiked(true)
      axios(SITE_URL + '/updatelike/', {
        method: 'POST',
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

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Memesmaza - {data?.obj.meta_title} Post</title>
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
          <meta property="og:image" content={data?.obj.image_path} />
          <meta property="og:url" content={router.asPath} />
          <meta property="og:title" content={data?.obj.meta_title} />
          <meta property="og:description" content={data?.obj.meta_title} />
          <meta property="og:type" content="article" />

          {/* <!-- Twitter Card Tags --> */}
          <meta name="twitter:card" content={data?.obj.meta_desc} />
          <meta name="twitter:site" content="@yourTwitterHandle" />
          <meta name="twitter:title" content={data?.obj.meta_title} />
          <meta name="twitter:description" content={data?.obj.meta_desc} />
          <meta name="twitter:image" content={data?.obj.image_path} />
        </Head>
        {mounted && (
          <>
            <Navbar bgOpacity={1} />
            <Gallery
              id={data?.obj.id}
              type="post"
              comments={data?.obj.comments}
              views_count={data?.obj.views_count || 0}
              likes_count={data?.obj.likes_count || 0}
              comments_count={data?.obj.comments_count || 0}
              downloads_count={data?.obj.download || 0}
              shares_count={data?.obj.shares_count || 0}
              slug={slug}
              media_url={data?.obj.image}
              mediaType="photo"
              previousLink={data?.previous}
              nextLink={data?.next}
              isLiked={isLiked}
              loading={loading}
              getComment={getComment}
              onComment={handleOnComment}
              onLike={handleLike}
              onCommentDelete={handleCommentDelete}
              onDislike={handleDislike}
              onShare={onShare}
              onDownload={onDownload}
              media={
                <img
                  style={{ maxHeight: '100%' }}
                  src={!loading && data?.obj.image}
                  alt={!loading && data?.obj.title}
                />
              }
              title={
                !loading && (
                  <>
                    {data?.obj.title ? (
                      <b>{data?.obj.title}</b>
                    ) : (
                      <RectSkeleton variant="light" height={20} width={300} />
                    )}
                    {data?.obj.desc ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: seeMore ? seeLessText : seeMoreText,
                        }}
                      />
                    ) : (
                      <>
                        <RectSkeleton
                          variant="lighter"
                          height={18}
                          width={200}
                        />
                        <RectSkeleton
                          variant="lighter"
                          height={18}
                          width={300}
                        />
                        <RectSkeleton
                          variant="lighter"
                          height={18}
                          width={300}
                        />
                      </>
                    )}
                  </>
                )
              }
              timeAgo={!loading ? timeAgo(data?.obj.created_at) : ''}
              likes={!loading && data?.obj.like}
            />
          </>
        )}
      </>
    )
  }
  return null
}
