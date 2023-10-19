import React from "react";
import styles from "@/styles/Home.module.css";
import Post, { PostSkeleton } from "../components/Post";
import { useRef } from "react";
import { useEffect } from "react";

export default function PostsView({ data }) {
  const postFetcherRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The <div> is now visible on the screen
          // You can run your code here
          console.log("The div is visible");

          // Stop observing once the element is visible (if needed)
          observer.unobserve(entry.target);
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
  }, []);
  return (
    <div className={styles.postsContainer}>
      <div className={styles.posts}>
        <div className={styles.postsCol}>
          {data?.post
            .filter((_, i) => i % 5 === 0)
            .map((post, i) => (
              <Post key={i} post={post} />
            ))}
          <div ref={postFetcherRef} style={{ display: "none" }}></div>
          <PostSkeleton />
        </div>
        <div className={styles.postsCol}>
          {data?.post
            .filter((_, i) => i % 5 === 1)
            .map((post, i) => (
              <Post key={i} post={post} />
            ))}
          <PostSkeleton />
        </div>
        <div className={styles.postsCol}>
          {data?.post
            .filter((_, i) => i % 5 === 2)
            .map((post, i) => (
              <Post key={i} post={post} />
            ))}
          <PostSkeleton />
        </div>
        <div className={styles.postsCol}>
          {data?.post
            .filter((_, i) => i % 5 === 3)
            .map((post, i) => (
              <Post key={i} post={post} />
            ))}
          <PostSkeleton />
        </div>
        <div className={styles.postsCol}>
          {data?.post
            .filter((_, i) => i % 5 === 3)
            .map((post, i) => (
              <Post key={i} post={post} />
            ))}
          <PostSkeleton />
        </div>
      </div>
    </div>
  );
}
