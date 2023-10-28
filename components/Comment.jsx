import React from 'react'
import styles from '@/styles/components/comment.module.css';
import {timeAgo} from '@/utils/timeAgo';
import { Gif } from '@giphy/react-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

export default function Comment({comment}) {
    const {id, comment_type, commenter, comment: commentText, created_at} = comment;

  return (
    <div className={styles.commentContainer}>
        <img className={styles.avatar} src={`https://picsum.photos/${100+commenter.id}`} alt="commenter avatar" />

        <div className={styles.comment}>
            <p className={styles.title}>{commenter.name}</p>
            {
                comment_type === 3 ? <img src={`https://i.giphy.com/media/${commentText}/giphy.webp`} alt="comment gif" /> : <p className={styles.commentText} dangerouslySetInnerHTML={{__html: commentText}}></p>
            }
        </div>
    </div>
  )
}
