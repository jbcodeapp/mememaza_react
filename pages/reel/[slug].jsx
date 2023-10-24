"use client";
import Gallery from "../../components/Gallery";
import { API_PATH, SITE_URL } from "@/def";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { timeAgo } from "@/utils/timeAgo";
import ReactPlayer from 'react-player'

export default function ReelsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    if (slug && !data?.length) {
      axios(SITE_URL + `/getpostbyslug/${slug}/reel`, {
        method: "GET",
      })
        .then((resp) => {
          setLoading(false);
          setData(resp.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  }, [slug]);

  if (slug) {
    const getComment = async () => {};
    const handleOnComment = async () => {};
    const handleCommentDelete = async () => {};
    const handleLike = async () => {
      setIsLiked(true);
      axios(SITE_URL + "/updatelike/", {
        method: "POST",
        data: { id: data.obj.id, module: "posts" },
      })
        .then((resp) => {
          if (resp.status == "success") {
            if (setIsLiked == false) {
              setIsLiked(true);
            }
          } else {
            setIsLiked(false);
          }
        })
        .catch(() => {
          setIsLiked(false);
        });
    };
    const handleDislike = async () => {
      setIsLiked(false);
      axios(SITE_URL + "/updatedislike/", {
        method: "POST",
        data: { id: data.obj.id, module: "posts" },
      })
        .then((resp) => {
          if (resp.status == "success") {
            if (setIsLiked == false) {
              setIsLiked(false);
            }
          } else {
            setIsLiked(true);
          }
        })
        .catch((err) => {
          setIsLiked(true);
        });
    };
    const onShare = async () => {};
    const onDownload = async () => {};

    let mediaType = '';
    let media;

    switch(data?.obj.reel_type) {
      case 1:
        mediaType = 'link';
        media = <div style={{
          height: '600px', borderRadius: 14, width: '300px', background: 'black', display: 'flex', alignItems: 'flex-end', padding: '12px'
        }}><a href={data?.obj.link}>See More</a> </div>;
        break;
      case 2:
        mediaType = 'video';
        media = <ReactPlayer playing url={API_PATH + "/" + data?.obj.link} />;
        break;
      case 3:
        mediaType = 'photo';
        media = <img
          style={{ maxHeight: "100%" }}
          src={!loading && API_PATH + "/" + data?.obj.link}
          alt={!loading && data?.obj.title}
        />;
        break;
    }
    console.log(media,data?.obj.type)
  
    return (
      <>
        <Navbar bgOpacity={1} />
        <Gallery
          type="reel"
          mediaType={mediaType}
          previousLink={data?.previous}
          nextLink={data?.next}
          isLiked={isLiked}
          loading={loading}
          getComment={getComment}
          onComment={handleOnComment}
          onLike={handleLike}
          onCommentDelete={handleCommentDelete}
          onDislike={handleDislike}
          onShare={onShare}
          onDownload={onDownload}
          media={media}
          title={!loading && data?.obj.title}
          timeAgo={!loading ? timeAgo(data?.obj.created_at) : ""}
          likes={!loading && data?.obj.like}
        />
      </>
    );
  }
  return null;
}
