export type Ong = {
  id: number;
  activated: Boolean;
  address: {city: string; state: string};
  causes: string[];
  favorited: boolean;
  cnpj: string;
  contacts: Array<Object>;
  description: string;
  moreInformations: string[];
  name: string;
  picture: {url: string};
  pictures: {url: string}[];
};

export type Ongs = Ong[];

export type OngsContext = {
  Ongs: Ongs;
  setOngs: Function;
  ongsSuggest: Ongs;
  setOngsSuggest: Function;
};
