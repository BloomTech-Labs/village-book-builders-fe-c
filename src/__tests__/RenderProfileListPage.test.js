import React from 'react';
// import RenderProfileListPage from "../components/pages/ProfileList/RenderProfileListPage"
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// test("loads a profile list", () => {
// 	const data = [ { id: "1234", name: "item" } ]
// 	const { getByText, debug } = render(
// 		<Router>
// 			<RenderProfileListPage data={data} />
// 		</Router>
// 	)
// 	const element = getByText(/item/i)
// 	expect(element.textContent).toBe(data[0].name)
// })

describe('Says Hello', () => {
  test('it should say hello', () => {
    const h1 = 'Hello';
    expect(h1).toBe('Hello');
  });
});
