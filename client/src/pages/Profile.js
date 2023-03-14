import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Axios from "axios";
import PostCard from "./PostCard";

export default function Profile() {
  let { id_user } = useParams();

  const [cookies, setCookies, removeCookie] = useCookies();

  const [user, setUser] = useState({
    userId: 0,
    user_login: "",
    user_name: "",
    user_surname: "",
    postCount: "",
    likesCount: "",
    accessLvl: 0,
    about: "",
    rofilePic: "",
    backgroundPic: "",
    rendered: 0,
  });

  const [posts, setPosts] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getUsers/${id_user}`).then((data) => {
      if (user.rendered < 2) {
        setUser((prevState) => {
          return {
            userId: data.data[0].id_user,
            user_login: data.data[0].user_login,
            user_name: data.data[0].user_name,
            user_surname: data.data[0].user_surname,
            postCount: data.data[0].postCount,
            likesCount: data.data[0].likesCount,
            accessLvl: data.data[0].likesCount,
            about: data.data[0].about,
            profilePic: data.data[0].profilePic,
            backgroundPic: data.data[0].backgroundPic,
            rendered: prevState.rendered + 1,
          };
        });
      }
    });
    console.log(posts);
    if (user.rendered < 1) {
      Axios.get(`http://localhost:3002/api/getPostsByUser/${id_user}`).then(
        (data) => {
          setPosts(data.data);
          console.log(data);
        }
      );
    }
  });
  console.log(user);

  return (
    <>
      <div className="w-3/4 mx-auto my-24 overflow-hidden bg-white rounded-lg main h-fit drop-shadow-2xl ">
        <p className="absolute z-10 px-2 py-1 m-4 bg-white rounded-lg opacity-90 drop-shadow-lg">
          ID: {user.userId}
        </p>
        <div className={`z-0 overflow-hidden group/item `}>
          <img
            src={`http://localhost:3002/images/${user.backgroundPic}
`}
            className={`relative object-cover w-full   aspect-video h-96 `}
            alt=""
          />
        </div>

        <img
          src={`http://localhost:3002/images/${user.profilePic}
`}
          className="absolute z-10 object-cover w-48 h-48 mx-10 -mt-24 rounded-full "
          alt=""
        />
        <div className="flex flex-col content">
          <h1 className="mx-10 mt-32 mb-4 text-3xl uppercase">
            {user.user_name} {user.user_surname}
          </h1>
          <div className="absolute flex flex-col w-1/3 h-48 p-2 mt-16 rounded-lg myCar right-12 bg-slate-300"></div>
          <p className="mx-12">Likes Count: {user.likesCount}</p>
          <p className="mx-12">Comments Count: {user.likesCount}</p>
          <p className="mx-12 my-6">
            About me: <br />
            {user.about}
          </p>
        </div>
        <div id="postlist">
          {posts.length > 0 ? (
            posts.length > 1 ? (
              posts.map((val, key) => {
                return (
                  <PostCard
                    key={key}
                    id={val.post_id}
                    postTitle={val.title}
                    postText={val.post_text}
                    postCreator={
                      val.user_name
                        ? val.user_name + " " + val.user_surname
                        : val.user_login
                    }
                    postCreatorID={val.id_user}
                    imageLink={val.photoName}
                    postLikes={val.likes}
                  />
                );
              })
            ) : (
              <PostCard
                id={posts[0].post_id}
                postTitle={posts[0].title}
                postText={posts[0].post_text}
                postCreator=""
                postCreatorID={posts[0].id_user}
                imageLink={posts[0].photoName}
                postLikes={posts[0].likes}
              />
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
