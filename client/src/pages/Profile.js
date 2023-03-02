import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Placeholder from "../images/1.jpg";

import getCookieObject from "../getCookieObject";

export default function Profile() {
  let { id_user } = useParams();

  const cookies = getCookieObject();

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
    rendered: 0,
  });
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
            rendered: prevState.rendered + 1,
          };
        });
      }
    });
  });
  console.log(user);

  return (
    <>
      <div className="w-3/4 mx-auto my-24 overflow-hidden bg-white rounded-lg main h-fit drop-shadow-2xl ">
        <p className="absolute z-10 px-2 py-1 m-4 bg-white rounded-lg opacity-90 drop-shadow-lg">
          ID: {user.userId}
        </p>
        <div
          className={`z-0 overflow-hidden group/item ${
            cookies.loggedIn ? "cursor-pointer " : null
          }`}
        >
          <img
            src={Placeholder}
            className={`relative object-cover w-full ${
              cookies.loggedIn
                ? "group-hover/item:blur-sm group-hover/item:scale-110 "
                : null
            } aspect-video h-96 `}
            alt=""
          />
          {cookies.loggedIn ? (
            <h1 className="absolute invisible px-4 py-2 mx-auto text-4xl transform -translate-x-1/2 -translate-y-48 bg-white rounded-md top-1/2 left-1/2 group-hover/item:visible">
              Edit
            </h1>
          ) : null}
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
      </div>
    </>
  );
}
