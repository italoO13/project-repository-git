const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const repoService = require('../../../services/repo.service');
const repoController = require('../../../controllers/repo.controller');
const CustomError = require('../../../utils/customError');
const {MOCK_REPO, MOCK_REPO_ALL} = require('../../mocks/index')
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Verifica as funções da camada de controller do Repo', () => {

  describe('Quando é requisitado todos os repos cadastrados através da função getRepoAll', () => {
    describe('Quando ocorre um erro', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {userId: 1}
        sinon.stub(repoService, 'getRepoAll').resolves(new CustomError(500, 'Error intern in server'))
      });
      after(() => {
        repoService.getRepoAll.restore();
      })
      it('a requisitação deve enviar a mensagem para o next ', async() => {
        const next = sinon.stub().returns();
        await repoController.getRepoAll(request, response, next)
        expect(next.calledWith()).to.be.equal(true)
      });

    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {}
      before(() => {
        request.params = {userId: 1}
        request.query = {q:'teste'}
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(repoService, 'getRepoAll').resolves(MOCK_REPO_ALL)
      });
      after(() => {
        repoService.getRepoAll.restore();
      })
      it('deve ser retornado um array com as informações do MOCK_REPO_ALL', async() => {
        await repoController.getRepoAll(request, response, next)
        expect(response.json.calledWith(MOCK_REPO_ALL)).to.be.equal(true);
      })
      it('deve retornar um status 200 e os dados na variável MOCK_REPO_ALL', async() => {
        await repoController.getRepoAll(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    })
  })

  describe('Quando é requisitado a atualização de um repo através da função createRepo', () => {
    describe('Quando ocorre um erro imprevisto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {userId: 1}
        request.body = {name:'teste', url:'teste'}
        sinon.stub(repoService, 'createRepo').resolves(new CustomError(500, 'Error server'))
      });
      after(() => {
        repoService.createRepo.restore();
      })
      it('a função next deve ser executada', async() => {
        const next = sinon.stub().returns();
         await repoController.createRepo(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      });
    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {};
      before(() => {
        request.params = {userId: 1}
        request.body = {name:'teste', url:'teste'}
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(repoService, 'createRepo').resolves(MOCK_REPO)
      });
      after(() => {
        repoService.createRepo.restore();
      })
      it('deve retornar um status 201 e o novo repositorio cadastrado', async() => {
        await repoController.createRepo(request, response, next)
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(MOCK_REPO)).to.be.equal(true);
      })
    })
  })

  describe('Quando é requisitado a exclusão de um repo através da função deleterepo', () => {
    describe('Quando ocorre um erro imprevisto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {userId: 1, repoId:2}
        request.body = {name:'teste', url:'teste'}
        sinon.stub(repoService, 'deleteRepo').resolves(new CustomError(500, 'Error server'))
      });
      after(() => {
        repoService.deleteRepo.restore();
      })
      it('a função next deve ser executada', async() => {
        const next = sinon.stub().returns();
         await repoController.deleteRepo(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      });
    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {};
      before(() => {
        request.params = {userId: 1}
        request.body = {name:'teste', url:'teste'}
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(repoService, 'deleteRepo').resolves(MOCK_REPO)
      });
      after(() => {
        repoService.deleteRepo.restore();
      })
      it('deve retornar um status 200', async() => {
        await repoController.deleteRepo(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    })
  })

})