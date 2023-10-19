import React from "react";

import styles from "@/styles/components/story.module.css";

export default function Story({ story }) {
  return (
    <div
      className={`${styles.story} ${
        story.story_type === 2 ? styles.vidContainer : ""
      }`}
    >
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
        <video className={styles.thumbnailVid} controls="">
          <source src={story.image_path} type="video/mp4" />
          Sorry, your browser doesn t support the video element.
        </video>
      )}
    </div>
  );
}

export const NoStoryComponent = () => (
  <div className={`${styles.noStory}`}>
    <img
      className={styles.errorImage}
      src="\assets\images\Fatal Error.png"
      alt="error"
    />
    <div>
      <p className={styles.oops}>Oops!</p>
      <p className={styles.errorText}>No Story has been posted today.</p>
    </div>
  </div>
);
