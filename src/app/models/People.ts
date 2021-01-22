export interface People {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
  films: string[];
}

export interface PeopleResponse {
  next: string;
  previous: string;
  results: People[];
}
