import { render, screen } from '@testing-library/react';
import NewPostCard from './NewPostCard';

test('renders learn react link', () => {
  render(<NewPostCard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
