import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ProfilPH from "../images/Profile.png";

import Car1 from "../images/1.jpg";
import background from "../images/bg_ph.jpg";

export default function Signup(props) {
  const [user_Login, setUser_Login] = useState("");
  const [user_Name, setUser_Name] = useState("");
  const [user_Surname, setUser_Surname] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [about, setAbout] = useState("");
  const [accessLVL, setAccess] = useState(0);
  const [photos, setPhotos] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState("");

  let history = useHistory();

  const submitUser = (event) => {
    const datadata = new FormData();

    datadata.append("user_login", user_Login);
    datadata.append("user_name", user_Name);
    datadata.append("user_surname", user_Surname);
    datadata.append("password", password);
    datadata.append("access_lvl", accessLVL);
    datadata.append("about", about);
    datadata.append("files", photos[0]);
    datadata.append("files", backgroundPhoto[0]);

    event.preventDefault();
    Axios.get(
      `https://mysql-deploy.herokuapp.com/api/getUsers/${user_Login}`
    ).then((data) => {
      if (data.data.length === 0) {
        if (password === confPassword && password.length > 0) {
          if (accessLVL > 0) {
            Axios.post(
              "https://mysql-deploy.herokuapp.com/api/createUser",
              datadata
            );
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
    <div className="flex h-screen ">
      <div
        className="items-center justify-around hidden w-full bg-center bg-no-repeat bg-cover lg:flex lg:w-1/2 login_img_section"
        style={{ backgroundImage: `url(${Car1})` }}
      ></div>
      <div className="flex items-center justify-center w-full space-y-8 bg-white lg:w-1/2">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="p-5 bg-white rounded-md shadow-2xl">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Welcome!</h1>

            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center px-8 py-2 mx-4 mb-8 border-2 border-gray-200 rounded-2xl">
                <h5>Profile Picture</h5>
                <img
                  src={
                    photos.length > 0
                      ? URL.createObjectURL(photos[0])
                      : ProfilPH
                  }
                  alt="profile_ph"
                  className="object-cover w-32 h-32 m-1 rounded-full"
                />
                <input
                  className="block text-sm text-gray-500 w-28 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
              <div className="flex flex-col items-center justify-center px-3 py-2 mb-8 ml-4 border-2 border-gray-200 rounded-2xl">
                <h5>Background Image</h5>
                <img
                  src={
                    backgroundPhoto.length > 0
                      ? URL.createObjectURL(backgroundPhoto[0])
                      : background
                  }
                  alt="profile_ph"
                  className="object-cover w-64 h-32 m-1 rounded-lg"
                />
                <input
                  className="block text-sm text-gray-500 w-28 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  type="file"
                  name="img"
                  accept="image/*"
                  id="imgBg"
                  onChange={(event) => {
                    setBackgroundPhoto(event.target.files);
                    console.log(event.target.files);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl">
              <input
                id="User_login"
                className="w-full pl-2 border-none outline-none "
                type="email"
                name="User_login"
                placeholder="E-mail"
                onChange={(e) => {
                  setUser_Login(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center mb-8 space-x-14">
              <div className="flex items-center w-1/2 py-2 border-2 rounded-2xl">
                <input
                  className="w-full pl-2 border-none outline-none"
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Name"
                  onChange={(e) => {
                    setUser_Name(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center w-1/2 py-2 border-2 rounded-2xl ">
                <input
                  className="w-full pl-2 border-none outline-none"
                  type="text"
                  name="user_surname"
                  id="user_surname"
                  placeholder="Surname"
                  onChange={(e) => {
                    setUser_Surname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mb-8 space-x-14">
              <div className="flex items-center w-1/2 py-2 border-2 rounded-2xl">
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
              <div className="flex items-center w-1/2 py-2 border-2 rounded-2xl ">
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
