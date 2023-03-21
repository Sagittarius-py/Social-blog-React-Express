import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Car1 from "../images/2.jpg";

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user_Login, setUser_Login] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const logIn = (event) => {
    event.preventDefault();
    console.log(user_Login);
    if (user_Login !== "") {
      Axios.get(
        `https://mysql-deploy.herokuapp.com/api/getUserNames/${user_Login}`
      ).then((data) => {
        if (data.data.length > 0) {
          if (data.data[0].password === password) {
            setCookie("user_login", data.data[0].user_login);
            setCookie("accessLvl", data.data[0].access_lvl);
            setCookie("userId", data.data[0].id_user);
            setCookie("loggedIn", true);

            history.push("/");
            window.location.reload(false);
          } else {
            alert("Bad password");
          }
        } else {
          alert("User with given name doesn't exist");
        }
      });
    }
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
            <h1 className="mb-1 text-2xl font-bold text-gray-800">
              Hello Again!
            </h1>
            <p className="mb-8 text-sm font-normal text-gray-600">
              Nice to see You again!
            </p>
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
                id="user_login"
                className="w-full pl-2 border-none outline-none "
                type="text"
                name="user_login"
                placeholder="E-mail"
                onChange={(e) => {
                  setUser_Login(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-12 border-2 rounded-2xl ">
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
            <button
              type="submit"
              className="block w-full py-2 mt-5 mb-2 font-semibold text-white transition-all duration-500 bg-indigo-600 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1"
              onClick={logIn}
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <a
                href="/register"
                className="ml-2 text-sm transition-all duration-500 cursor-pointer hover:text-blue-500 hover:-translate-y-1"
              >
                Don't have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
