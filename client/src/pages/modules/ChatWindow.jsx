import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Axios from "axios";
import ArrowIcon from "../../svg/ArrowIcon";
import SendIcon from "../../svg/SendIcon";
import ChatMessageSection from "./ChatMessageSection";

const ChatWindow = (props) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [userList, setUserList] = useState(["Brak użytkowników"]);
  const [chatShown, setChatShown] = useState("");
  let [messageList, setMessageList] = useState();

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

  const fetchMessages = (user, chtter) => {
    Axios.get(`http://localhost:3002/getMessages/${user}=${chtter}`).then(
      (data) => {
        setMessageList(data.data);
      }
    );
  };

  const showChat = (user_login, id_user) => {
    setMessageList([]);
    if (chatShown === "" || chatShown !== user_login) {
      fetchMessages(cookies.userId, id_user);
      setChatShown(user_login);
    } else {
      setChatShown("");
      setMessageList([]);
    }
  };

  const sendMessage = (userId2) => {
    let message = null;
    let messageValue = document.getElementById(
      `${userId2}_message_value`
    ).value;

    if (messageValue) {
      message = {
        message: messageValue,
        time: Date.now(),
      };

      Axios.post(
        `http://localhost:3002/sendMessage/${cookies.userId}=${userId2}`,
        message
      ).then(fetchMessages(cookies.userId, userId2));
      document.getElementById(`${userId2}_message_value`).value = "";
    }
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
              return (
                <div key={user.user_Login}>
                  <div
                    className="relative z-20 flex items-center h-16 m-2 duration-500 bg-white rounded-md cursor-pointer drop-shadow-lg group/item"
                    onClick={() => {
                      showChat(user.user_Login, user.id_user);
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
                    {chatShown === user.user_Login ? (
                      <ChatMessageSection
                        id={`chat-with-${user.id_user}`}
                        user={user.id_user}
                        messageList={messageList}
                      />
                    ) : null}
                    <div className="absolute bottom-0 left-0 flex items-center w-full px-1 rounded-md bg-slate-800 h-1/9">
                      <input
                        id={`${user.id_user}_message_value`}
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
                </div>
              );
            })
          : null
        : null}
    </div>
  );
};

export default ChatWindow;
