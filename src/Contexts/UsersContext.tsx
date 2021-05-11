import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Users as UsersData} from '../data/ongs';

export const UsersContext = createContext({});

export const UsersProvider = ({children}: any) => {
  const [User, setUser] = useState(UsersData);
  const varToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZXJpZ2dzOTBAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJpYXQiOjE2MjA2NzU3MDksImV4cCI6MTYyMDc2MjEwOX0.LfqXtDtECwt9pZgjX9OdICvbzfdM-w_IJmdRbSlVvuNrkIrEx1JJexP1mOxzL8E6M8TBwLhglLvXsMZ5NjWEKg';
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
