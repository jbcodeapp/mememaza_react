import React from 'react'
import styles from '@/styles/components/comment.module.css'
import { timeAgo } from '@/utils/timeAgo'
import { useEffect } from 'react'
import { useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'

const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

export default function Comment({ ref, comment, isNew = false }) {
  const {
    id,
    comment_type,
    commenter,
    comment: commentText,
    created_at,
    likes_count,
  } = comment
  const [timeBack, setTimeBack] = useState()

  useEffect(() => {
    if (created_at) {
      setTimeBack(timeAgo(created_at))
    }
  }, [created_at])

  return (
    <div ref={ref} className={styles.commentContainer}>
      <img
        className={styles.avatar}
        src={`https://picsum.photos/${100 + commenter.id}`}
        alt="commenter avatar"
      />

      <div
        className={styles.comment}
        style={
          isNew
            ? {
                animation: `ripple-light 1s var(--animation-function) infinite`,
              }
            : {}
        }
      >
        <p className={styles.title}>{commenter.name}</p>
        {comment_type === 3 ? (
          <img
            src={`https://i.giphy.com/media/${commentText}/giphy.webp`}
            alt="comment gif"
            width={200}
          />
        ) : (
          <p
            className={styles.commentText}
            dangerouslySetInnerHTML={{ __html: commentText }}
          ></p>
        )}

        <div className={styles.commentTolbar}>
          <div style={{ display: 'flex', gap: 8 }}>
            <a className={styles.subText}>Like </a>
            <a className={styles.subText}>Edit</a>
            <p className={styles.subText}>{timeBack}</p>
            <p
              className={styles.subText}
              style={{ color: 'hsl(245 52% 72% / 1)' }}
            >
              <i className="fas fa-thumbs-up" /> {likes_count || 0}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a className={styles.subText}>Delete</a>
          </div>
        </div>
      </div>
    </div>
  )
}
