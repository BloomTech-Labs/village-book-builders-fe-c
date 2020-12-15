import React from 'react';
import { Router } from 'react-router-dom';

import VillageForm from '../components/pages/village/VillageForm';

import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from './test-utils';
// const history = createMemoryHistory()
// it("testing Village Form", () => {
// 	render(
// 		<Router history={history}>
// 			<VillageForm />
// 		</Router>
// 	)

// 	// expect(screen.getByText(/headmaster/i)).toBeInTheDocument()
// })

it('says hello', () => {
  const hi = 'hello';
  expect(hi).toBe('hello');
});
