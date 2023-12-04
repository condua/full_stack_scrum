import { render, screen } from '@testing-library/react';
import ExamList from './pages/teacher/ExamList.js' 

test('renders learn react link', () => {
  render(<ExamList />);
  const linkElement = screen.getByRole('button', 'delete-button');
  expect(linkElement).toBeInTheDocument();
});
