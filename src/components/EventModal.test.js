import React from 'react';
import { render } from '@testing-library/react';
import EventModal from './EventModal';
import Modal from 'react-modal';

// Mocking react-modal
Modal.setAppElement = () => null;

test('renders event modal', () => {
  render(<EventModal isOpen={true} onClose={() => {}} onSave={() => {}} eventDetails={{}} />);
  // Add specific assertions here
});
