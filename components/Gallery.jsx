import React from "react";

import styles from "@/styles/components/gallery.module.css";
import { ActionButton } from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import UserHistory from "./UserHistory";

export default function Gallery({
  media,
  title,
  loading,
  likes,
  isLiked,
  onLike,
  onDislike,
  timeAgo,
  type,
  mediaType = "photo",
}) {
  const [icon, setIcon] = useState("vr-dashboard");

  useEffect(() => {
    if (type) {
      if (type == "reel") {
        setIcon("vr-cardboard");
      } else if (type == "story") {
        setIcon("cloud-moon");
      } else {
        setIcon("newspaper");
      }
    }
  }, [type]);

  const actionButtonStyle = {
    color: "#b0b3b8ae",
    hoverColor: "#eeaeae",
    lg: true,
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mediaContainer}>
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          media
        )}
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.infoContainer}>
          <p className={styles.info}>
            <i className={`fa fa-${icon}`} /> This {mediaType} is from a {type}.
          </p>
        </div>
        {loading ? (
          <div className={styles.titleContainer}>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.titleContainer}>
              <UserHistory
                avatar="https://picsum.photos/id/7/100/100.webp"
                name="Admin"
                timeAgo={timeAgo}
              />
              {title}
            </div>
            <div className={styles.toolbarContainer}>
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {
                  if (isLiked) {
                    onDislike();
                  } else {
                    onLike();
                  }
                }}
                icon="thumbs-up"
                active={isLiked}
                text="Like"
              />
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {}}
                icon="comment"
                text="Comment"
              />
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {}}
                icon="share"
                text="Share"
              />
            </div>
            <div className={styles.commentContainer}>
              <div className={styles.commentBoxContainer}>
                <textarea className={styles.commentBox} />
                <ActionButton
                  style={{ height: "fit-content" }}
                  onClick={() => {}}
                  icon="paper-plane"
                  text="Send"
                  lg
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
