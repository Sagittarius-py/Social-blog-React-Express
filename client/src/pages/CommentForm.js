import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Axios from "axios";

export default function CommentForm(props) {
  let [commentText, setCommentText] = useState("");
  let [comments, setComments] = useState({});
  let [rendered, setRendered] = useState(0);

  const [cookies, setCookies, removeCookie] = useCookies();
  let { postId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getComments/${postId}`).then(
      (data) => {
        if (rendered < 2) {
          setComments(data.data);
          setRendered(2);
        }
      }
    );
  });

  const addComment = (event, postId) => {
    event.preventDefault();
    let data = {};
    data = { userId: cookies.userId, text: commentText };

    Axios.post(`http://localhost:3002/api/writeComment/${postId}`, data);
    window.location.reload(false);
  };

  const delComment = (event, IDcomment) => {
    Axios.delete(`http://localhost:3002/api/deleteComment/${IDcomment}`).then(
      (response) => {
        alert("you deleted a comment");
      }
    );
    window.location.reload(false);
  };

  return (
    <>
      <div className="w-full mt-12 rounded-xl h-fit border-dotted border-2 border-blue-700 dark:bg-neutral-900 bg-gray-100 shadow-2xl shadow-slate-400 dark:shadow-slate-900">
        <h1 className="px-2 pt-3 pb-2 mx-6 text-lg text-gray-800 dark:text-slate-50">
          Comments
        </h1>
        {comments.length ? (
          comments.length > 1 ? (
            comments.map((comment, key) => {
              return (
                <div key={key}>
                  <div className="relative flex flex-row align-middle w-11/12 p-2 mx-auto mt-4 rounded-md bg-slate-300 dark:bg-zinc-700 shadow-2xl shadow-slate-400 dark:shadow-slate-900">
                    <div className="flex flex-col w-full">
                      <a
                        href={`http://localhost:3000/profile/${comment.user_id}`}
                        className="text-slate-900 dark:text-slate-50"
                      >
                        <h1>
                          {comment.user_name + " " + comment.user_surname}
                        </h1>
                      </a>
                      <p className="text-slate-900 dark:text-slate-50">
                        {comment.commentText}
                      </p>
                    </div>
                    {cookies.userId == comment.user_id ? (
                      <button
                        onClick={(event) =>
                          delComment(event, comment.IDcomment)
                        }
                        className="relative right-0 my-2 mx-4 w-12 h-8 overflow-hidden text-lg bg-white rounded-lg shadow group mh-auto"
                      >
                        <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white">
                          Del
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div className="relative flex flex-row w-11/12 p-2 mx-auto mt-8 rounded-md bg-slate-300 ">
                <div className="flex flex-col w-full">
                  <a
                    href={`http://localhost:3000/profile/${comments[0].user_Login}`}
                  >
                    <h1>{comments[0].user_Login}</h1>
                  </a>
                  <p>{comments[0].commentText}</p>
                </div>
                {cookies.userId == comments[0].user_id ? (
                  <button
                    onClick={(event) =>
                      delComment(event, comments[0].IDcomment)
                    }
                    className="absolute right-0 float-right w-12 h-8 mr-2 overflow-hidden text-lg bg-white rounded-lg shadow group mh-auto"
                  >
                    <div className="absolute inset-0 w-3 bg-orange-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-black group-hover:text-white">
                      Del
                    </span>
                  </button>
                ) : null}
              </div>
            </div>
          )
        ) : null}
        <div className="flex flex-col w-11/12 p-2 mx-auto mt-8 mb-4 rounded-md items-left bg-slate-300 dark:bg-zinc-700 drop-shadow-sm shadow-slate-400 dark:shadow-slate-900 ">
          <form className="w-full max-w-xl px-4 pt-2 rounded-lg ">
            <div className="flex flex-wrap mb-6 -mx-3">
              <h2 className="px-2 pt-3 pb-2 text-lg text-slate-900 dark:text-slate-50">
                Add a new comment
              </h2>
              <div className="w-full px-3 mt-2 mb-2 md:w-full">
                <textarea
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-70 dark:placeholder-slate-100 dark:text-slate-50 bg-slate-100 rounded resize-none focus:outline-none focus:bg-white dark:focus:bg-slate-800 dark:bg-zinc-800"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                ></textarea>
              </div>
              <div className="flex items-start w-full px-3 md:w-full">
                <button
                  onClick={(event) => addComment(event, props.postId)}
                  className="relative bottom-0 right-0 float-right w-48 h-12 overflow-hidden text-lg bg-white rounded-lg shadow group dark:bg-neutral-900"
                >
                  <div className="absolute inset-0 w-3 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-black dark:text-white group-hover:text-white">
                    Post Comment
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
