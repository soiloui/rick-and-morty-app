export interface CharacterAPIResponse {
  info: APIResponseInfo;
  results: Character[];
}

export interface APIResponseInfo {
  count: number;
}

export interface Character {
  id: number;
  name: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  species: string;
  status: string;
  type: string;
  url: string;
  location: Location;
  origin: Origin;
}

export interface Location {
  name: string;
  url: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface LocationDetails {
  id: number;
  type: string;
  name: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
