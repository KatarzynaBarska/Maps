
export interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id? : string;
}

export interface SimpleAdEntity { //to co wysyłam na frontend podczas wyszukiwania w metodzie .findAll
  id: string;
  lat: number;
  lon: number;
}

export interface AdEntity extends SimpleAdEntity { //zawiera pełen obiekt z wszystkimi danymi
  name: string;
  description: string;
  price: number;
  url: string;
}