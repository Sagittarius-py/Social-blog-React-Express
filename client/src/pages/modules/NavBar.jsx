import Toggle from "./Toggle";
import React from "react";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, setCookies, removeCookie] = useCookies();

  function logOut() {
    removeCookie("user_login");
    removeCookie("loggedIn");
    removeCookie("accessLvl");
    removeCookie("userId");
  }

  return (
    <header className="fixed top-0 z-30 flex flex-wrap w-full py-4 text-sm sm:justify-start sm:flex-nowrap bg-slate-900 dark:bg-blue-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <a className="flex-none text-xl font-semibold text-zinc-50" href="/">
          Sagittarius Blog
        </a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
          <a
            className="font-medium text-blue-500 hover:text-blue-600  dark:text-white dark:hover:text-slate-400"
            href="/"
            aria-current="page"
          >
            Main Page
          </a>

          {cookies.loggedIn ? (
            <>
              <a
                className="font-medium text-gray-600 hover:text-gray-400  dark:text-black dark:hover:text-slate-800"
                href="/createpost"
              >
                Create Post
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-slate-800"
                href={`/profile/${cookies.userId}`}
              >
                My Profile
              </a>
              <a
                className="font-medium text-orange-500 hover:text-orange-400 dark:text-orange-600 dark:hover:text-orange-700"
                href="/"
                onClick={() => logOut()}
              >
                Log out
              </a>
              {cookies.accessLvl > 1 ? (
                <a
                  className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500"
                  href="/adminPanel"
                >
                  Admin Panel
                </a>
              ) : null}
            </>
          ) : (
            <>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="/register"
              >
                Sign-Up
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="/login"
              >
                Log-In
              </a>
            </>
          )}
          <Toggle />
        </div>
      </nav>
    </header>
  );
}
