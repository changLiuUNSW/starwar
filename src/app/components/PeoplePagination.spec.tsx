import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PeoplePagination from './PeoplePagination';

it('PeoplePagination renders correctly', () => {
  const tree = renderer.create(<PeoplePagination />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('PeoplePagination should show spinner and disable both buttons if loading', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();
  render(<PeoplePagination loading={true} onNext={onNext} onPrev={onPrev} />);
  expect(screen.getAllByRole('listitem')[0]).toHaveClass('disabled');
  expect(screen.getAllByRole('listitem')[1]).toHaveClass('disabled');
  expect(screen.getByRole('status')).not.toBeNull();
});

it('PeoplePagination both button should be called if not loading', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();
  render(<PeoplePagination loading={false} onNext={onNext} onPrev={onPrev} />);
  fireEvent.click(screen.getByText('Previous'));
  fireEvent.click(screen.getByText('Next'));
  expect(onPrev).toHaveBeenCalled();
  expect(onNext).toHaveBeenCalled();
});
