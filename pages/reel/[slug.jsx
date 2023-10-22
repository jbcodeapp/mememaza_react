"use client";
import Gallery from "../../components/Gallery";
import { API_PATH, SITE_URL } from "@/def";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { timeAgo } from "@/utils/timeAgo";

export default function ReelsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    if (slug && !data?.length) {
      axios(SITE_URL + `/getreelbyslug/${slug}`, {
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
    const onShare = async () => {};
    const onDownload = async () => {};

    return (
      <>
        <Navbar bgOpacity={1} />
        <Gallery
          type="post"
          mediaType="photo"
          isLiked={isLiked}
          loading={loading}
          getComment={getComment}
          onComment={handleOnComment}
          onLike={handleLike}
          onCommentDelete={handleCommentDelete}
          onDislike={handleDislike}
          onShare={onShare}
          onDownload={onDownload}
          media={
            <img
              style={{ maxHeight: "100%" }}
              src={!loading && API_PATH + "/" + data?.obj.image}
              alt={!loading && data?.obj.title}
            />
          }
          title={!loading && data?.obj.title}
          timeAgo={!loading ? timeAgo(data?.obj.created_at) : ""}
          likes={!loading && data?.obj.like}
        />
      </>
    );
  }
  return null;
}
