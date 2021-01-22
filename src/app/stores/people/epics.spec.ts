import { TestScheduler } from 'rxjs/testing';
import { PeopleResponse } from '../../models/People';
import { peopleActions } from './actions';
import { init, prev } from './epics';

describe('people epic', () => {
  let testScheduler: TestScheduler;

  const mockPeopleResponse = {
    count: 1,
    next: 'http://swapi.dev/api/people/?page=2',
    previous: null,
    results: [
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
    ],
  } as PeopleResponse;

  beforeEach(
    () =>
      (testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      }))
  );

  it('should dispatch success event if initPeople success', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: peopleActions.init(),
      }) as any;
      const dependencies = {
        initPeople: () =>
          cold('--a', {
            a: mockPeopleResponse,
          }),
      } as any;

      const output$ = init(action$, null, dependencies);
      expectObservable(output$).toBe('---a', {
        a: peopleActions.success(mockPeopleResponse),
      });
    });
  });

  it('should dispatch fail event if initPeople failed', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: peopleActions.init(),
      }) as any;
      const dependencies = {
        initPeople: () => cold('--#'),
      } as any;

      const output$ = init(action$, null, dependencies);
      expectObservable(output$).toBe('---a', {
        a: peopleActions.fail('Server Error - Retrieve people information failed'),
      });
    });
  });

  it('should not dispatch any event if previous is null in the store', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const state$ = hot('a', {
        a: {
          people: {
            previous: null,
          },
        },
      }) as any;

      const action$ = hot('-a', {
        a: peopleActions.prev(),
      }) as any;

      const dependencies = {
        getPeopleByLink: () =>
          cold('--a', {
            a: mockPeopleResponse,
          }),
      } as any;

      const output$ = prev(action$, state$, dependencies);
      expectObservable(output$).toBe('--');
    });
  });

  it('should dispatch success event if previous is not null in the store and getPeopleByLink request success', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const state$ = hot('a', {
        a: {
          people: {
            previous: 'http://swapi.dev/api/people/?page=1',
          },
        },
      }) as any;

      const action$ = hot('-a', {
        a: peopleActions.prev(),
      }) as any;

      const dependencies = {
        getPeopleByLink: () =>
          cold('--a', {
            a: mockPeopleResponse,
          }),
      } as any;

      const output$ = prev(action$, state$, dependencies);
      expectObservable(output$).toBe('---a', {
        a: peopleActions.success(mockPeopleResponse),
      });
    });
  });

  it('should dispatch fail event if previous is not null in the store but getPeopleByLink request failed', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const state$ = hot('a', {
        a: {
          people: {
            previous: 'http://swapi.dev/api/people/?page=1',
          },
        },
      }) as any;

      const action$ = hot('-a', {
        a: peopleActions.prev(),
      }) as any;

      const dependencies = {
        getPeopleByLink: () => cold('--#'),
      } as any;

      const output$ = prev(action$, state$, dependencies);
      expectObservable(output$).toBe('---a', {
        a: peopleActions.fail('Server Error - Retrieve people information failed'),
      });
    });
  });
});
