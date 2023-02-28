import { useState } from "react";

import ChatWindow from "./ChatWindow";

import chatIco from "../../images/bubble-chat.png";
import closeIco from "../../images/close.png";

const ChatButton = () => {
  const [isShown, setIsShown] = useState(false);

  const toggleChatWindow = () => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <ChatWindow isShown={isShown} />
      <button
        onClick={toggleChatWindow}
        className="z-50 sticky drop-shadow-lg hover:bottom-10 bottom-8 flex left-8 rounded-full w-20 h-20 bg-blue-600 hover:bg-blue-700 duration-200 justify-center items-center"
      >
        {isShown ? (
          <img className=" w-10  h-10 invert" src={closeIco} alt="ico" />
        ) : (
          <img className=" w-12  h-12 invert" src={chatIco} alt="ico" />
        )}
      </button>
    </>
  );
};

export default ChatButton;
