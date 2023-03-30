import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Axios from "axios";
import ArrowIcon from "../../svg/ArrowIcon";
import SendIcon from "../../svg/SendIcon";

const ChatWindow = (props) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [userList, setUserList] = useState(["Brak użytkowników"]);
  const [chatShown, setChatShown] = useState("");
  const [message, setMessage] = useState({
    message: "penis",
    time: Date.now(),
  });

  useEffect(() => {
    async function fetch() {
      Axios.get("http://localhost:3002/api/getUsers").then((data) => {
        var filteredUserList = [];
        data.data.map((user) => {
          if (user.user_Login !== cookies.user_login) {
            filteredUserList.push(user);
          }
          return null;
        });
        setUserList(filteredUserList);
      });
    }
    fetch();
  }, []);

  const showChat = (user_login) => {
    if (chatShown === "" || chatShown !== user_login) setChatShown(user_login);
    else setChatShown("");
  };

  const sendMessage = (userId2) => {
    setMessage({
      message: "penis",
      time: Date.now(),
    });
    Axios.post(
      `http://localhost:3002/sendMessage/${cookies.userId}=${userId2}`,
      message
    );
  };

  return (
    <div
      className={`flex-col pt-16 fixed top-0 left-0 ${
        props.isShown ? "w-2/6" : "w-0"
      } h-full bg-blue-600 z-50 duration-200 opacity-90 hover:opacity-100 `}
    >
      {userList.length > 1
        ? props.isShown
          ? userList.map((user) => {
              console.log(user);
              return (
                <>
                  <div
                    className="relative z-20 flex items-center h-16 m-2 duration-500 bg-white rounded-md cursor-pointer drop-shadow-lg group/item"
                    key={user.user_Login}
                    onClick={() => {
                      showChat(user.user_Login);
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(http://localhost:3002/images/${user.profilePic}`,
                      }}
                      className="w-20 h-full duration-500 bg-center bg-cover rounded-l-md group-hover/item:w-10/12 bg-clip-padding"
                    />
                    <h1 className="absolute px-2 py-1 ml-24 text-xl duration-300 rounded-md group-hover/item:text-white group-hover/item:bg-slate-800">
                      {user.user_Login}
                    </h1>
                    <ArrowIcon classNames="w-8 h-8 absolute right-11 rounded-lg opacity-0 group-hover/item:opacity-100 group-hover/item:bg-slate-800 duration-300" />
                  </div>
                  <div
                    className={` relative ${
                      chatShown === user.user_Login ? " h-96" : "invisible h-0"
                    } mx-2 bg-white z-0 duration-200 rounded-md`}
                  >
                    <div className="absolute bottom-0 left-0 flex items-center w-full px-1 rounded-md bg-slate-800 h-1/9">
                      <input
                        id={`${user.user_Login}_message_value`}
                        type="text"
                        className="w-full m-1 my-4 rounded shadow-inner h-5/6"
                      ></input>
                      <button
                        id={`${user.user_Login}_message_button`}
                        className="relative p-2 mx-auto bg-white rounded h-5/6 "
                        onClick={() => sendMessage(user.id_user)}
                      >
                        <SendIcon />
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : null
        : null}
    </div>
  );
};

export default ChatWindow;
