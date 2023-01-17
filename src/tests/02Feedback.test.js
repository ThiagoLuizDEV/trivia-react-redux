import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando a página de Feedback', () => {

test('verifica se a tela de Feedback é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
 
    const tittle = screen.getByRole('heading', {
        name: /informações da pessoa jogadora:/i
      })
    expect(tittle).toBeInTheDocument();
    
    const image = screen.getByRole('heading', {
        name: /informações da pessoa jogadora:/i
      })
      expect(image).toBeInTheDocument();


 const buttonPlayAgain = screen.getByRole('button', {
    name: /play again/i
  })
 expect(buttonPlayAgain).toBeInTheDocument();

 const buttonRanking = screen.getByRole('button', {
    name: /ranking/i
  })
  expect(buttonRanking).toBeInTheDocument();

  });

})
