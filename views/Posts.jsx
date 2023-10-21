import React from "react";
import styles from "@/styles/Home.module.css";
import Post, { PostSkeleton } from "../components/Post";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { SITE_URL } from "@/def";

export default function PostsView({ data }) {
  const postsRef = useRef();
  const postFetcherRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The <div> is now visible on the screen
          // Fetch next page of posts here
          // alert("The div is visible");
          console.info("The div is visible");
          setPage((p) => p + 1);

          // Stop observing once the element is visible (if needed)
          // observer.unobserve(entry.target);
        } else {
          observer.observe(entry.target);
        }
      });
    });

    if (postFetcherRef.current) {
      observer.observe(postFetcherRef.current);
    }

    // Cleanup: Stop observing when the component unmounts
    return () => {
      if (postFetcherRef.current) {
        observer.unobserve(postFetcherRef.current);
      }
    };
  }, [postFetcherRef.current]);

  const [numberOfColumns, setNumberOfColumns] = useState(5);

  const caclulateNumberOfColumns = () => {
    if (postsRef?.current) {
      let templateColumns = window
        .getComputedStyle(postsRef.current)
        .getPropertyValue("grid-template-columns")
        .split(" ").length;

      setNumberOfColumns(templateColumns);
    }
  };

  useEffect(() => {
    caclulateNumberOfColumns();
  }, [postsRef]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [posts, setPosts] = useState([]);
  const [pageState, setPageState] = useState("idle");

  useEffect(() => {
    if (page && total && limit) {
      setHasMore(page * limit < total);
    }
  }, [page, total, limit]);
  const fetchPaginatedPosts = () => {
    setPageState("loading");
    axios
      .get(SITE_URL + `/post/paginated?page=${page}`)
      .then((resp) => {
        setPageState("succeded");
        setPosts([...posts, ...resp.data.posts]);
        setTotal(resp.data.total);
        setLimit(resp.data.limit);
      })
      .catch((err) => {
        setPageState("failed");
        setError(err.message);
      });
  };

  useEffect(() => {
    if (page) {
      fetchPaginatedPosts();
    }
  }, [page]);

  useEffect(() => {
    // Add the resize event listener
    window.addEventListener("resize", caclulateNumberOfColumns);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", caclulateNumberOfColumns);
    };
  }, []);

  return (
    <div className={styles.postsContainer}>
      <div ref={postsRef} className={styles.posts}>
        {Array.from({ length: numberOfColumns }, (_, index) => index).map(
          (index) => (
            <div className={styles.postsCol}>
              {posts
                .filter((_, i) => i % numberOfColumns === index)
                .map((post, i) => (
                  <Post key={i} post={post} />
                ))}

              {index !== 0 && index !== 1 && index !== 3 ? (
                <PostSkeleton destroy={!hasMore} delayIndex={index} />
              ) : null}
              <PostSkeleton destroy={!hasMore} delayIndex={index} />
              <PostSkeleton
                destroy={!hasMore}
                delayIndex={index}
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
  );
}
