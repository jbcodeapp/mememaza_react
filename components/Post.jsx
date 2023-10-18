import React from "react";
import styles from "@/styles/components/post.module.css";
import { useRouter } from "next/router";

export const ActionButton = ({
  icon,
  text = "",
  active,
  onClick,
  lg = false,
  color = "white",
  hoverColor = "#00000020",
  iconStyle = {},
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.actionBtn} ${lg ? styles.actionBtnLg : null} ${
        active ? styles.actionBtnActive : null
      }`}
      style={{ ...style, color }}
    >
      <i style={{ ...iconStyle }} className={`fas fa-${icon}`}></i> <>{text}</>
    </button>
  );
};

export default function Post({ post }) {
  const router = useRouter();
  const {
    title,
    image_path,
    likes_count,
    shares_count,
    comments_count,
    views_count,
    category,
    slug,
  } = post;
  return (
    <div
      className={styles.post}
      role="article"
      onClick={() => router.push(`/post/${slug}`)}
    >
      <div className={styles.postOverlay} />
      <img className={styles.postImage} src={image_path} alt={title} />
      <div className={styles.postDetails}>
        <p className={styles.postTitle}>
          {title} • {category}
        </p>
        <div className={styles.postToolbar}>
          <ActionButton
            onClick={() => {}}
            icon="thumbs-up"
            text={likes_count}
          />
          <ActionButton onClick={() => {}} icon="eye" text={views_count} />
          <ActionButton
            onClick={() => {}}
            icon="comment"
            text={comments_count}
          />
          <ActionButton onClick={() => {}} icon="share" text={shares_count} />
        </div>
      </div>
    </div>
  );
}

export const PostSkeleton = () => {
  return (
    <div className={styles.post}>
      <div className={styles.postImageSkeleton} />
      <div className={styles.postDetails}>
        <p className={styles.postTitleSkeleton}></p>
        <div className={styles.postToolbar}>
          <div className={styles.countSkeleton}></div>
          <div className={styles.countSkeleton}></div>
          <div className={styles.countSkeleton}></div>
          <div className={styles.countSkeleton}></div>
        </div>
      </div>
    </div>
  );
};
