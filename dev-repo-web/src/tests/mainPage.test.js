import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./utils/renderWithRouter";
import { MOCKUSER, MOCKREPO } from "./mocks";
const mockApi = require('../services/api')


describe('Testes que avaliam o funcionamento da pagina principal (MainPage)', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(MOCKUSER.data.user.id));
    localStorage.setItem('token', JSON.stringify(MOCKUSER.data.token));
  })
  afterEach(() => {
    localStorage.clear();
  })
  describe('Header', () =>  {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(MOCKUSER.data.user.id));
      localStorage.setItem('token', JSON.stringify(MOCKUSER.data.token));
      jest.spyOn(mockApi, 'getRepositories').mockReturnValue([])
    })
    afterEach(() => {
      localStorage.clear();
    })
    it('verifica se imagem do git, titulo e botão para sair foram renderizados com sucesso', async() => {
      renderWithRouter('/login')
      const logoGit = await screen.findByRole('img', {name: 'icone do git'});
      const titleSistem =await  screen.findByRole('heading', {name: 'Sistem Repo'});
      const iconLogout = await screen.findByRole('img', {name: 'icone logout'});
      const textLogout = await screen.findByText('Sair');
      expect(logoGit).toBeInTheDocument();
      expect(titleSistem).toBeInTheDocument();
      expect(iconLogout).toBeInTheDocument();
      expect(textLogout).toBeInTheDocument();
    });
    it('Verifica se ao clicar em sair usuário é redirecionado para a pagina de login', async() => {
      renderWithRouter('/login');
      const buttonLogout = await screen.findByTestId('button_logout');
      expect(buttonLogout).toBeInTheDocument();
      userEvent.click(buttonLogout);
      const titleLogin = await screen.findByRole('heading', {name: 'Login'});
      expect(titleLogin).toBeInTheDocument();
    })
  })
  describe('Repositorios', () => {
    beforeEach(() =>{
      jest.spyOn(mockApi, 'getRepositories');
      jest.spyOn(mockApi, 'deleteRepository');
      jest.spyOn(mockApi, 'createRepositories'); 

    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('Verifica se os repositorios são carregados na tela na quantidade correta', async() => {
      mockApi.getRepositories.mockReturnValue(MOCKREPO)
      renderWithRouter('/login');
      const cards = await screen.findAllByRole('listitem')
      expect(cards.length).toBe(3)
    })
    it('Ao clicar para apagar um card a funçao deleteRepository é chamada', async() => {
      mockApi.getRepositories.mockReturnValue(MOCKREPO)
      renderWithRouter('/login');
      const button = await screen.findByTestId('btn-t630f6c57d1a75a66ff1cfe19')
      userEvent.click(button)
      expect(mockApi.deleteRepository).toHaveBeenCalledTimes(1)
    })
  })
  describe('Verifica funcionalidade de cadastro de novos repositorios', () => {
    beforeEach(() =>{
      jest.spyOn(mockApi, 'getRepositories').mockReturnValue(MOCKREPO);
      jest.spyOn(mockApi, 'getRepositories').mockReturnValueOnce(MOCKREPO);
      jest.spyOn(mockApi, 'createRepositories').mockReturnValue(); 
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('verifica se input foi renderizado e ao digitar a palavra "teste" funciona corretamente', async() => {
      renderWithRouter('/login');
      const inputNewRepo = await screen.findByPlaceholderText('Adicione um novo Repositório')
      expect(inputNewRepo).toBeInTheDocument();
      userEvent.type(inputNewRepo, 'teste');
      expect(inputNewRepo).toHaveValue('teste');
    })
    it('verifica se botão é renderizado na tela e se ao ser clicado chama a função createRepositories', async() => {
      renderWithRouter('/login');
      const inputNewRepo = await screen.findByPlaceholderText('Adicione um novo Repositório')
      const buttonNewRepo = await screen.findByRole('button', {name: 'Adicionar'});
      expect(buttonNewRepo).toBeInTheDocument();
      userEvent.type(inputNewRepo, 'https://github.com/italoO13/testeagoravaiasdasd')
      userEvent.click(buttonNewRepo);
      expect(mockApi.createRepositories).toHaveBeenCalledTimes(1)
    })
  })
  describe('Verifica funcionalidade de pesquisa de novos repositorios', () => {
    beforeEach(() =>{
      jest.spyOn(mockApi, 'getRepositories').mockReturnValue(MOCKREPO);
      jest.spyOn(mockApi, 'getRepositories').mockReturnValueOnce(MOCKREPO);
      jest.spyOn(mockApi, 'createRepositories').mockReturnValue(); 
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('verifica se input foi renderizado e ao digitar a palavra "teste" funciona corretamente', async() => {
      renderWithRouter('/login');
      const inputNewRepo = await screen.findByPlaceholderText('Pesquise o repositório')
      expect(inputNewRepo).toBeInTheDocument();
      userEvent.type(inputNewRepo, 'teste');
      expect(inputNewRepo).toHaveValue('teste');
    })
    it('verifica se botoes de procurar e limpar são renderizados na tela', async() => {
      renderWithRouter('/login');
      const buttonProcurar = await screen.findByRole('button', {name: 'Procurar'});
      expect(buttonProcurar).toBeInTheDocument();
      const buttonLimpar = await screen.findByRole('button', {name: 'Limpar'});
      expect(buttonLimpar).toBeInTheDocument();
    })
  })

})
