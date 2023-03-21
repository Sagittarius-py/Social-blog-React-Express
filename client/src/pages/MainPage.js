import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Axios from "axios";
import "../App.css";
import PostCard from "./PostCard";

function MainPage() {
  const [postList, setPostList] = useState([]);

  const [cookies, setCookies, removeCookie] = useCookies();

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      console.log(data.data);
      setPostList(data.data);
    });
  }, []);

  return (
    <div className="py-20 MainPage">
      <div className="PostContainer">
        {postList.map((val, key) => {
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
        })}
      </div>
    </div>
  );
}

export default MainPage;
