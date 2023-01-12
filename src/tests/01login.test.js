import React from "react";
import { screen,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import App from "../App";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Login', () => {
  test(' mostra na pagina os campos de login ', () => {
    renderWithRouterAndRedux(<Login/>);
    const login = screen.getByText(/login/i)
    expect(login).toBeInTheDocument();
    const nome = screen.getByRole('heading', {
      name: /insira seu nome:/i
    })
    expect(nome).toBeInTheDocument();
    const mail = screen.getByRole('heading', {
      name: /insira seu email:/i
    })
    expect(mail).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();

    const name = screen.getByTestId('input-player-name');
    expect(name).toBeInTheDocument();

    const play = screen.getByRole('button', {
        name: /Play/i,
    })
    expect(play).toBeInTheDocument();


    const Configuração = screen.getByRole('button', {
      name: /Configuração/i
    });
    expect(Configuração).toBeInTheDocument();

    const inputPlaceholderEmail = screen.getByPlaceholderText(/digite aqui seu email/i);
    expect(inputPlaceholderEmail.type).toBe('email');
    expect(inputPlaceholderEmail).toBeInTheDocument();
  })

  test(' funcionalidade do button ', async() => {
    const {history} = renderWithRouterAndRedux(<App />); 
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const button = screen.getByRole('button', {
      name: /play/i,
    });
    expect(button.disabled).toBe(true);

    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(name, 'thiago');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  })

  test('button settings ', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const Configuração = screen.getByRole('button', {
      name: /Configuração/i
    });
    userEvent.click(Configuração)
    expect(history.location.pathname).toBe('/settings')
  })
})
