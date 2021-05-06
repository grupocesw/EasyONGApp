import React, {
  createContext,
  useState,
  useContext,
} from 'react';

export const FavoritesContext = createContext({});

export const FavoritesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState([]);

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
