import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import PeoplePagination from '../components/PeoplePagination';
import PeopleTable from '../components/PoepleTable';
import { People } from '../models/People';
import {
  getPeopleError,
  getPeopleLoading,
  getPeopleNext,
  getPeoplePrevious,
  getPeopleResults,
  RootState,
} from '../stores';
import { peopleActions } from '../stores/people/actions';
import PeopleDetailContainer from './PeopleDetailContainer';

interface Props {
  results: People[];
  error: string;
  loading: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  init: () => void;
  prev: () => void;
  next: () => void;
}

const PeopleContainer = ({ results, loading, error, init, hasPrevious, hasNext, prev, next }: Props) => {
  const [selectedItem, setSelectedItem] = useState<People>(null);
  useEffect(() => {
    init();
  }, [init]);

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <PeopleTable
        items={results}
        onRowClick={(item: People) => {
          setSelectedItem(item);
        }}
      />
      <PeoplePagination loading={loading} onPrev={hasPrevious ? prev : null} onNext={hasNext ? next : null} />
      <PeopleDetailContainer
        item={selectedItem}
        toggle={() => {
          setSelectedItem(null);
        }}
      />
    </>
  );
};

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
})(PeopleContainer);
