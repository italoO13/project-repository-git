const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const User = require('../../../shemaModels/user.shemadb')
const Session = require('../../../models/Session');
const { MOCK_USER } = require('../../mocks');
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Quando um novo usuário tenta iniciar uma sessão no sistem', () => {
  describe('Quando o email do usuário existe', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(MOCK_USER)
    })
    after(() => {
      User.findOne.restore()
    })
    it('Deve retornar um objeto', async() => {
      const response = await Session.userByEmail()
      expect(response).to.be.an('object');
    });
    it('deve um objeto com as chaves "_id" e password', async() => {
      const response = await Session.userByEmail();
      expect(response).to.have.property('_id')
      expect(response).to.have.property('password')
    })
  })
  describe('Quando o email não é encontrado no sistema' , () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(null)
    })
    after(() => {
      User.findOne.restore()
    })
    it('Deve enviar uma erro com a mensagem "User or Passowrd not Found"', async() => {
      return expect(Session.userByEmail())
        .rejectedWith('User or Passowrd not Found')
    })
    it('Deve enviar uma erro com um status 401', async() => {
      return expect(Session.userByEmail())
        .rejectedWith('User or Passowrd not Found')
        .to.eventually.have.property('code', 401)
    })
  });


})