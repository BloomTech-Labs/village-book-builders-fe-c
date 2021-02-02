import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { List } from '../components/common';

afterEach(() => {
  cleanup();
});

const getItemsData = jest.fn(() =>
  Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }])
);
const RenderItems = jest.fn(props =>
  props.data.map(item => <li key={item.id}>Item</li>)
);
