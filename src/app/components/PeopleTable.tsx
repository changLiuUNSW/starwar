import { Table } from 'reactstrap';
import styled from 'styled-components';
import { People } from '../models/People';

const TR = styled.tr`
  cursor: pointer;
`;

interface Props {
  items: People[];
  onRowClick: (item: People) => void;
}

const PeopleTable = ({ items, onRowClick }: Props) => {
  return (
    <div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {items?.length ? (
            items.map((item) => (
              <TR
                key={item.url}
                onClick={() => {
                  onRowClick(item);
                }}
              >
                <td>{item.name}</td>
                <td>{item.height}</td>
                <td>{item.mass}</td>
              </TR>
            ))
          ) : (
            <tr>
              <td colSpan={3}>loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PeopleTable;
