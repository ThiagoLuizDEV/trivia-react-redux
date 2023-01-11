import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import App from "../App";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Login', () => {
  test(' mostra na pagina os campos de login ', () => {
    renderWithRouterAndRedux(<Login/>);
    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();

    const name = screen.getByTestId('input-player-name');
    expect(name).toBeInTheDocument();

    const button = screen.getByRole('button', {
        name: /Play/i,
    })
    expect(button).toBeInTheDocument();
  })
  test(' funcionalidade do button ', () => {
    const { history } = renderWithRouterAndRedux(<App />); 
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const button = screen.getByRole('button', {
      name: /play/i,
    });
    expect(button.disabled).toBe(true);

    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(name, 'ana');
    userEvent.click(button);
    expect(button.disabled).toBe(true);
  })
})
