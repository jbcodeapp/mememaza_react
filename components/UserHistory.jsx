import React from "react";
import styles from "@/styles/components/user-history.module.css";

export default function UserHistory({ name, avatar, timeAgo }) {
  return (
    <div className={styles.userHistory}>
      <div className={styles.imageContainer}>
        <img src={avatar} alt="user avatar" />
      </div>
      <div className={styles.profileContainer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.timeAgo}>{timeAgo}</p>
      </div>
    </div>
  );
}
