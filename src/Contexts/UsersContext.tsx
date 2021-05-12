import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Users as UsersData} from '../data/ongs';

export const UsersContext = createContext({});

export const UsersProvider = ({children}: any) => {
  const [User, setUser] = useState(UsersData);
  const [Token, setToken] = useState('');
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
