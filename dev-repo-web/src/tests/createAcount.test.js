import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./utils/renderWithRouter";
import { VALIDEMAIL, VALIDPASSWORD, NEWEMAIL } from "./mocks";
const mockApi = require('../services/api');


describe('Testes que avaliam o funcionamento da pagina de createAcount', () => {
  beforeEach(() => {
    localStorage.clear();
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('verifica se imagem e titulo são renderizados na tela', () => {
    renderWithRouter('/create');
    const img = screen.getByRole('img');
    const title = screen.getByRole('heading', {name: 'Sign up'});
    expect(title).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'imgLogin.png');
    expect(img).toHaveAttribute('alt', 'imagem acima do Sign up')
  });
  it('verifica se input de email existe e ao digitar "teste" o mesmo é atualizado', () => {
    renderWithRouter('/create');
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
  it('verifica se link sign in redireciona para a rota login', async() => {
    renderWithRouter('/create');
    const lingLogin =  screen.getByText('Já tem uma conta?');
    expect(lingLogin).toBeInTheDocument();
    userEvent.click(lingLogin)
    const title = await screen.findByRole('heading', {name: 'Login'});
    expect(title).toBeInTheDocument();
  })
  it('verifica se caso email já tenha um cadastro válido aparece uma mensagem informando "Usuário já cadastrado no sistema"', async () => {
    jest.spyOn(mockApi, 'createAcount')
    mockApi.createAcount.mockRejectedValue(new Error('422'));
    renderWithRouter('/create');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonCad = screen.getByRole('button', {name:'Cadastrar'})
    userEvent.type(inputEmail, VALIDEMAIL);
    userEvent.type(inputPassword, VALIDPASSWORD);
    userEvent.click(buttonCad);
    const alert = await screen.findByText('Usuário já cadastrado no sistema')
    expect(alert).toBeInTheDocument();
  })
  it('verifica se caso email e senha sejam válidos o usuário é redirecionado para a rota "/login"', async() => {
    jest.spyOn(mockApi, 'createAcount')
    mockApi.createAcount.mockReturnValue()
    renderWithRouter('/create');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonCad = screen.getByRole('button', {name:'Cadastrar'})
    userEvent.type(inputEmail, NEWEMAIL);
    userEvent.type(inputPassword, VALIDPASSWORD);
    userEvent.click(buttonCad);
    const titleLogin = await screen.findByText('Login')
    expect(titleLogin).toBeInTheDocument();
  });
  it('verifica se ocorra um erro no servidor ele retornará o mesmo na tela', async() => {
    jest.spyOn(mockApi, 'createAcount')
    mockApi.createAcount.mockRejectedValue(new Error('Erro no servidor'))
    renderWithRouter('/create');
    const inputEmail = screen.getByRole('textbox', {name: /email/i})
    const inputPassword = screen.getByLabelText(/password/i)
    const buttonCad = screen.getByRole('button', {name:'Cadastrar'})
    userEvent.type(inputEmail, NEWEMAIL);
    userEvent.type(inputPassword, VALIDPASSWORD);
    userEvent.click(buttonCad);
    const alert = await screen.findByText('Erro no servidor')
    expect(alert).toBeInTheDocument();
  });
})
