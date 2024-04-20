import React from 'react'
import { Popover } from 'react-tiny-popover'
import ActionButton from './ActionButton'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState } from 'react'
import toastr from 'toastr'
import styles from '@/styles/components/comment-box.module.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import { SITE_URL } from '@/def'
import axios from 'axios'
import { useAppSelector } from '@/src/store'
import { authUserSelect } from '@/src/services/auth/slice'
import InfoPanel from './InfoPanel'
import Spinner from './Spinner'
import Link from 'next/link'

const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

export default function CommentBox({
  type,
  id,
  onNewComment,
  onNewCommentSuccess,
  onNewCommentError,
  commentBoxFocus,
  newCommentSuccess,
}) {
  const [gifs, setGifs] = useState()
  const [isGifPopoverOpen, setIsGifPopoverOpen] = useState(false)

  const [commentType, setCommentType] = useState(1)
  const [comment, setComment] = useState('')
  const [imagePath, setImagePath] = useState('')

  const [imageUploading, setImageUploading] = useState(false)

  useEffect(() => {
    console.log(newCommentSuccess)
    if (newCommentSuccess) {
      setComment('')
      setCommentType(1)
      setImagePath('')
    }
  }, [newCommentSuccess])

  const onGifClick = (id, e) => {
    e.preventDefault()
    setIsGifPopoverOpen(false)
    handleComment(e, id, 3)
  }

  const onImageSelected = (e) => {
    setImageUploading(true)
    const image = e.target.files[0]

    if (typeof window !== 'undefined') {
      // Access localStorage or run client-side code here
      let token = localStorage.getItem('token')
      if (token) {
        // Create a FormData object
        var formData = new FormData()

        // Append the file to the FormData object
        formData.append('image', image)

        axios
          .post(`${SITE_URL}/store-image`, formData, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then((resp) => {
            setImageUploading(false)
            setCommentType(2)
            setImagePath(resp.data.url)
          })
          .catch((err) => {
            setImageUploading(true)
            toastr.error(err.message, 'Mememaza')
          })
      } else {
        setImageUploading(false)
        toastr.error('Please login to comment!', 'Mememaza')
      }
    }
  }

  const fetchGifs = async (offset) =>
    await giphyFetch.trending({ offset, limit: 10 })

  const fetchMoreGifs = async () =>
    await giphyFetch.trending({ offset: gifs.length, limit: 10 })

  useEffect(() => {
    if (!gifs) {
      fetchGifs().then((resp) => setGifs(resp.data))
    }
  }, [])

  const handleComment = (e, cid = null, ctype = null) => {
    let com, comment_type

    if (cid) {
      com = cid
    } else {
      com = comment
    }
    if (ctype) {
      comment_type = ctype
    } else {
      comment_type = commentType
    }

    e.preventDefault()

    if (typeof window !== 'undefined') {
      // Access localStorage or run client-side code here
      let token = localStorage.getItem('token')

      if (token) {
        let commenter = JSON.parse(localStorage.getItem('userdata'))
        console.log(token, commenter)
        setLoading(true)
        onNewComment({
          id: 0,
          comment: com,
          comment_type,
          image_path: imagePath,
          commenter,
          created_at: new Date(),
        })
        axios
          .post(
            `${SITE_URL}/comment/${type}/${id}`,
            {
              comment: com,
              comment_type,
              image_path: imagePath,
            },
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          .then((resp) => {
            setLoading(false)

            onNewCommentSuccess(resp.data)
          })
          .catch((err) => {
            setLoading(false)

            // onNewCommentError()
          })
      } else {
        toastr.error('Please login to comment!', 'Mememaza')
      }
    }
  }

  const textareaRef = useRef()

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus()
    }
  }, [textareaRef.current])

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus()
    }
  }, [commentBoxFocus])
  const gifGrid = (
    <div className={styles.giphyContainer}>
      <div className={styles.giphyGrid}>
        {gifs?.map((item, i) => (
          <img
            onClick={(e) => onGifClick(item.id, e)}
            style={{ width: '100%' }}
            src={`https://i.giphy.com/media/${item.id}/giphy.webp`}
          />
        ))}
      </div>
      <button
        className="btn mt-2"
        disabled={gifs?.length === 0}
        onClick={() =>
          fetchMoreGifs().then((resp) => setGifs([...gifs, ...resp.data]))
        }
      >
        Load More
      </button>
    </div>
  )
  const fileInputRef = useRef(null)

  const openImageUploader = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const [loading, setLoading] = useState(false)

  const user = useAppSelector(authUserSelect)

  return user.id ? (
    <div
      className={styles.commentBoxContainer}
      // style={{
      //   width:
      //     window.innerWidth >= 360 && window.innerWidth <= 414
      //       ? '100%'
      //       : '44.5%',
      // }}
      onClick={() => textareaRef?.current.focus()}
    >
      <div className={styles.userDetails}>
        <img
          className={styles.avatar}
          src={`https://picsum.photos/${100 + user.id}`}
          alt="user"
        />
      </div>
      <div className={styles.commentBoxInner}>
        <Popover
          isOpen={isGifPopoverOpen}
          positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
          content={gifGrid}
        >
          <button
            className={styles.commentActionButton}
            style={{ left: 10, bottom: 10 }}
            onClick={() => setIsGifPopoverOpen(!isGifPopoverOpen)}
          >
            <img height={25} src="/assets/images/gif.png" alt="gif logo" />
          </button>
        </Popover>

        <button
          onClick={openImageUploader}
          className={styles.commentActionButton}
          style={{ left: 50, bottom: 10 }}
        >
          <i className="fas fa-image " />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/webp, image/jpeg, image/jpg, image/png"
          style={{ display: 'none' }}
          onChange={onImageSelected}
        />

        <textarea
          placeholder="Write a comment..."
          ref={textareaRef}
          className={styles.commentBox}
          autofocus
          rows={2}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        {imagePath ? (
          <img
            height="30px"
            style={{ position: 'absolute', bottom: 20, left: 100 }}
            src={imagePath}
            alt="uploaded comment"
          />
        ) : null}
        {imageUploading ? <Spinner /> : null}
        <ActionButton
          loading={loading}
          style={{
            height: 'fit-content',
            position: 'absolute',
            right: 10,
            bottom: 7,
          }}
          onClick={handleComment}
          icon="paper-plane"
          text="Send"
          lg
        />
      </div>
    </div>
  ) : (
    <>
    </>
    // <InfoPanel
      // style={{
        //   position: 'absolute',
        //   bottom: 0,
        //   right: 10,
        //   borderRadius: 0,
        //   background: '#131033',
      //   width: '100%',
      //   color: 'white',
      // }}
      // title="Not Logged In !"
      // titleStyle={{ fontSize: 18 }}
      // message={
        //   <>
      //     Please <Link href="/sign-in">sign in</Link> to comment.
      //   </>
      // }
      // image="\assets\images\Fatal Error.png"
      // />
    )
}

export const LoginToComment = () => {}
