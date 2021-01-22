import { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import { People } from '../../models/People';
import PeopleTable from '../../components/PeopleTable';
import PeoplePagination from '../../components/PeoplePagination';
import PeopleDetail from '../PeopleDetail';

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

const PeopleList = ({ results, loading, error, init, hasPrevious, hasNext, prev, next }: Props) => {
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
      <PeopleDetail
        item={selectedItem}
        toggle={() => {
          setSelectedItem(null);
        }}
      />
    </>
  );
};

export default PeopleList;
