import React from "react";
import styles from "@/styles/components/banner.module.css";
import Story from "./Story";
import Category from "./Category";
import StoryReels from "./StoryReels";

const categories = [
  {
    image: "/assets/images/7bemn9H.png",
    name: "Amazing",
    slug: "amazing",
    post_count: 20,
  },
  {
    image: "/assets/images/9r1qCDq.png",
    name: "Funny",
    slug: "funny",
    post_count: 5,
  },
  {
    image: "/assets/images/tUX1dpv.png",
    name: "Unmuted",
    slug: "unmuted",
    post_count: 12,
  },
  {
    image: "/assets/images/nrFCOUB.png",
    name: "Gaming",
    slug: "gaming",
    post_count: 12,
  },
  {
    image: "/assets/images/avRBRpN.png",
    name: "Aww",
    slug: "aww",
    post_count: 12,
  },
  {
    image: "/assets/images/2wD3VJA.png",
    name: "Space",
    slug: "space",
    post_count: 12,
  },
];

export default function Banner({ stories }) {
  return (
    <div className={styles.banner}>
      <StoryReels stories={stories.filter((s) => s.story_type == 1)} />
      <h3 className={styles.title}>Explore Categories</h3>
      <div className={styles.categories}>
        {categories.map((category, i) => (
          <Category key={i} bigger={i === 0} category={category} />
        ))}
      </div>
    </div>
  );
}
