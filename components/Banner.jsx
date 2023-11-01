import React from 'react'
import styles from '@/styles/components/banner.module.css'
import Category from './Category'
import StoryReels from './StoryReels'
import RectSkeleton from './skeletons/RectSkeleton'

export default function Banner({ categories, stories, style }) {
  return (
    <div className={styles.banner} style={style}>
      <StoryReels stories={stories} />
      <h3 className={styles.title}>Explore Categories</h3>
      <div className={styles.categories}>
        {!categories || categories?.length === 0
          ? Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <RectSkeleton
                  style={{ margin: 0, borderRadius: 0 }}
                  width={idx === 0 ? 232 : 110}
                  height={130 - 56.5}
                  variant="light"
                />
                <RectSkeleton
                  style={{ margin: 0, borderRadius: 0 }}
                  width={idx === 0 ? 232 : 110}
                  height={56.5}
                  variant="lighter"
                />
              </div>
            ))
          : null}
        {categories?.map((category, i) => (
          <Category key={i} bigger={i === 0} category={category} />
        ))}
      </div>
    </div>
  )
}
