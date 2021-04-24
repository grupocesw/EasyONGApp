import {createContext} from 'react';
import {OngsContext as OngsContextType} from '../interfaces/Ong';

const OngsContext = createContext<OngsContextType>({
  Ongs: [],
  setOngs: () => {},
});

export default OngsContext;
