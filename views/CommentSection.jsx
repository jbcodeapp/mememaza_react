import React from 'react'
import styles from '@/styles/views/comment-section.module.css'
import CommentBox from '../components/CommentBox'
import Comment from '../components/Comment'

export default function CommentSection({ comments, type, id }) {
  const token = localStorage.getItem('token')
  return (
    <div
      className={styles.commentSection}
      style={{ marginBottom: token ? 132 : 222 }}
    >
      {comments?.map((item) => (
        <Comment comment={item} />
      ))}
      <CommentBox type={type} id={id} />
    </div>
  )
}
