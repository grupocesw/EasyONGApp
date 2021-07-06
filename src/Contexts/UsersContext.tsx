import React, {
  createContext,
  useState,
  useContext,
  Dispatch
} from 'react';
import { Users as UsersData } from '../data/ongs';
import { IUser } from '../interfaces/User';

export interface IUserContext {
  User: IUser,
  Token: string,
  setToken: Dispatch<string>,
  setUser: Dispatch<IUser>,
}

export const UsersContext = createContext<IUserContext>({} as IUserContext);

export const UsersProvider = ({ children }: any) => {
  const [User, setUser] = useState<IUser>( UsersData as IUser );
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
