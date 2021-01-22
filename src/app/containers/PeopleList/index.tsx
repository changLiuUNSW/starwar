import { connect } from 'react-redux';
import {
  getPeopleError,
  getPeopleLoading,
  getPeopleNext,
  getPeoplePrevious,
  getPeopleResults,
  RootState,
} from '../../stores';
import { peopleActions } from '../../stores/people/actions';
import PeopleList from './PeopleList';

const mapStateToProps = (state: RootState) => {
  return {
    results: getPeopleResults(state),
    loading: getPeopleLoading(state),
    error: getPeopleError(state),
    hasPrevious: !!getPeoplePrevious(state),
    hasNext: !!getPeopleNext(state),
  };
};

export default connect(mapStateToProps, {
  init: peopleActions.init,
  prev: peopleActions.prev,
  next: peopleActions.next,
})(PeopleList);
