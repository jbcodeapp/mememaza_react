import React from "react";

import styles from "@/styles/components/story.module.css";

export default function Story({ story }) {
  return (
    <div className={styles.story}>
      {story.story_type === 1 ? (
        <div
          className={styles.thumbnail}
          style={{
            backgroundImage: `url(${story.image_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ) : (
        <video className={styles.thumbnail} controls="">
          <source src={story.image_path} type="video/mp4" />
          Sorry, your browser doesn t support the video element.
        </video>
      )}
      {story.id}
    </div>
  );
}
