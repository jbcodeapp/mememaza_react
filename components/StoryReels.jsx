import React from "react";
import styles from "@/styles/components/story-reels.module.css";
import Story, { NoStoryComponent } from "./Story";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";

export default function StoryReels({ stories }) {
  const [showSliderAfter, setShowSlideAfter] = useState(8);


  useEffect(() => {
    let w = window.innerWidth;
    console.log(w)
    if(w>1000) {
      setShowSlideAfter(8)
    } else if(w<1000 && w>700) {
      setShowSlideAfter(6)
    } else if(w<700 && w>500) {
      setShowSlideAfter(3)
    } else if(w <= 500) {
      setShowSlideAfter(3)
    }
  }, [])

  console.log(showSliderAfter)
  const slickSettings = {
    dots: false,
    speed: 500,
    slidesToShow: showSliderAfter,
    slidesToScroll: 1,
    infinite: false,
    prevArrow:<button type='button' class='slick-prev pull-left'><i class='fas fa-angle-left' aria-hidden='true'></i></button>,
    nextArrow:<button type='button' class='slick-next pull-right'><i class='fas fa-angle-right' aria-hidden='true'></i></button>
  };

  return (
    <div
      className={styles.storyReels}
      style={{ paddingLeft: stories?.length > showSliderAfter ? 16 : 0 }}
    >
      {stories?.length === 0 || !stories ? (
        <div className={styles.body}>
          <NoStoryComponent />
        </div>
      ) : (
        ""
      )}
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
  );
}
