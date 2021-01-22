import { forkJoin, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Film } from '../models/Film';
import { PeopleResponse } from '../models/People';

export interface ApiService {
  initPeople(): Observable<PeopleResponse>;
  getPeopleByLink(link: string): Observable<PeopleResponse>;
  getFilmsByLinks(links: string[]): Observable<Film[]>;
}

export const apiService: ApiService = {
  initPeople: () => ajax.getJSON<PeopleResponse>('https://swapi.dev/api/people'),
  getPeopleByLink: (link: string) => ajax.getJSON<PeopleResponse>(link),
  getFilmsByLinks: (links: string[]) => forkJoin(links.map((link) => ajax.getJSON<Film>(link))),
};
