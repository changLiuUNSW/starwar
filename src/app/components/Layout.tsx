import { Container, Navbar, NavbarBrand } from 'reactstrap';
import styled from 'styled-components';

const Main = styled(Container)`
  padding: 1.5rem 0;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <Navbar color="light" light>
      <NavbarBrand href="/">Star War</NavbarBrand>
    </Navbar>
    <Main tag="main">{children}</Main>
  </div>
);

export default Layout;
