import { createContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  var [session, setSession] = useState({
    user_login: "",
    loggedIn: false,
    accessLvl: 0,
  });

  const signIn = (user_login, accessLvl) => {
    setSession({
      user_login: user_login,
      loggedIn: true,
      accessLvl: accessLvl,
    });
  };

  return (
    <SessionContext.Provider value={{ session, signIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
