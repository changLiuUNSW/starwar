import { PaginationItem, Pagination, PaginationLink, Spinner } from 'reactstrap';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const SpinnerWrapper = styled.div`
  margin-top: 0.2rem;
  margin-left: 1rem;
`;

interface Props {
  loading?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const PeoplePagination = ({ onNext, onPrev, loading }: Props) => (
  <Container>
    <Pagination aria-label="people table pagination">
      <PaginationItem disabled={loading || !onPrev}>
        <PaginationLink href="#" onClick={onPrev}>
          Previous
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={loading || !onNext}>
        <PaginationLink href="#" onClick={onNext}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
    {loading && (
      <SpinnerWrapper>
        <Spinner color="primary" size="md" />
      </SpinnerWrapper>
    )}
  </Container>
);

export default PeoplePagination;
