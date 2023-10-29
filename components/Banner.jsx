import React from "react";
import styles from "@/styles/components/banner.module.css";
import Category from "./Category";
import StoryReels from "./StoryReels";

export default function Banner({ categories, stories, style }) {
  return (
    <div className={styles.banner} style={style}>
      <StoryReels stories={stories} />
      <h3 className={styles.title}>Explore Categories</h3>
      <div className={styles.categories}>
        {categories?.map((category, i) => (
          <Category key={i} bigger={i === 0} category={category} />
        ))}
      </div>
    </div>
  );
}
