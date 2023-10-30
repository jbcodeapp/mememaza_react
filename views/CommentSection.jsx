import React, { useRef } from 'react'
import styles from '@/styles/views/comment-section.module.css'
import CommentBox from '../components/CommentBox'
import Comment from '../components/Comment'
import { useState } from 'react'
import { useEffect } from 'react'

export default function CommentSection({ comments, type, id }) {
  const token = localStorage.getItem('token')

  const [currComments, setCurrentComments] = useState(comments || [])

  useEffect(() => {
    if (comments) {
      setCurrentComments(comments.reverse())
    }
  }, [comments])
  const [newComment, setNewComment] = useState()
  const [newCommentSuccess, setNewCommentSuccess] = useState(false)

  const onNewCommentSuccess = (resp) => {
    if (resp.comment) {
      setCurrentComments([resp.comment, ...currComments])
      setNewCommentSuccess(true)
    } else {
      setNewCommentSuccess(false)
      setCurrentComments((cc) =>
        cc.filter(function (item) {
          return item.id === 0
        })
      )
    }
  }

  useEffect(() => {
    if (newCommentSuccess) {
      setNewComment(null)
    }
  }, [newCommentSuccess])

  const newCommentRef = useRef(null)

  useEffect(() => {
    if (newCommentRef?.current && newComment) {
      newCommentRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [newCommentRef, newComment])

  console.log(newCommentRef)

  return (
    <div className={styles.commentSectionContainer}>
      <div
        className={styles.commentSection}
        style={{
          marginBottom: token ? (window.innerWidth < 1000 ? 22 : 142) : 222,
        }}
      >
        <div ref={newCommentRef}></div>
        {newComment ? <Comment comment={newComment} isNew={true} /> : null}
        {currComments?.map((item) => (
          <Comment comment={item} />
        ))}
      </div>
      <CommentBox
        type={type}
        id={id}
        newCommentSuccess={newCommentSuccess}
        onNewCommentSuccess={onNewCommentSuccess}
        onNewComment={setNewComment}
      />
    </div>
  )
}
