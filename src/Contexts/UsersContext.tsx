import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Users as UsersData} from '../data/ongs';

export const UsersContext = createContext({});

export const UsersProvider = ({children}: any) => {
  const [User, setUser] = useState(UsersData);
  const [Token, setToken] = useState(
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvbGFzZ29sZHRlY0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImlhdCI6MTYyMDQ5ODIzMCwiZXhwIjoxNjIwNTg0NjMwfQ.SdJ3szUGBK1gakhEsAM-i83TfgIDGZvzYsH3S45FGeIReoHFASZ2KIcC8laDoWk6XYT7fA_bV681r0v8yCoOEw',
  );
  return (
    <UsersContext.Provider
      value={{
        User,
        Token,
        setToken,
        setUser,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
