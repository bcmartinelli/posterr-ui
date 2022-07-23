import { render, screen } from '@testing-library/react';
import CardPost from './CardPost';

test('renders learn react link', () => {
  render(<CardPost />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
