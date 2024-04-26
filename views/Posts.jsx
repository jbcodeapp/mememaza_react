import React, { lazy } from 'react';
import styles from '@/styles/Home.module.css';
import { PostSkeleton } from '../components/Post';
import { useRef, useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { SITE_URL } from '@/def';
import { AdvertisementSkeleton } from '@/components/Advertisements';

const Reel = lazy(() => import('../components/Reel'));
const Post = lazy(() => import('../components/Post'));
const Advertisement = lazy(() => import('../components/Advertisements'));

export default function PostsView({ banners, category_slug = 0, search = 0 }) {
  const postsRef = useRef();
  const postFetcherRef = useRef();

  const [shouldFetch, setShouldFetch] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [postsAndReels, setPostsAndReels] = useState([]);
  const [pageState, setPageState] = useState('idle');
  const [error, setError] = useState();

  const [fetchedAdvertisements, setFetchedAdvertisements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (shouldFetch) {
            setPage((p) => p + 1);
          }
        } else {
          observer.observe(entry.target);
        }
      });
    });

    if (postFetcherRef.current) {
      observer.observe(postFetcherRef.current);
    }

    return () => {
      if (postFetcherRef.current) {
        observer.unobserve(postFetcherRef.current);
      }
    };
  }, [postFetcherRef.current, shouldFetch]);

  const [numberOfColumns, setNumberOfColumns] = useState(5);

  const calculateNumberOfColumns = () => {
    if (postsRef?.current) {
      let templateColumns = window
        .getComputedStyle(postsRef.current)
        .getPropertyValue('grid-template-columns')
        .split(' ').length;

      setNumberOfColumns(templateColumns);
    }
  };

  useEffect(() => {
    calculateNumberOfColumns();
  }, [postsRef]);

  useEffect(() => {
    if (page && total && limit) {
      setHasMore(page * limit < total);
    }
  }, [page, total, limit]);

  const fetchPaginatedPosts = () => {
    setPageState('loading');
    const token = localStorage.getItem('token');
    setShouldFetch(false);
  
    let url = `${SITE_URL}/post/paginated?page=${page}`;
    
    if (category_slug !== 0) {
      url += `&category_slug=${category_slug}`;
    }
  
    if (search !== 0) {
      url += `&search=${search}`;
    }
  
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((resp) => {
        setShouldFetch(
          resp.data.total !== postsAndReels.length + resp.data.posts.length
        );
        // console.log(resp.data.posts.length)
        setPageState('succeeded');
        setPostsAndReels([...postsAndReels, ...resp.data.posts, ...fetchedAdvertisements]);
        // console.log("Check All Data =>  ",postsAndReels )
        setTotal(resp.data.total);
        setLimit(resp.data.limit);
      })
      .catch((err) => {
        setPageState('failed');
        setShouldFetch(true);
        setError(err.message);
      });
  };
  
  const fetchAdvertisements = () => {
    axios
      .get(`${SITE_URL}/advertisements`)
      .then((resp) => {
        // console.log("Check advertisements Data =>  ",resp.data )
        setFetchedAdvertisements(resp.data); 
      })
      .catch((err) => {
        console.error('Error fetching advertisements:', err);
      });
  };

  // useEffect(() => {
  //   if (page) {
  //     fetchPaginatedPosts();
  //     fetchAdvertisements();
  //   }
  // }, [page]);

  useEffect(() => {
    const fetchPostsAndAdvertisements = async () => {
      if (page) {
        fetchPaginatedPosts(); 
        await new Promise((resolve) => setTimeout(resolve, 10000)); 
        fetchAdvertisements(); 
      }
    };
  
    fetchPostsAndAdvertisements();
  
  }, [page]);
  

  // useEffect(() => {
  //   if (page === 1) {
  //     fetchAdvertisements();
  //   }
  // }, [page]);

  useEffect(() => {
    window.addEventListener('resize', calculateNumberOfColumns);
    return () => {
      window.removeEventListener('resize', calculateNumberOfColumns);
    };
  }, []);

  return (
    <div className={styles.postsContainer}>
      <div className={styles.leftBanners}>
        {banners
          ?.filter((item) => item.type === 'left')
          .map((item) => (
            <img
              key={item.id}
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
              key={item.id}
              style={{ maxWidth: 100 }}
              src={item.banner}
              alt="advertisement"
            />
          ))}
      </div>
      {banners
        ?.filter((item) => item.type === 'header')
        .map((item) => (
          <div key={item.id} style={{ margin: '30px 0 0px 0' }}>
            <img
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
                    );
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
                    );
                    case 'advertisements':
                      return (
                        <Suspense
                        key={i}
                        fallback={
                          <AdvertisementSkeleton
                            destroy={!hasMore}
                            delayIndex={index % 2}
                          />
                        }
                      >
                        <Advertisement key={i} advertisements={item} />
                      </Suspense>
                      );
                  default:
                    return null;
                }
              })}
              
            {/* {((index + 1) * limit) % 10 === 0 && renderAdvertisement()} */}

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

        {!hasMore && <div>end of posts</div>}
      </div>
    </div>
  );
}
