import { render, screen } from '@testing-library/react';
import { Film } from '../../models/Film';
import { People } from '../../models/People';
import PeopleDetail from './PeopleDetail';

it('PeopleDetail should show item and loading spinner when init', () => {
  const item = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'http://swapi.dev/api/people/1/',
    films: [
      'http://swapi.dev/api/films/1/',
      'http://swapi.dev/api/films/2/',
      'http://swapi.dev/api/films/3/',
      'http://swapi.dev/api/films/6/',
    ],
  } as People;
  const toggle = jest.fn();
  const load = jest.fn();
  render(<PeopleDetail item={item} toggle={toggle} load={load} loading={true} films={null} error={null} />);
  expect(screen.getAllByRole('list')[0].children[0].textContent).toContain(item.name);
  expect(screen.getAllByRole('list')[0].children[1].textContent).toContain(item.birth_year);
  expect(screen.getAllByRole('list')[0].children[2].textContent).toContain(item.gender);
  expect(screen.getByRole('status')).not.toBeNull();
  expect(load).toBeCalled();
});

it('PeopleDetail should show film after init successfully', () => {
  const item = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'http://swapi.dev/api/people/1/',
    films: [
      'http://swapi.dev/api/films/1/',
      'http://swapi.dev/api/films/2/',
      'http://swapi.dev/api/films/3/',
      'http://swapi.dev/api/films/6/',
    ],
  } as People;
  const toggle = jest.fn();
  const load = jest.fn();
  const films = [{ title: 'testFilm' }] as Film[];
  render(<PeopleDetail item={item} toggle={toggle} load={load} loading={false} films={films} error={null} />);
  expect(screen.getAllByRole('list')[1].children[0].textContent).toContain(films[0].title);
});

it('PeopleDetail should error after init failed', () => {
  const item = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'http://swapi.dev/api/people/1/',
    films: [
      'http://swapi.dev/api/films/1/',
      'http://swapi.dev/api/films/2/',
      'http://swapi.dev/api/films/3/',
      'http://swapi.dev/api/films/6/',
    ],
  } as People;
  const toggle = jest.fn();
  const load = jest.fn();
  const error = 'error';
  render(<PeopleDetail item={item} toggle={toggle} load={load} loading={false} films={null} error={error} />);
  expect(screen.getByRole('alert').textContent).toBe(error);
});
