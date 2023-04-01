import Axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const ChatMessageSection = (props) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const messageList = props.messageList;

  return (
    <div className="relative flex flex-col overflow-x-hidden overflow-y-scroll h-8/9">
      {messageList
        ? messageList.map((message, key) => {
            if (message[0] === Number(cookies.userId) && message[0] > 0) {
              return (
                <div key={key} className="flex flex-wrap justify-end">
                  <div
                    key={key}
                    className="p-1 px-4 mx-2 my-2 ml-16 bg-blue-500 rounded-md w-fit right"
                  >
                    {message[1]}
                  </div>

                  <p className="flex flex-wrap justify-end w-full mr-2 -mt-2 text-xs text-gray-500">
                    {new Date(message[2]).toLocaleString("sv")}
                  </p>
                </div>
              );
            } else if (message[0] > 0) {
              return (
                <div key={key} className="">
                  <div className="p-1 px-4 mx-2 my-2 mr-16 rounded-md bg-zinc-500 w-fit">
                    {message[1]}
                  </div>

                  <p className="w-full ml-2 -mt-2 text-xs text-gray-500 ">
                    {new Date(message[2]).toLocaleString("sv")}
                  </p>
                </div>
              );
            }
            return null;
          })
        : null}
    </div>
  );
};

export default ChatMessageSection;
