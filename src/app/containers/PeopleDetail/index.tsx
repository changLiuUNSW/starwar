import { connect } from 'react-redux';
import { filmActions } from '../../stores/film/actions';
import { getFilmError, getFilmFilms, getFilmLoading, RootState } from '../../stores';
import PeopleDetail from './PeopleDetail';

const mapStateToProps = (state: RootState) => {
  return {
    films: getFilmFilms(state),
    loading: getFilmLoading(state),
    error: getFilmError(state),
  };
};

export default connect(mapStateToProps, {
  load: filmActions.load,
})(PeopleDetail);
