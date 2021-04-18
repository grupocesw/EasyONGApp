import {useState} from 'react';
import {Favorites as FavoritesData} from './ongs';

const DataOngs = async () => {
  //return {Ongs, setOngs};
};

const DataFavorites = () => {
  const [Favorites, setFavorites] = useState(FavoritesData);
  return {Favorites, setFavorites};
};

export {DataOngs, DataFavorites};
