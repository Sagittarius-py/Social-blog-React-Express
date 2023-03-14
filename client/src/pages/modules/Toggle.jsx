import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);
  const [cookies, setCookie] = useCookies();
  const handleClick = () => {
    setEnabled(!enabled);
    setCookie("darkTheme", enabled);
    console.log(cookies);
  };

  return (
    <div className="flex-col items-center justify-center lex ">
      <div className="flex">
        <label class="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
              handleClick();
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
        </label>
      </div>
    </div>
  );
}
