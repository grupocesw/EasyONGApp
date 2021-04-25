import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Favorites as FavoritesData} from '../data/ongs';

export const FavoritesContext = createContext({});

export const FavoritesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState(FavoritesData);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorite = () => {
  return useContext(FavoritesContext);
};
