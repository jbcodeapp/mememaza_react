import React from "react";
import styles from "@/styles/components/post.module.css";

const ActionButton = ({ icon, text, onClick }) => {
  return (
    <div className={styles.actionBtnContainer}>
      <button onClick={onClick} className={styles.actionBtn}>
        <i class={`fas fa-${icon}`}></i> <>{text}</>
      </button>
    </div>
  );
};

export default function Post({ post }) {
  const { title, image_path, like, share, comment, view } = post;
  return (
    <div className={styles.post}>
      <div className={styles.postOverlay} />
      <img className={styles.postImage} src={image_path} />
      <div className={styles.postDetails}>
        <p className={styles.postTitle}>{title}</p>
        <div className={styles.postToolbar}>
          <ActionButton onClick={() => {}} icon="thumbs-up" text={like} />
          <ActionButton onClick={() => {}} icon="eye" text={view} />
          <ActionButton onClick={() => {}} icon="comment" text={comment} />
          <ActionButton onClick={() => {}} icon="share" text={share} />
        </div>
      </div>
    </div>
  );
}

// create an vs code extension to make a panel on top right of VSCode to open imported files from reference
