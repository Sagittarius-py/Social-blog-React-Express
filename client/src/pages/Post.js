import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import CommentForm from "./CommentForm";
import Gallery from "react-photo-gallery";

export default function Post() {
  let history = useHistory();
  const [cookies, setCookies, removeCookie] = useCookies();
  let { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    postText: "",
    user_Login: "",
    photoNames: [],
    id: "",
    rendered: 0,
  });

  const [event, setEvent] = useState(true);

  const [OpenedImage, setOpenedImage] = useState({
    openedImageLink: "",
    isOpened: false,
  });

  const ImageOpen = (e) => {
    if (!OpenedImage.isOpened) {
      const newState = {
        openedImageLink: e.src,
        isOpened: true,
      };
      setOpenedImage(newState);
    } else {
      const newState = {
        openedImageLink: "",
        isOpened: false,
      };
      setOpenedImage(newState);
    }
    console.log(OpenedImage);
  };

  useEffect(() => {
    Axios.get(
      `https://mysql-deploy.herokuapp.com/api/getFromId/${postId}`
    ).then((data) => {
      if (post.rendered < 1) {
        var imagesNames = [];
        data.data.map((record) => {
          imagesNames.push(record.photoName);
          return imagesNames;
        });
        var joined = post.photoNames.concat(imagesNames);

        setPost({
          title: data.data[0].title,
          postText: data.data[0].post_text,
          user_Login: data.data[0].user_name,
          photoNames: joined,
          id: data.data[0].id,
          rendered: 1,
        });
      }
    });
    if (event) {
      let imgs = document.getElementsByClassName("photoGalleryPhoto");
      if (imgs.length > 0) {
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].addEventListener("click", (e) => ImageOpen(e.target));
        }
        setEvent(false);
      }
    }
  });

  const photoList = [];
  post.photoNames.map((photo) => {
    photoList.push({
      src: `https://mysql-deploy.herokuapp.com/images/${photo}`,
      width: 4,
      height: 3,
      className: "photoGalleryPhoto",
    });
    return photoList;
  });

  const deletePost = (id) => {
    Axios.delete(
      `https://mysql-deploy.herokuapp.com/api/delete/${postId}`
    ).then((response) => {
      alert("you deleted a post");
    });
  };

  return (
    <div className="flex justify-center m-12  h-4/5">
      {OpenedImage.isOpened ? (
        <div className="fixed w-full h-full bg-black z-50 flex items-center justify-center top-0 bg-opacity-90 overflow-hidden py-12">
          <img
            id="OpenedImagePopup"
            className="my-12 max-h-min max-w-screen-2xl"
            src={OpenedImage.openedImageLink}
            alt={`${OpenedImage.openedImageLink}`}
            onClick={(e) => ImageOpen(e)}
          />
        </div>
      ) : null}
      <div className="flex flex-col w-3/5 p-8 mt-12 rounded-md shadow-2xl h-fit flex-nowrap bg-neutral-200 dark:bg-neutral-700">
        <div className="about">
          <h1 className="mb-1 text-4xl font-bold text-slate-900 dark:text-slate-50 post-title">
            {post.title}
          </h1>
          <p className="text-zinc-800 dark:text-slate-100">{post.postText}</p>
          <h4 className="m-2 text-sm font-normal text-gray-600 dark:text-slate-100">
            {post.user_Login}
          </h4>
        </div>
        <div className="photos">
          <Gallery photos={photoList} />
        </div>

        <CommentForm postId={postId} />

        {cookies.user_login == post.user_Login ? (
          <button
            className="relative bottom-0 right-0 float-right w-48 h-12 overflow-hidden text-lg bg-white dark:bg-zinc-800 rounded-lg shadow group"
            onClick={() => deletePost(post.id)}
          >
            <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Delete Post
            </span>
          </button>
        ) : cookies.accessLvl > 2 ? (
          <button
            className="relative bottom-0 mt-4 right-0 float-right w-48 h-12 overflow-hidden text-lg bg-white dark:bg-neutral-900 rounded-lg shadow group"
            onClick={() => {
              deletePost(post.id);
              history.push("/");
            }}
          >
            <div className="absolute inset-0 w-3  bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black dark:text-white group-hover:text-white">
              Delete Post
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
