import React from 'react'
import styles from '@/styles/components/post.module.css'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/src/store'
import { postLike, postSelect } from '@/src/services/post/slice'
import { useEffect } from 'react'

import toastr from 'toastr'
import { API_PATH, HOME_URL } from '@/def'
import { useState } from 'react'
import ShareButton from './ShareButton'
import Spinner from './Spinner'

export const ActionButton = ({
  icon,
  text = '',
  ref,
  active,
  onClick,
  lg = false,
  color = 'white',
  hoverColor = '#00000020',
  iconStyle = {},
  style = {},
  loading = false,
}) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${styles.actionBtn} ${lg ? styles.actionBtnLg : null} ${
        active ? styles.actionBtnActive : null
      }`}
      style={{ ...style, color }}
      disabled={loading}
    >
      <i style={{ ...iconStyle }} className={`fas fa-${icon}`}></i> <>{text}</>
      {loading ? <Spinner /> : null}
    </button>
  )
}

export default function Post({ post }) {
  const router = useRouter()
  const {
    id,
    title,
    image,
    user_has_liked,
    image_path,
    likes_count,
    shares_count,
    comments_count,
    views_count,
    type,
    category,
    slug,
    download: dl,
  } = post

  const [download, setDownload] = useState(dl)

  const newImagePath = image_path.replace('https://admin.', 'https://')

  const dispatch = useAppDispatch()

  const { message, error, status } = postSelect(id)

  useEffect(() => {
    if (message?.length) {
      toastr.success(message, 'MemeMaza')
    }
  }, [message])

  useEffect(() => {
    if (typeof error === 'array') {
      error.forEach((item) => toastr.error(item, 'MemeMaza'))
    } else if (error?.length) {
      toastr.error(error, 'MemeMaza')
    }

    if (status == 401) {
      toastr.info('Please sign in to continue', 'MemeMaza')
    }
  }, [error])
  const [like, setLike] = useState(user_has_liked)
  const [likeCount, setLikeCount] = useState(likes_count)

  return (
    <div className={styles.post} role="article">
      <div
        className={styles.postOverlay}
        onClick={() => router.push(`/post/${slug}`)}
      />
      <img className={styles.postImage} src={newImagePath} alt={title} />
      <div className={styles.postDetails}>
        <p className={styles.postTitle}>
          {title} • {category.name}
        </p>
        <div className={styles.postToolbarContainer}>
          <div className={styles.postToolbar}>
            <ActionButton
              active={like}
              lg
              onClick={(e) => {
                e.preventDefault()
                setLike((like) => !like)
                setLikeCount((lc) => (like ? lc - 1 : lc + 1))
                dispatch(postLike({ id, type }))
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
              className={`${styles.actionBtn} ${styles.actionBtnLg} `}
            >
              <i className={`fas fa-download`}></i> <>{download}</>
            </a>

            <ShareButton count={shares_count} url={`${HOME_URL}post/${slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PostSkeleton = ({ destroy, delayIndex, postFetcherRef }) => {
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
      <div className={styles.postDetails}>
        <p
          className={styles.postTitleSkeleton}
          style={{ animationDelay: delayIndex * delayConstant + 's' }}
        ></p>
        <div className={styles.postToolbarContainer}>
          <div className={styles.postToolbar}>
            <div
              className={styles.countSkeleton}
              style={{ animationDelay: delayIndex * delayConstant + 's' }}
            ></div>
            <div className={styles.countSkeleton}></div>
            <div className={styles.countSkeleton}></div>
            <div className={styles.countSkeleton}></div>
            <div className={styles.countSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
