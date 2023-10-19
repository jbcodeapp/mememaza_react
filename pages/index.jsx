import { SITE_URL } from "../def";
import axios from "axios";
import styles from "@/styles/Home.module.css";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AppCover from "../components/AppCover";
import { useEffect, useState } from "react";
import Post, { PostSkeleton } from "../components/Post";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import PostsView from "@/views/Posts";

const getMin = (num1, num2) => {
  if (num1 > num2) return num2;
  return num1;
};
const Index = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useAuthCheck();

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
        <Navbar bgOpacity={getMin(bannerTop / 300, 1)} />
        <Banner
          style={{ transform: `translateY(${-bannerTop * 0.5}px)` }}
          categories={data?.categories}
          stories={data?.stories}
        />
      </AppCover>
      <PostsView data={data?.post ? data : { post: [] }} />

      {/* {data && <Landing props={{ data }} />} */}
    </div>
  );
};
export default Index;
