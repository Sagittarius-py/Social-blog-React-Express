import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import Car1 from "../images/1.jpg";

export default function Signup(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [about, setAbout] = useState("");
  const [accessLVL, setAccess] = useState(0);
  const [photos, setPhotos] = useState("");

  let history = useHistory();

  const submitUser = (event) => {
    const datadata = new FormData();

    datadata.append("username", userName);
    datadata.append("password", password);
    datadata.append("access_lvl", accessLVL);
    datadata.append("about", about);

    for (let i = 0; i < photos.length; i++) {
      datadata.append("profilePic", photos[i]);
    }

    // event.preventDefault();
    Axios.get(`http://localhost:3002/api/getUsers/${userName}`).then((data) => {
      if (data.data.length === 0) {
        if (password === confPassword && password.length > 0) {
          if (accessLVL > 0) {
            Axios.post("http://localhost:3002/api/createUser", datadata);
            history.push("/login");
          } else {
            alert("You have to choose any access level");
          }
        } else {
          alert("Passwords aren't the same!");
        }
      } else {
        alert("User with this user name already exists");
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div
        className="items-center justify-around hidden w-full bg-center bg-no-repeat bg-cover lg:flex lg:w-1/2 login_img_section"
        style={{ backgroundImage: `url(${Car1})` }}
      ></div>
      <div className="flex items-center justify-center w-full space-y-8 bg-white lg:w-1/2">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="p-5 bg-white rounded-md shadow-2xl">
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Welcome!</h1>
            <p className="mb-8 text-sm font-normal text-gray-600">
              We are happy to meet You!
            </p>
            <div className="flex items-center px-3 py-2 mb-8 ">
              <input
                className=""
                type="file"
                name="img"
                accept="image/*"
                id="img"
                onChange={(event) => {
                  setPhotos(event.target.files);
                  console.log(event.target.files);
                }}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="Username"
                className="w-full pl-2 border-none outline-none "
                type="text"
                name="Username"
                placeholder="User name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="w-full pl-2 border-none outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="w-full pl-2 border-none outline-none"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl ">
              <textarea
                className="w-full pl-2 border-none outline-none"
                placeholder="Tell something about Yourself"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-12 border-2 rounded-2xl ">
              <select
                placeholder="Access Level"
                className="w-full pl-2 border-none outline-none"
                onChange={(e) => {
                  setAccess(e.target.value);
                }}
              >
                <option value="0">Choose access level</option>
                <option value="1">Normal User</option>
                <option value="2">Privilage User</option>
                <option value="3">Admin</option>
              </select>
            </div>

            <button
              className="block w-full py-2 mt-5 mb-2 font-semibold text-white transition-all duration-500 bg-indigo-600 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1"
              onClick={submitUser}
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
