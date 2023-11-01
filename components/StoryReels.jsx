import React from 'react'
import styles from '@/styles/components/story-reels.module.css'
import Story, { StorySkeleton } from './Story'
import Slider from 'react-slick'
import { useState } from 'react'
import { useEffect } from 'react'
import InfoPanel from './InfoPanel'

export default function StoryReels({ stories }) {
  const [showSliderAfter, setShowSlideAfter] = useState(8)
  const [loading, setLoading] = useState(stories?.length !== 0)

  useEffect(() => {
    if (stories?.length) {
      setLoading(false)
    }
  }, [stories])

  useEffect(() => {
    let w = window.innerWidth
    console.log(w)
    if (w > 1000) {
      setShowSlideAfter(8)
    } else if (w < 1000 && w > 700) {
      setShowSlideAfter(6)
    } else if (w < 700 && w > 500) {
      setShowSlideAfter(3)
    } else if (w <= 500) {
      setShowSlideAfter(3)
    }
  }, [])

  const slickSettings = {
    dots: false,
    speed: 500,
    slidesToShow: showSliderAfter,
    slidesToScroll: 1,
    infinite: false,
    prevArrow: (
      <button type="button" class="slick-prev pull-left">
        <i class="fas fa-angle-left" aria-hidden="true"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" class="slick-next pull-right">
        <i class="fas fa-angle-right" aria-hidden="true"></i>
      </button>
    ),
  }

  return (
    <div
      className={styles.storyReels}
      style={{ paddingLeft: stories?.length > showSliderAfter ? 16 : 0 }}
    >
      {!loading && (stories?.length === 0 || !stories) ? (
        <div className={styles.body}>
          <InfoPanel
            title="Oops"
            message="No Story has been posted today."
            image="\assets\images\Fatal Error.png"
          />
        </div>
      ) : (
        ''
      )}
      {loading ? (
        <div
          style={{
            marginLeft: 31,
            display: 'flex',
            width: '105%',
            gap: 16,
          }}
        >
          {Array.from({ length: 10 }, (_, index) => index).map((idx) => (
            <StorySkeleton style={{ margin: 0 }} key={idx} />
          ))}
        </div>
      ) : null}

      {stories?.length > showSliderAfter ? (
        <Slider {...slickSettings} style={{ marginLeft: 16 }}>
          {stories?.map((item, i) => (
            <Story key={i} story={item} />
          ))}
        </Slider>
      ) : (
        <div className={styles.body}>
          {stories?.map((item, i) => (
            <Story key={i} story={item} />
          ))}
        </div>
      )}
    </div>
  )
}
