import React from "react";
import styles from "@/styles/components/story-reels.module.css";
import { useState } from "react";
import Story, { NoStoryComponent } from "./Story";
import Slider from "react-slick";

export default function StoryReels({ stories }) {
  const showSliderAfter = 8;
  const slickSettings = {
    dots: false,
    speed: 500,
    slidesToShow: showSliderAfter,
    slidesToScroll: 3,
    infinite: true,
  };
  return (
    <div
      className={styles.storyReels}
      style={{ paddingLeft: stories.length > showSliderAfter ? 16 : 0 }}
    >
      {stories.length === 0 ? (
        <div className={styles.body}>
          <NoStoryComponent />
        </div>
      ) : (
        ""
      )}
      {stories.length > showSliderAfter ? (
        <Slider {...slickSettings} style={{ marginLeft: 16 }}>
          {stories.map((item, i) => (
            <Story key={i} story={item} />
          ))}
        </Slider>
      ) : (
        <div className={styles.body}>
          {stories.map((item, i) => (
            <Story key={i} story={item} />
          ))}
        </div>
      )}
    </div>
  );
}
