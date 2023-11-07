'use client'
import Gallery from '../../components/Gallery'
import { SITE_URL } from '@/def'
import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { timeAgo } from '@/utils/timeAgo'
import ReactPlayer from 'react-player'

import { Helmet } from 'react-helmet'
export default function ReelsPage() {
  const router = useRouter()
  const { slug } = router.query
  const [isLiked, setIsLiked] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
  const [seeMore, setSeeMore] = useState(false)
  const [play, setPlay] = useState(true)

  useEffect(() => {
    if (slug && !data?.length) {
      axios(SITE_URL + `/getpostbyslug/${slug}/reel`, {
        method: 'GET',
      })
        .then((resp) => {
          setLoading(false)
          setData(resp.data)
        })
        .catch((err) => {
          setLoading(false)
          setError(err.message)
        })
    }
  }, [slug])

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

  useEffect(() => {
    if (data?.obj) {
      attachSeeMoreLessListeners()
    }
  }, [data])
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
    let media
    let mediaType = ''

    switch (data?.obj.reel_type) {
      case 1:
        mediaType = 'link'
        media = (
          <div
            style={{
              height: '600px',
              borderRadius: 14,
              width: '300px',
              background: '#292839',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '12px',
            }}
          >
            <a href={data?.obj.link} target="_blank">
              <br /> Know More
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
            url={data?.obj.link}
          />
        )
        break

      case 3:
        mediaType = 'photo'
        media = (
          <img
            style={{ maxHeight: '100%' }}
            src={!loading && data?.obj.link}
            alt={!loading && data?.obj.title}
          />
        )
        break
    }
    const descriptionLength = 70

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Memesmaza - {`${data?.obj.meta_title}`} Post</title>
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
          <meta property="og:url" content={data?.obj.meta_title} />

          {/* <!-- Twitter Card Tags --> */}
          <meta name="twitter:card" content={data?.obj.meta_desc} />
          <meta name="twitter:site" content="@yourTwitterHandle" />
          <meta name="twitter:title" content={data?.obj.meta_title} />
          <meta name="twitter:description" content={data?.obj.meta_desc} />
          <meta name="twitter:image" content={data?.obj.image_path} />
        </Helmet>
        <Navbar bgOpacity={1} />
        <Gallery
          type="reel"
          id={data?.obj.id}
          comments={data?.obj.comments}
          views_count={data?.obj.views_count || 0}
          likes_count={data?.obj.likes_count || 0}
          comments_count={data?.obj.comments_count || 0}
          downloads_count={data?.obj.download || 0}
          shares_count={data?.obj.shares_count || 0}
          slug={slug}
          media_url={data?.obj.link}
          mediaType={mediaType}
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
          media={media}
          title={
            !loading && (
              <>
                <b>{data?.obj.reel}</b>
                <br />
                <p
                  dangerouslySetInnerHTML={{
                    __html: seeMore
                      ? data?.obj.meta_desc +
                        ' <a href="" style="font-size: 14px" id="seeLess">See less</a>'
                      : data?.obj.meta_desc.slice(0, descriptionLength) +
                        `${
                          data?.obj.meta_desc.length > descriptionLength
                            ? `... <a style="font-size: 14px" href="" id="seeMore">See more</a>`
                            : ''
                        }`,
                  }}
                />
              </>
            )
          }
          timeAgo={!loading ? timeAgo(data?.obj.created_at) : ''}
          likes={!loading && data?.obj.like}
        />
      </>
    )
  }
  return null
}
