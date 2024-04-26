'use client'
import Gallery from '../../components/Gallery'
import { API_PATH, SITE_URL } from '@/def'
import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { timeAgo } from '@/utils/timeAgo'
import ReactPlayer from 'react-player'

import Head from 'next/head'
import { postLike } from '@/src/services/post/slice'
import { useAppDispatch } from '@/src/store'

export async function getServerSideProps(context) {
  const { slug } = context.params

  const res = await axios(SITE_URL + `/getpostbyslug/${slug}/reel`, {
    method: 'GET',
  })
  return {
    props: {
      data: res.data,
    },
  }
}

export default function ReelsPage({ data, likes_count }) {
  const router = useRouter()
  const { slug } = router.query
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState()
  const [seeMore, setSeeMore] = useState(false)
  // const [play, setPlay] = useState(true)
  const [datas, setData] = useState({});
  const [likeCount, setLikeCount] = useState(likes_count)

  const dispatch = useAppDispatch()

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
  
  useEffect(() => {
    // console.log("Likes count updated:", data?.obj.likes_count);
  }, [data?.obj.likes_count]);
  
  const getComment = async () => {}
  const handleOnComment = async () => {}
  const handleCommentDelete = async () => {}
  const handleLike = async () => {
      setIsLiked(true);
      try {
        const token = localStorage.getItem('token');
        localStorage.setItem('current_post_id', data.obj.id);
        const response = await axios.post(
          SITE_URL + '/updatelike',
          {
            type: data.obj.type,
            id: data.obj.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.statuscode === true) {
          setData(prevState => ({
            ...prevState,
            obj: {
              ...prevState.obj,
              likes_count: prevState.obj.likes_count ? prevState.obj.likes_count - 1 : prevState.obj.likes_count + 1
            }
          }));
          setIsLiked(false);
          // console.log("liked",data?.obj.likes_count)
        }
      } catch (error) {
        setIsLiked(true);
      }
    };
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

  const toggleSeeMore = () => {
    setSeeMore(!seeMore)
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength)
    }
    return text
  }

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

  
  const desc = () =>
  {
    <p
    dangerouslySetInnerHTML={{
        __html: data.obj.desc,
      }}
      />
  }
  const length = 70

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
          content={data?.obj.vdo_image || data?.obj.link}
        />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:title" content={data?.obj.meta_title} />
        <meta property="og:description" content={data?.obj.meta_title} />
        <meta property="og:type" content="article" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content={data?.obj.meta_desc} />
        <meta name="twitter:site" content="@yourTwitterHandle" />
        <meta name="twitter:title" content={data?.obj.meta_title} />
        <meta name="twitter:description" content={data?.obj.meta_desc} />
        <meta
          name="twitter:image"
          content={data?.obj.vdo_image || data?.obj.link}
        />
      </Head>
      {mounted && (
        <>
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
            onClick={(e) => {
              e.preventDefault()
              setLike((like) => !like)
              setLikeCount((lc) => (like ? lc - 1 : lc + 1))
              dispatch(postLike({ id, type }))
              // console.log("Liked... updated on individual page");
            }}
            title={
              !loading && (
                <>
                  <b>{data?.obj.reel}</b>
                  <br />
                  {/* <p
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
                  /> */}
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: seeMore
                        ? data?.obj.desc +
                          ' <a href="" style="font-size: 14px" id="seeLess">See less</a>'
                        : data?.obj.desc.slice(0, descriptionLength) +
                          `${
                            data?.obj.desc.length > descriptionLength
                              ? `... <a style="font-size: 14px" href="" id="seeMore">See more</a>`
                              : ''
                          }`,
                    }}
                  /> */}
                   {/* <p>
                        {data.obj.desc.length > 70 ? (
                          <>
                            {seeMore ? data.obj.desc : truncateDescription(data.obj.desc, 70)}
                            <span onClick={toggleSeeMore} style={{ cursor: 'pointer', color: '#00FFFF'  }}>
                              {seeMore ? ' See Less' : ' ...See More'}
                            </span>
                          </>
                        ) : (
                          data.obj.desc
                        )}
                      </p> */}
                        <p>
                          {desc.length > 70 ? (
                            <>
                              {seeMore ? desc : truncateDescription(desc, 70)}
                              <span onClick={toggleSeeMore} style={{ cursor: 'pointer', color: '#00FFFF' }}>
                                {seeMore ? ' See Less' : ' ...See More'}
                              </span>
                            </>
                          ) : (
                            <p
                        dangerouslySetInnerHTML={{
                          __html: data.obj.desc,
                        }}
                      />
                        )}
                      </p>
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
