import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import NavBar from "./pages/modules/NavBar";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ChatButton from "./pages/modules/ChatButton";
import { useCookies } from "react-cookie";

import { SessionProvider } from "./context";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  if (
    localStorage.theme === "light" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="bg-white dark:bg-neutral-800 pt-8 min-h-screen">
      <SessionProvider>
        <NavBar />
        <Router>
          <Route path="/" exact render={(props) => <MainPage />} />
          <Route path="/createpost" render={(props) => <CreatePost />} />
          <Route path="/login" render={(props) => <Login />} />
          <Route path="/register" render={(props) => <Signup />} />
          <Route path="/post/:postId" render={(props) => <Post />} />
          <Route path="/profile/:id_user" render={(props) => <Profile />} />
          {cookies.accessLvl > 1 ? (
            <Route path="/adminPanel" render={(props) => <AdminPanel />} />
          ) : (
            <Route path="/adminPanel" render={(props) => <MainPage />} />
          )}
        </Router>
        <ChatButton />
      </SessionProvider>
    </div>
  );
};

export default App;
