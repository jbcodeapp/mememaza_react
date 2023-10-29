import React from 'react'

import styles from '@/styles/components/story.module.css'
import { useRouter } from 'next/navigation'
import RectSkeleton from './skeletons/RectSkeleton'

export default function Story({ story }) {
  const router = useRouter()
  return (
    <div
      role="button"
      onClick={() => {
        router.push(`/story/${story.id}`)
      }}
      className={`${styles.story} ${
        story.story_type === 2 ? styles.vidContainer : ''
      }`}
    >
      {story.story_type === 1 ? (
        <div
          className={styles.thumbnail}
          style={{
            backgroundImage: `url(${story.story})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      ) : (
        <div
          className={styles.thumbnail}
          style={{
            backgroundImage: `url(${story.vdo_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
    </div>
  )
}

export const StorySkeleton = () => {
  return (
    <RectSkeleton
      height={200}
      width={112.5}
      style={{ marginBottom: 0 }}
      variant="light"
    />
  )
}
