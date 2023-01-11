import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('App', () => {
  test('renderizar a tela', () => {
    renderWithRouterAndRedux(<App />);
  });
});