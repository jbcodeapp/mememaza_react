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
        ? `... <a href="" style="font-size: 14px, text-overflow: ellipsis;" id="seeMore">See more</a>`
        : ''
    }`

  let seeLessText =
    data?.obj.desc +
    ' <a href="" style="font-size: 14px,text-overflow: ellipsis;" id="seeLess">See less</a>'


    useEffect(() => {
      if (data?.obj) {
        const seeMoreButton = document.getElementById('seeMore')
        if (seeMoreButton) {
          seeMoreButton.addEventListener('click', () => {
            setSeeMore(!seeMore)
          })
        }
      }
    }, [data])
  
    // const descriptionLength = 150
    // const seeless = data?.obj.desc.slice(0, descriptionLength)
    // const seemore = data?.obj.desc.length > descriptionLength


  if (slug) {
    const getComment = async () => {}
    const handleOnComment = async () => {}
    const handleCommentDelete = async () => {}
    const handleLike = async () => {
      setIsLiked(false);
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
          setIsLiked(true);
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

    // const showml = (divId, inhtmText) => {
    //   const x = document.getElementById(divId).style.display
    //   if (x === "block") {
    //     document.getElementById(divId).style.display = "none"
    //     document.getElementById(inhtmText).innerHTML = "Show More..."
    //   } else if (x === "none") {
    //     document.getElementById(divId).style.display = "block"
    //     document.getElementById(inhtmText).innerHTML = "Show Less"
    //   }
    // }

    const toggleSeeMore = () => {
      setSeeMore(!seeMore)
    }
  
    const truncateDescription = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) 
      }
      return text
    }

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
                      // <p
                      //   dangerouslySetInnerHTML={{
                      //     __html: seeMore ? seeLessText : seeMoreText,
                      //   }}
                      // />

                      <>
                      <p>
                        {data.obj.desc.length > 70 ? (
                          <>
                            {seeMore ? data.obj.desc : truncateDescription(data.obj.desc, 70)}
                            <span onClick={toggleSeeMore} style={{ cursor: 'pointer', color: '#00FFFF' }}>
                              {seeMore ? ' See Less' : ' ...See More'}
                            </span>
                          </>
                        ) : (
                          data.obj.desc
                        )}
                      </p>
                    </>
                    //   <>
                    //     <p id="content1" style={{ display: seeMore ? 'block' : 'none' }}>
                    //       {data.obj.desc}
                    //     </p>
                    //     <p id="show_more1" onClick={() => showml('content1', 'show_more1')} style={{ cursor: 'pointer' }}>
                    //       {seeMore ? 'Show Less' : '...Show More'}
                    //   </p>
                    // </>
                      // <p id="show_more1" onclick="showml('content1','show_more1')" onmouseover="this.style.cursor='pointer'">...Show More</p>
                      // <p {seeMore ? seeLessText : seeMoreText}></p>
                    //   <>
                    //   <p>
                    //     {seeMore ? data.obj.desc : seeless}
                    //     {seemore && (
                    //       <span
                    //         id="seeMore"
                    //         style={{ cursor: 'pointer' }}
                    //       >
                    //         {seeMore ? ' See less' : ' ...See more'}
                    //       </span>
                    //     )}
                    //   </p>
                    // </>
                      // <p   onClick={() => setSeeMore(!seeMore)}>{seeMore ? seeLessText : seeMoreText}</p>

                      
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
