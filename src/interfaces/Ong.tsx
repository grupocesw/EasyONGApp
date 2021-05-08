export type Ong = {
  id: number;
  activated: Boolean;
  address: Object;
  causes: string[];
  cnpj: string;
  contacts: Array<Object>;
  description: string;
  moreInformations: string[];
  name: string;
  picture: {url: string};
};

export type Ongs = Ong[];

export type OngsContext = {
  Ongs: Ongs;
  setOngs: Function;
  ongsSuggest: Ongs;
  setOngsSuggest: Function;
};
