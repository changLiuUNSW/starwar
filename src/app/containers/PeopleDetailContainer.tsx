import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Alert } from 'reactstrap';
import { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { filmActions } from '../stores/film/actions';
import { People } from '../models/People';
import { getFilmError, getFilmFilms, getFilmLoading, RootState } from '../stores';
import { Film } from '../models/Film';

const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

interface Props {
  item: People;
  toggle: () => void;
  load: (films: string[]) => void;
  films: Film[];
  error: string;
  loading: boolean;
}

const PeopleDetailContainer = ({ item, toggle, loading, films, error, load }: Props) => {
  useEffect(() => {
    if (item) {
      load(item.films);
    }
  }, [item, load]);

  return (
    <Modal isOpen={!!item} toggle={toggle}>
      <ModalHeader toggle={toggle}>People Detail</ModalHeader>
      <ModalBody>
        <h5>Basic Detail:</h5>
        <List>
          <li>
            <strong>Name</strong>: {item?.name}
          </li>
          <li>
            <strong>Birth Year</strong>: {item?.birth_year}
          </li>
          <li>
            <strong>Gender</strong>: {item?.gender}
          </li>
        </List>
        <h5>Film:</h5>
        {loading || !films ? (
          <Spinner color="primary" size="md" />
        ) : (
          <List>
            {films.map((film) => (
              <li>{film.title}</li>
            ))}
          </List>
        )}
        {error && <Alert color="danger">{error}</Alert>}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    films: getFilmFilms(state),
    loading: getFilmLoading(state),
    error: getFilmError(state),
  };
};

export default connect(mapStateToProps, {
  load: filmActions.load,
})(PeopleDetailContainer);
