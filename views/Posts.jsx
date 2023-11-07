import React, { lazy } from 'react'
import styles from '@/styles/Home.module.css'
import { PostSkeleton } from '../components/Post'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { SITE_URL } from '@/def'
import { Suspense } from 'react'

const Reel = lazy(() => import('../components/Reel'))
const Post = lazy(() => import('../components/Post'))

export default function PostsView({ banners, category_slug = 0 }) {
  const postsRef = useRef()
  const postFetcherRef = useRef()

  const [shouldFetch, setShouldFetch] = useState(false)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(100)
  const [limit, setLimit] = useState(10)
  const [hasMore, setHasMore] = useState(true)

  const [postsAndReels, setPostsAndReels] = useState([])
  const [pageState, setPageState] = useState('idle')
  const [error, setError] = useState()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The <div> is now visible on the screen
          // Fetch next page of posts here
          if (shouldFetch) {
            setPage((p) => p + 1)
          }

          // Stop observing once the element is visible (if needed)
          // observer.unobserve(entry.target);
        } else {
          observer.observe(entry.target)
        }
      })
    })

    if (postFetcherRef.current) {
      observer.observe(postFetcherRef.current)
    }

    // Cleanup: Stop observing when the component unmounts
    return () => {
      if (postFetcherRef.current) {
        observer.unobserve(postFetcherRef.current)
      }
    }
  }, [postFetcherRef.current, shouldFetch])

  const [numberOfColumns, setNumberOfColumns] = useState(5)

  const caclulateNumberOfColumns = () => {
    if (postsRef?.current) {
      let templateColumns = window
        .getComputedStyle(postsRef.current)
        .getPropertyValue('grid-template-columns')
        .split(' ').length

      setNumberOfColumns(templateColumns)
    }
  }

  useEffect(() => {
    caclulateNumberOfColumns()
  }, [postsRef])

  useEffect(() => {
    if (page && total && limit) {
      setHasMore(page * limit < total)
    }
  }, [page, total, limit])

  const fetchPaginatedPosts = () => {
    setPageState('loading')
    const token = localStorage.getItem('token')
    setShouldFetch(false)

    let url =
      category_slug !== 0
        ? SITE_URL +
          `/post/paginated?page=${page}&category_slug=${category_slug}`
        : SITE_URL + `/post/paginated?page=${page}`

    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((resp) => {
        setShouldFetch(
          resp.data.total !== postsAndReels.length + resp.data.posts.length
        )
        setPageState('succeded')
        setPostsAndReels([...postsAndReels, ...resp.data.posts])
        setTotal(resp.data.total)
        setLimit(resp.data.limit)
      })
      .catch((err) => {
        setPageState('failed')
        setShouldFetch(true)
        setError(err.message)
      })
  }

  useEffect(() => {
    if (page) {
      fetchPaginatedPosts()
    }
  }, [page])

  useEffect(() => {
    // Add the resize event listener
    window.addEventListener('resize', caclulateNumberOfColumns)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', caclulateNumberOfColumns)
    }
  }, [])

  return (
    <div className={styles.postsContainer}>
      <div className={styles.leftBanners}>
        {banners
          ?.filter((item) => item.type === 'left')
          .map((item) => (
            <img
              id={item.id}
              style={{ maxWidth: 100 }}
              src={item.banner}
              alt="advertisement"
            />
          ))}
      </div>
      <div className={styles.rightBanners}>
        {banners
          ?.filter((item) => item.type === 'right')
          .map((item) => (
            <img
              id={item.id}
              style={{ maxWidth: 100 }}
              src={item.banner}
              alt="advertisement"
            />
          ))}
      </div>
      {banners
        ?.filter((item) => item.type === 'header')
        .map((item) => (
          <div style={{ margin: '30px 0 0px 0' }}>
            <img
              id={item.id}
              style={{ maxWidth: 800 }}
              src={item.banner}
              alt="advertisement"
            />
          </div>
        ))}
      <div ref={postsRef} className={styles.posts}>
        {Array.from({ length: numberOfColumns }, (_, index) => index).map(
          (index) => (
            <div key={index} className={styles.postsCol}>
              {postsAndReels
                .filter((_, i) => i % numberOfColumns === index)
                .map((item, i) => {
                  switch (item.type) {
                    case 'reel':
                      return (
                        <Suspense
                          key={i}
                          fallback={
                            <PostSkeleton
                              destroy={!hasMore}
                              delayIndex={index % 2}
                            />
                          }
                        >
                          <Reel reel={item} />
                        </Suspense>
                      )
                    case 'post':
                      return (
                        <Suspense
                          key={i}
                          fallback={
                            <PostSkeleton
                              destroy={!hasMore}
                              delayIndex={index % 2}
                            />
                          }
                        >
                          <Post key={i} post={item} />
                        </Suspense>
                      )
                  }
                })}

              {index !== 0 && index !== 1 && index !== 3 ? (
                <PostSkeleton destroy={!hasMore} delayIndex={index % 2} />
              ) : null}
              <PostSkeleton destroy={!hasMore} delayIndex={index + (1 % 2)} />
              <PostSkeleton
                destroy={!hasMore}
                delayIndex={index % 2}
                postFetcherRef={
                  index === numberOfColumns - 1 ? postFetcherRef : null
                }
              />
            </div>
          )
        )}
        {!hasMore ? <div>end of posts</div> : null}
      </div>
    </div>
  )
}
