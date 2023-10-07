import React from "react";
import styles from "@/styles/components/story-reels.module.css";
import { useState } from "react";
import Story from "./Story";

export default function StoryReels({ stories }) {
  const [activeTab, setActiveTab] = useState("stories");
  return (
    <div className={styles.storyReels}>
      <div className={styles.header}>
        <div
          className={`${styles.headerItem} ${
            activeTab === "stories" ? styles.active : ""
          }`}
          role="button"
          onClick={() => setActiveTab("stories")}
        >
          <div className={styles.headerItemInner}>Stories</div>
        </div>
        <div
          className={`${styles.headerItem} ${
            activeTab === "reels" ? styles.active : ""
          }`}
          role="button"
          onClick={() => setActiveTab("reels")}
        >
          <div className={styles.headerItemInner}>Reels</div>
        </div>
      </div>
      <div className={styles.body}>
        {activeTab === "stories" ? (
          <>
            {stories.map((item, i) => (
              <Story key={i} story={item} />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
