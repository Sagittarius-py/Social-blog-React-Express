import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

export default function Toggle() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleClick = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (cookies.darkTheme === "true") {
      setCookie("darkTheme", false);
      localStorage.theme = "light";
    }
    if (cookies.darkTheme === "false") {
      setCookie("darkTheme", true);
      localStorage.theme = "dark";
    }
  };

  return (
    <div className="flex-col items-center justify-center lex ">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={cookies.darkTheme === "true" ? false : true}
            readOnly
          />
          <div
            onClick={() => {
              handleClick();
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"
          ></div>
        </label>
      </div>
    </div>
  );
}
