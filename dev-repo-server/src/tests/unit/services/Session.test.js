const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sessionModel = require('../../../models/Session')
const sessionServices = require('../../../services/session.service.js');
const { MOCK_USER, MOCK_TOKEN } = require('../../mocks');
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Verifica as funções da camada de service da Session', () => {
  before(() => {
    sinon.stub(sessionModel, 'userByEmail').resolves(MOCK_USER);
  })
  after(() => {
    sessionModel.userByEmail.restore()
  })
  describe('Quando é requisitado a criação de uma nova Session através da função authSession', () => {
    describe('mas o Usuário ou senha não existem', () => {
      before(() => {
        sinon.stub(bcrypt, 'compare').resolves(false);
      })
      after(() => {
        bcrypt.compare.restore();
      })
      it('deve retornar um erro com a menssagem "User or password not found"', async() => {
        return expect(sessionServices.authSession('italo@gmail.com', 'secret'))
          .rejectedWith('User or password not found')
      })
      it('deve retornar um erro com o codigo 401', () => {
        return expect(sessionServices.authSession('italo@gmail.com', 'secret'))
        .rejectedWith('User or password not found')
        .to.eventually.have.property('code', 401)
      })


    });
    describe('o usuário e senha existem', () => {
      before(() => {
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'sign').returns(MOCK_TOKEN)
      })
      after(() => {
        bcrypt.compare.restore();
        jwt.sign.restore();
      })
      it('Verifica se o retorno da função é um objeto', async() => {
        const response = await sessionServices.authSession();
        expect(response).to.be.an('object');
      })
      it('Verifica se o objeto possui das chaves id e token', async() => {
        const response = await sessionServices.authSession();
        expect(response).to.have.property('id')
        expect(response).to.have.property('token')
      });
    })
  })
});