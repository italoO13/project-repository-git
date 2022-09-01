import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./utils/renderWithRouter";
import { MOCKUSER, VALIDEMAIL, VALIDPASSWORD } from "./mocks";
const mockApi = require('../services/api');


describe('Testes que avaliam o funcionamento da pagina de Login', () => {
  beforeEach(() => {
    localStorage.clear();
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('verifica se imagem e titulo são renderizados na tela', () => {
    renderWithRouter('/login');
    const img = screen.getByRole('img');
    const title = screen.getByRole('heading', {name: 'Login'});
    expect(title).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'imgLogin.png');
    expect(img).toHaveAttribute('alt', 'imagem acima do login')
  });
  it('verifica se input de email existe e ao digitar "teste" o mesmo é atualizado', () => {
    renderWithRouter('/login');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, 'teste');
    expect(inputEmail).toHaveValue('teste')
  })
  it('verifica se input de password existe e ao digitar "teste" o mesmo é atualizado', () => {
    renderWithRouter('/login');
    const inputPassword = screen.getByLabelText(/password/i)
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, 'teste');
    expect(inputPassword).toHaveValue('teste')
  })
  it('verifica se link singUp redireciona para a rota create', async() => {
    renderWithRouter('/login');
    const linkSingIn =  screen.getByText('Não tem uma conta?');
    expect(linkSingIn).toBeInTheDocument();
    userEvent.click(linkSingIn)
    const title = await screen.findByRole('heading', {name: 'Sign up'});
    expect(title).toBeInTheDocument();
  })
  it('verifica se caso email e senha sejam incorretos aparece uma mensagem informando "Email ou senha incorretos"', async () => {
    jest.spyOn(mockApi, 'createSession')
    mockApi.createSession.mockRejectedValue(new Error('401'));
    renderWithRouter('/login');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonEntrar = screen.getByRole('button', {name:'Entrar'})
    userEvent.type(inputEmail, 'emailInvalido@gmail.com');
    userEvent.type(inputPassword, 'senhaInvalida');
    userEvent.click(buttonEntrar);
    const alert = await screen.findByText('Email ou senha inválidos')
    expect(alert).toBeInTheDocument();
  })
  it('verifica se caso email e senha sejam válidos o usuário é redirecionado para a rota "/"', async() => {
    jest.spyOn(mockApi, 'createSession')
    mockApi.createSession.mockReturnValue(MOCKUSER)
    renderWithRouter('/login');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonEntrar = screen.getByRole('button', {name:'Entrar'})
    userEvent.type(inputEmail, VALIDEMAIL);
    userEvent.type(inputPassword, VALIDPASSWORD);
    userEvent.click(buttonEntrar);
    const titleLogo = await screen.findByText('Sistem Repo')
    expect(titleLogo).toBeInTheDocument();
  });
  it('verifica se ocorra um erro no servidor ele retornará o mesmo na tela', async() => {
    jest.spyOn(mockApi, 'createSession')
    mockApi.createSession.mockRejectedValue(new Error('Erro no servidor'))
    renderWithRouter('/login');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonEntrar = screen.getByRole('button', {name:'Entrar'})
    userEvent.type(inputEmail, VALIDEMAIL);
    userEvent.type(inputPassword, VALIDPASSWORD);
    userEvent.click(buttonEntrar);
    const alert = await screen.findByText('Erro no servidor')
    expect(alert).toBeInTheDocument();
  });
})
