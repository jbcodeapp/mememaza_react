import { HOME_URL, SITE_URL, localData } from "../def";
import axios from "axios";
import styles from "@/styles/Home.module.css";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AppCover from "../components/AppCover";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Index = () => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!data) {
      fetchIndexData();
    }
  }, []);

  const fetchIndexData = () => {
    let url = SITE_URL + `/post`;

    axios.get(url).then((resp) => setData(resp.data));
  };

  return (
    <div className={styles.home}>
      <AppCover>
        <Navbar />
        {data?.categories && <Banner stories={data.categories} />}
      </AppCover>
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <div className={styles.postsCol}>
            {data?.post.reverse().map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <div className={styles.postsCol}>
            {data?.post.reverse().map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <div className={styles.postsCol}>
            {data?.post.reverse().map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <div className={styles.postsCol}>
            {data?.post.reverse().map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <div className={styles.postsCol}>
            {data?.post.reverse().map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
