import React, { useState } from 'react';
import styles from '@/styles/components/post.module.css';
import abstyles from '@/styles/components/action-button.module.css';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/src/store';
import { postLike, postSelect } from '@/src/services/post/slice';
import { useEffect } from 'react';

import toastr from 'toastr';
import { API_PATH, HOME_URL } from '@/def';
import ShareButton from './ShareButton';
import ActionButton from './ActionButton';


export default function Advertisement({ advertisements }) {
    const router = useRouter();
    const {
    id,
    meta_title,
    advertisement,
    link,
  } = advertisements;

  const dispatch = useAppDispatch();
  return (
    <div className={styles.post} role="article">
      {/* <div className={styles.advertisement}>
        <img src={newImagePath} alt="Advertisement" />
      </div> */}

      <div
        className={styles.postOverlay}
        onClick={() => router.push(link)}
      />
      <img className={styles.postImage} src={advertisement} alt={meta_title} />
      {/* <div className={styles.postDetails}>
        <p className={styles.postTitle}>
          {title} • {category.name}
        </p>
        <div className={styles.postToolbarContainer}>
          <div className={styles.postToolbar}>
            <ActionButton
              active={like}
              lg
              onClick={(e) => {
                e.preventDefault();
                setLike((like) => !like);
                setLikeCount((lc) => (like ? lc - 1 : lc + 1));
                dispatch(postLike({ id, type }));
              }}
              icon="thumbs-up"
              text={likeCount}
            />
            <ActionButton
              lg
              onClick={() => router.push(`/post/${slug}`)}
              icon="comment"
              text={comments_count}
            />
            <ActionButton
              lg
              onClick={() => router.push(`/post/${slug}`)}
              icon="eye"
              text={views_count}
            />

            <a
              style={{ color: 'white' }}
              onClick={() => setDownload((val) => val + 1)}
              href={`${API_PATH}/download?file=${image}&type=Post&id=${id}`}
              className={`${abstyles.actionBtn} ${abstyles.actionBtnLg} `}
            >
              <i className={`fas fa-download`}></i> <>{download}</>
            </a>

            <ShareButton count={shares_count} url={`${HOME_URL}post/${slug}`} />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export const AdvertisementSkeleton = ({ destroy, delayIndex, postFetcherRef }) => {
    const delayConstant = 0.1
    return (
      <div
        className={`${styles.post} ${styles.postSkeleton} ${
          destroy ? styles.postSkeletonDissolve : ''
        }`}
      >
        <div
          dataid={delayIndex}
          ref={postFetcherRef}
          style={{
            height: 0,
            width: 0,
            opacity: 0,
            margin: 0,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
          }}
        ></div>
        <div
          className={styles.postImageSkeleton}
          style={{ animationDelay: delayIndex * delayConstant + 's' }}
        />
    
      </div>
    )
  }