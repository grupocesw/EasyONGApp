import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Users as UsersData} from '../data/ongs';

export const UsersContext = createContext({});

export const UsersProvider = ({children}: any) => {
  const [User, setUser] = useState(UsersData);
  return (
    <UsersContext.Provider
      value={{
        User,
        setUser,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
