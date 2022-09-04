const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const mockRepo = require('../../../models/Repo');
const Repo = require('../../../services/repo.service');
const { MOCK_REPO_ALL, MOCK_REPO } = require('../../mocks');
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Verifica as funções da camada de service do Repo', () =>{
  describe('Quando é requisitado todos os repositórios cadastrados atraves da função getRepoAll', () => {
    before(() => {
      sinon.stub(mockRepo, 'getRepoAll').resolves(MOCK_REPO_ALL)
    });
    after(() => {
      mockRepo.getRepoAll.restore();
    })
    
    it('deve retornar um array', async() => {
      const response = await Repo.getRepoAll();
      expect(response).to.be.an('array');
    });
    it('deve retornar um array de tamanho 3', async() => {
      const response = await Repo.getRepoAll();
      expect(response.length).to.be.equal(3);
    })
    it('deve retornar um array igual ao MOCK_REPO_ALL', async() => {
      const response = await Repo.getRepoAll();
      expect(response).to.be.equal(MOCK_REPO_ALL);
    })
  })
  describe('Quando é requisitado a criação de um novo repositório atraves da função createRepo', () => {
    before(() => {
      sinon.stub(mockRepo, 'createRepo').resolves(MOCK_REPO)
    });
    after(() => {
      mockRepo.createRepo.restore();
    })
    
    it('deve retornar um objeto', async() => {
      const response = await Repo.createRepo();
      expect(response).to.be.an('object');
    });
    it('deve retornar um array igual ao MOCK_REPO', async() => {
      const response = await Repo.createRepo();
      expect(response).to.be.equal(MOCK_REPO);
    })
  })
  describe('Quando é requisitado a exclusão  de um repositório atraves da função deleteRepo', () => {
    before(() => {
      sinon.stub(mockRepo, 'deleteRepo').resolves(true)
    });
    after(() => {
      mockRepo.deleteRepo.restore();
    })
    
    it('deve retornar um boleano igual a true', async() => {
      const response = await Repo.deleteRepo();
      expect(response).to.be.equal(true);
    });
  })
})