import React, {
  useState,
  createContext,
  useContext,
} from 'react';
import {OngsContext as OngsContextType} from '../interfaces/Ong';

export const OngsContext = createContext<OngsContextType>({
  Ongs: [],
  setOngs: () => {},
  ongsSuggest: [],
  setOngsSuggest: () => {},
});

export const OngProvider = ({children}: any) => {
  const [Ongs, setOngs] = useState([]);
  const [ongsSuggest, setOngsSuggest] = useState([]);
  return (
    <OngsContext.Provider
      value={{
        Ongs,
        setOngs,
        ongsSuggest,
        setOngsSuggest,
      }}>
      {children}
    </OngsContext.Provider>
  );
};

export const useOng = (): OngsContextType => {
  return useContext(OngsContext);
};
