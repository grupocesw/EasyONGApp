import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Users as UsersData} from '../data/ongs';

export const UsersContext = createContext({});

export const UsersProvider = ({children}: any) => {
  const [User, setUser] = useState(UsersData);
  const Token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvbGFzZ29sZHRlY0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W10sImlhdCI6MTYyMDI2NDc5NiwiZXhwIjoxNjIwMzUxMTk2fQ.Fb8okAUl7kY_2nBAm4-lR7OZ6Wd_Xe5KXDEnTyg8srUGxn2mEQaEeQkBZ3SuPBwqZmWBLv9-wmETC47ookuO8g';
  return (
    <UsersContext.Provider
      value={{
        User,
        Token,
        setUser,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
