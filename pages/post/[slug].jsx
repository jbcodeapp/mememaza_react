"use client";
import Gallery from "../../components/Gallery";
import { API_PATH, SITE_URL } from "@/def";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { timeAgo } from "@/utils/timeAgo";

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState();
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (slug && !data?.length) {
      axios(SITE_URL + `/getpostbyslug/${slug}/post`, {
        method: "GET",
        body: {
          page: 1
        }
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

  const attachSeeMoreLessListeners = () => {
    let seeMoreButton = document.getElementById('seeMore');

    if(seeMoreButton) { 
      seeMoreButton.addEventListener('click', (e) => {
        e.preventDefault()
        setSeeMore(true)
        setTimeout(() => {
          let seeLessButton = document.getElementById('seeLess');
          if(seeLessButton) {
            seeLessButton.addEventListener('click', (f) => {
              f.preventDefault()
              setSeeMore(false)
              setTimeout(() => {
                attachSeeMoreLessListeners();
              }, 100)
            })
          }
        }, 100)
      })
    }
  }

  useEffect(() => {
    if(data?.obj) {
      attachSeeMoreLessListeners()
    }
  }, [data])

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


    const descriptionLength = 70;

    return (
      <>
        <Navbar bgOpacity={1} />
        <Gallery
          id={data?.obj.id}
          type="post"
          comments={data?.obj.comments}
          slug={slug}
          mediaType="photo"
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
          media={
            <img
              style={{ maxHeight: "100%" }}
              src={!loading && data?.obj.image}
              alt={!loading && data?.obj.title}
            />
          }
          title={!loading && <>
              <b>{ data?.obj.title}</b>
              <br/>
              <p
                dangerouslySetInnerHTML={{
                  __html: seeMore ? data?.obj.desc+' <a href="" style="font-size: 14px" id="seeLess">See less</a>'  : data?.obj
                    .desc.slice(0, descriptionLength)+`${
                      data?.obj.desc.length > descriptionLength ? `... <a style="font-size: 14px" href="" id="seeMore">See more</a>` : ''
                    }`
                }}
              />
            </>
              }
          timeAgo={!loading ? timeAgo(data?.obj.created_at) : ""}
          likes={!loading && data?.obj.like}
        />
      </>
    );
  }
  return null;
}
