import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { People } from '../models/People';
import PeopleTable from './PeopleTable';

it('PeopleTable renders correctly', () => {
  const items = [
    {
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
    },
  ] as People[];
  const onRowClick = jest.fn();
  const tree = renderer.create(<PeopleTable items={items} onRowClick={onRowClick} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('PeopleTable should render item correctly', () => {
  const items = [
    {
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
    },
  ] as People[];
  const onRowClick = jest.fn();
  render(<PeopleTable items={items} onRowClick={onRowClick} />);
  expect(screen.getAllByRole('row')[1].children[0].textContent).toEqual(items[0].name);
  expect(screen.getAllByRole('row')[1].children[1].textContent).toEqual(items[0].height);
  expect(screen.getAllByRole('row')[1].children[2].textContent).toEqual(items[0].mass);
});

it('PeopleTable should trigger row click event when row is clicked', () => {
  const items = [
    {
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
    },
  ] as People[];
  const onRowClick = jest.fn();
  render(<PeopleTable items={items} onRowClick={onRowClick} />);
  fireEvent.click(screen.getAllByRole('row')[1]);
  expect(onRowClick).toBeCalled();
});

it('PeopleTable should show loading if no items', () => {
  const items = null;
  const onRowClick = jest.fn();
  render(<PeopleTable items={items} onRowClick={onRowClick} />);
  expect(screen.getAllByRole('row')[1].children[0].textContent).toEqual('loading...');
});
