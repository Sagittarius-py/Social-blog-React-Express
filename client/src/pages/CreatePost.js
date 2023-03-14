import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Axios from "axios";
import "../App.css";

function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState("");
  const [cookies, setCookies, removeCookie] = useCookies();

  const submitPost = () => {
    const data = new FormData();

    data.append("userId", cookies.userId);
    data.append("title", title);
    data.append("text", text);

    for (let i = 0; i < photos.length; i++) {
      data.append("files", photos[i]);
    }
    if (title !== "" && text !== "" && photos !== "") {
      Axios.post("http://localhost:3002/api/create", data);
      history.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <div className="py-6 px-9">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Title
            </label>
            <input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              name="title"
              id="title"
              placeholder="My Newest V8!"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="about"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              About
            </label>
            <input
              onChange={(event) => setText(event.target.value)}
              type="text"
              name="about"
              id="about"
              placeholder="About newest V8..."
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="pt-4 mb-6">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload File
            </label>

            <div className="mb-8">
              <label
                htmlFor="img"
                className="relative flex flex-wrap min-h-[200px] items-center justify-center rounded-md border border-dashed border-slate-500 p-2 pb-10 overflow-hidden"
              >
                {photos.length > 1
                  ? Array.from(photos).map((photo) => (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={photo.name}
                        className="w-1/4 h-auto m-1"
                      />
                    ))
                  : null}
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  id="img"
                  onChange={(event) => {
                    setPhotos(event.target.files);
                    console.log(photos);
                  }}
                  multiple
                  className="absolute text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bottom-2"
                />
              </label>
            </div>
          </div>

          <div>
            <button
              onClick={submitPost}
              className="mx-auto hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
