import { SITE_URL } from "../def";
import axios from "axios";
import styles from "@/styles/Home.module.css";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AppCover from "../components/AppCover";
import { useEffect, useState } from "react";
import Post, { PostSkeleton } from "../components/Post";
const getMin = (num1, num2) => {
  if (num1 > num2) return num2;
  return num1;
};
const Index = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!data && !loading) {
      fetchIndexData();
    }
  }, [data, loading]);

  const fetchIndexData = () => {
    setLoading(true);
    let url = SITE_URL + `/post`;

    axios.get(url).then((resp) => {
      setLoading(false);
      setData(resp.data);
    });
  };
  const [bannerTop, setBannerTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const newY = window.scrollY;
      setBannerTop(newY);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.home}>
      <AppCover>
        <Navbar bgOpacity={getMin(bannerTop / 540, 1)} />
        {data?.stories && (
          <Banner
            style={{ transform: `translateY(${-bannerTop}px)` }}
            categories={data.categories}
            stories={data.stories}
          />
        )}
      </AppCover>
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <div className={styles.postsCol}>
            {data?.post
              .filter((_, i) => i % 5 === 0)
              .map((post, i) => (
                <Post key={i} post={post} />
              ))}
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
        </div>
      </div>
    </div>
  );
};
export default Index;
