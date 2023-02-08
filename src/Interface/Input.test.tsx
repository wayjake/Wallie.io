import { render, screen } from '@testing-library/react';
import Input from './Input';

it('renders a testing message', () => {
  render(<Input />);
  expect(screen.getByText('I am')).toBeInTheDocument();
});
