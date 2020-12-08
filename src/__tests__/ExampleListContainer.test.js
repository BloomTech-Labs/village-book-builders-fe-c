import React from 'react';
import { render, act, cleanup, waitForElement } from '@testing-library/react';

// import ExampleListContainer from "../components/pages/ExampleList/ExampleListContainer"

// afterEach(() => {
// 	cleanup()
// 	jest.clearAllMocks()
// })

// jest.mock("../api", () => ({
// 	getExampleData: jest.fn(() => Promise.resolve([]))
// }))

// describe("<ExampleListContainer /> test suite", () => {
// 	test("container renders without crashing", async () => {
// 		await act(async () => {
// 			await render(<ExampleListContainer />)
// 		})
// 	})
// })

describe('Says Hello', () => {
  test('it should say hello', () => {
    const h1 = 'Hello';
    expect(h1).toBe('Hello');
  });
});
