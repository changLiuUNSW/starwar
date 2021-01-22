import renderer from 'react-test-renderer';
import Layout from './Layout';

it('Layout renders correctly', () => {
  const tree = renderer.create(<Layout>test</Layout>).toJSON();
  expect(tree).toMatchSnapshot();
});
