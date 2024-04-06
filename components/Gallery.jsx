import React from 'react'

import styles from '@/styles/components/gallery.module.css'
import abStyles from '@/styles/components/action-button.module.css'
import { useEffect, useState } from 'react'
import UserHistory from './UserHistory'
import Link from 'next/link'
import { API_PATH, HOME_URL, SITE_URL } from '@/def'
import ShareButton from './ShareButton'
import CommentSection from '@/views/CommentSection'
import Spinner from './Spinner'
import ActionButton from './ActionButton'
import { postLike } from '@/src/services/post/slice'
import { useAppDispatch } from '@/src/store'

export default function Gallery({
  media,
  id,
  title,
  media_url,
  loading,
  isLiked,
  onLike,
  user_has_liked,
  views_count,
  shares_count,
  likes_count,
  downloads_count,
  comments_count,
  comments,
  slug,
  onDislike,
  timeAgo,
  type,
  previousLink,
  nextLink,
  mediaType = 'photo',
}) {
  const [icon, setIcon] = useState('vr-dashboard')

  useEffect(() => {
    if (type) {
      if (type == 'reel') {
        setIcon('vr-cardboard')
      } else if (type == 'story') {
        setIcon('cloud-moon')
      } else {
        setIcon('newspaper')
      }
    }
  }, [type])

  const actionButtonStyle = {
    color: '#b0b3b8ae',
    hoverColor: '#eeaeae',
    lg: true,
  }

  const [showCommentBox, setCommentBoxShow] = useState(false)

  const [commentBoxFocus, setCommentBoxFocus] = useState()
  const [like, setLike] = useState(user_has_liked)
  const [likeCount, setLikeCount] = useState(likes_count)

  const dispatch = useAppDispatch()


  return (
    <div className={styles.gallery}>
      {showCommentBox ? <div className={styles.blurredBackdrop}></div> : null}
      <div className={styles.mediaContainer}>
        {loading ? <Spinner /> : media}
        {previousLink && (
          <Link
            href={previousLink}
            className={styles.navLink + ' ' + styles.previousLink}
          >
            <i className="fas fa-chevron-left" />
          </Link>
        )}
        {nextLink && (
          <Link
            href={nextLink}
            className={styles.navLink + ' ' + styles.nextLink}
          >
            <i className="fas fa-chevron-right" />
          </Link>
        )}
      </div>
      <div
        className={`${styles.dataContainer} ${
          showCommentBox ? styles.showCommentBox : ''
        }`}
      >
        <div
          role="button"
          onClick={() => setCommentBoxShow((scb) => !scb)}
          className={styles.dataContainerChevron}
        >
          <i className={`fas fa-chevron-${showCommentBox ? 'down' : 'up'}`} />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.info}>
            <i className={`fa fa-${icon}`} /> This {mediaType} is from a {type}.
          </p>
        </div>
        {loading ? (
          <div className={styles.titleContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <div className={styles.titleContainer}>
              <UserHistory
                avatar="https://picsum.photos/id/7/100/100.webp"
                name="Admin"
                timeAgo={timeAgo}
              />
              {title ? title : <Spinner />}
            </div>
            <div className={styles.toolbarContainer}>
              <ActionButton
                {...actionButtonStyle}
                // onClick={() => {
                //   if (isLiked) {
                //     onDislike()
                //   } else {
                //     onLike()
                //   }
                // }}
                onClick={(e) => {
                  e.preventDefault()
                  setLike((like) => !like)
                  setLikeCount((lc) => (like ? lc - 1 : lc + 1))
                  dispatch(postLike({ id, type }))
                  console.log("Liked... update");
                }}
                icon="thumbs-up"
                count={likeCount}
                active={like}
                // text={likeCount}
                text="Like"
              />
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {
                  setCommentBoxFocus(new Date().toString())
                }}
                icon="comment"
                count={comments_count}
                text="Comment"
              />

              <ActionButton
                {...actionButtonStyle}
                onClick={() => {}}
                icon="eye"
                count={views_count}
                text="View"
              />

              <a
                href={`${API_PATH}/download?file=${media_url}&type=${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }&id=${id}`}
                className={`${abStyles.actionBtn} ${abStyles.actionBtnLg}`}
              >
                <i className={`fas fa-download`}></i>{' '}
                {downloads_count !== null ? (
                  <span>{downloads_count}</span>
                ) : null}
                <>Download</>
              </a>

              <ShareButton
                {...actionButtonStyle}
                style={{ width: '100%' }}
                count={shares_count}
                text="Share"
                url={`${HOME_URL}${type}/${slug}`}
              />
            </div>

            <CommentSection
              commentBoxFocus={commentBoxFocus}
              comments={comments}
              type={type}
              id={id}
            />
          </>
        )}
      </div>
    </div>
  )
}
