import React from "react";
import styles from "@/styles/Home.module.css";
import Post, { PostSkeleton } from "../components/Post";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function PostsView({ data }) {
  const postsRef = useRef();
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
              {data?.post
                .filter((_, i) => i % numberOfColumns === index)
                .map((post, i) => (
                  <Post key={i} post={post} />
                ))}
              <div ref={postFetcherRef} style={{ display: "none" }}></div>
              <PostSkeleton />
            </div>
          )
        )}
      </div>
    </div>
  );
}
