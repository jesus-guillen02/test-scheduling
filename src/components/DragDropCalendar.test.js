import React from 'react';
import { render, screen } from '@testing-library/react';
import DragDropCalendar from './DragDropCalendar';

test('renders drag and drop calendar without crashing', async () => {
  render(<DragDropCalendar />);

  // Assuming your calendar has a specific role or testid
  expect(await screen.findByRole('grid')).toBeInTheDocument();
});
