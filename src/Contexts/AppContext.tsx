import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import * as Data from '../data';

export const AppContext = createContext({});

export const AppProvider = ({children}: any) => {
  const [data, setData] = useState(Data);
  return (
    <AppContext.Provider
      value={{
        data,
        setData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
