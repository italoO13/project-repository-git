const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockUser = require('../../../models/User');
const User = require('../../../services/user.service');
const { MOCK_USER, MOCK_TOKEN, MOCK_ENCODEPASSWORD } = require('../../mocks');
const { expect } = require('chai');
chai.use(chaiAsPromised)


describe('Verifica as funções da camada de service do User', () => {
  before(() => {
    sinon.stub(bcrypt, 'hash').resolves(MOCK_ENCODEPASSWORD)
  });
  after(() => {
    bcrypt.hash.restore();
  })
  describe('Quando é requisitado todos os usuários cadastrados atraves da função getUserAll', () => {
    before(() => {
      sinon.stub(mockUser, 'getUserAll').resolves(MOCK_USER)
    });
    after(() => {
      mockUser.getUserAll.restore();
    })
    it('Deve retornar um objeto',async() => {
      const response = await User.getUserAll();
      expect(response).to.be.an('object');
    })
    it('Deve conter as informações iguais ao MOCK_USER',async() => {
      const response = await User.getUserAll();
      expect(response).to.be.equal(MOCK_USER);
    })
  });
  describe('Quando é requisitado a criação de um novo usuário atraves da função createUser', () => {
    before(() => {
      sinon.stub(mockUser, 'createUser').resolves(MOCK_USER)
    });
    after(() => {
      mockUser.createUser.restore();
    })
    it('Deve retornar um objeto',async() => {
      const response = await User.createUser();
      expect(response).to.be.an('object');
    })
    it('Deve conter as informações iguais ao MOCK_USER',async() => {
      const response = await User.createUser();
      expect(response).to.be.equal(MOCK_USER);
    })
  });
  describe('Quando é requisitado as informações de um usuário através da função getUserById', () => {
    before(() => {
      sinon.stub(mockUser, 'getUserById').resolves(MOCK_USER)
    });
    after(() => {
      mockUser.getUserById.restore();
    })
    it('Deve retornar um objeto',async() => {
      const response = await User.getUserById();
      expect(response).to.be.an('object');
    })
    it('Deve conter as informações iguais ao MOCK_USER',async() => {
      const response = await User.getUserById();
      expect(response).to.be.equal(MOCK_USER);
    })
  });
  describe('Quando é requisitado a atualização do usuário através da função updateUser', () => {
    before(() => {
      sinon.stub(mockUser, 'updateUser').resolves(true)
    });
    after(() => {
      mockUser.updateUser.restore();
    })
    it('Deve retornar um boleano igual a true',async() => {
      const response = await User.updateUser();
      expect(response).to.be.equal(true);
    })
  });
  describe('Quando é requisitado a exclusão do usuário através da função deleteUser', () => {
    before(() => {
      sinon.stub(mockUser, 'deleteUser').resolves(true)
    });
    after(() => {
      mockUser.deleteUser.restore();
    })
    it('Deve retornar um boleano igual a true',async() => {
      const response = await User.deleteUser();
      expect(response).to.be.equal(true);
    })
  });
})