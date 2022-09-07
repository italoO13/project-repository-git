const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sessionService = require('../../../services/session.service');
const sessionController = require('../../../controllers/sessions.controller');
const CustomError = require('../../../utils/customError');
const {MOCK_AUTH_SESSION} = require('../../mocks/index')
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Verifica as funções do controller Session', () => {
  describe('Quando é requisitação a criação de uma nova sessão através da função createSession', () => {
    describe('se houver um erro na autenticação', () => {
      const response = {};
      const request= {};
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        sinon.stub(sessionService, 'authSession').resolves(new CustomError(401, 'User or password not found'))
      });
      after(() => {
        sessionService.authSession.restore();
      })
      it('a função next deve ser executada"', async() => {
        const next = sinon.stub().returns();
         await sessionController.createSession(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      })
    });
    describe('Quando o usuário é encontrado', () => {
      const response = {};
      const request= {};
      const dt = {
        user:{
          id: MOCK_AUTH_SESSION.id,
          email: 'italo@gmail.com'
        },
        token: MOCK_AUTH_SESSION.token,
      }
      const next = () => {}
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(sessionService, 'authSession').resolves(MOCK_AUTH_SESSION)
      });
      after(() => {
        sessionService.authSession.restore();
      })
      
      it('deve ser igual ao objeto em dt', async() => {
        await sessionController.createSession(request, response, next)
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
      it('é chamado o status com o código 201', async() => {
        await sessionController.createSession(request, response, next)
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
    })

  })



})