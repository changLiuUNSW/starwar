import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { People } from '../../models/People';
import PeopleList from './PeopleList';
import { store } from '../../stores';

it('PeopleList should show error if error is not null', () => {
  const init = jest.fn();
  const prev = jest.fn();
  const next = jest.fn();
  render(
    <PeopleList
      results={null}
      error={'error'}
      loading={false}
      init={init}
      prev={prev}
      next={next}
      hasPrevious={true}
      hasNext={true}
    />
  );
  expect(screen.getByRole('alert').textContent).toBe('error');
});

it('PeopleList should render table and Pagination', () => {
  const init = jest.fn();
  const prev = jest.fn();
  const next = jest.fn();
  const results = [
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
  render(
    <Provider store={store}>
      <PeopleList
        results={results}
        error={null}
        loading={false}
        init={init}
        prev={prev}
        next={next}
        hasPrevious={true}
        hasNext={true}
      />
    </Provider>
  );

  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});



it('PeopleList should show people detail table row clicked', () => {
  const init = jest.fn();
  const prev = jest.fn();
  const next = jest.fn();
  const results = [
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
  render(
    <Provider store={store}>
      <PeopleList
        results={results}
        error={null}
        loading={false}
        init={init}
        prev={prev}
        next={next}
        hasPrevious={true}
        hasNext={true}
      />
    </Provider>
  );

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});