import { render, screen } from '@testing-library/react';
import ProfileImage from './ProfileImage';

test('renders learn react link', () => {
  render(<ProfileImage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
