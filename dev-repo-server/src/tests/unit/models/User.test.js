const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const UserMock = require('../../../shemaModels/user.shemadb')
const User = require('../../../models/User');
const { MOCK_USER_ALL, MOCK_USER } = require('../../mocks');
const { expect } = require('chai');
chai.use(chaiAsPromised);


describe('Verifica as funções do model User', () => {
  describe('Quando é requisitado todos os usuários cadastrados através da função getUserAll', () => {
    before(() => {
      sinon.stub(UserMock, 'find').resolves(MOCK_USER_ALL);
    });
    after(()=>{
      UserMock.find.restore();
    });

    it('Verifica se dados retornados são um array', async() => {
      const response = await User.getUserAll();
      expect(response).to.be.an('array');
    })
    it('Verifica se o array retorna possui um tamanho de 1', async() => {
      const response = await User.getUserAll();
      expect(response.length).to.be.equal(1);
    });
    it('Verifica se o primeiro elemeto do array possui as chaves "_id", "email", "createdAt" e "updatedAt"', async() => {
      const response = await User.getUserAll();
      expect(response[0]).to.have.property('_id');
      expect(response[0]).to.have.property('email');
      expect(response[0]).to.have.property('createdAt');
      expect(response[0]).to.have.property('updatedAt');
    });
  })
  describe('Quando é requisitado a criação de um novo usuário através da função createUsr', () => {
    describe('Quando já existe um usuário cadastrado com o email informado', () => {
      before(() =>{
        sinon.stub(UserMock, 'findOne').resolves(MOCK_USER);
        sinon.stub(UserMock, 'create').resolves();
      });
      after(() => {
        UserMock.findOne.restore()
        UserMock.create.restore()
      });

      it('Verifica se é retornado um erro com a mensagem "user /email/ already exists"', async() => {
        return expect(User.createUser(MOCK_USER.email, MOCK_USER.password))
          .rejectedWith(`User ${MOCK_USER.email} already exists`);
      });
      it('Verifica se o código do erro é 422', () => {
        return expect(User.createUser(MOCK_USER.email, MOCK_USER.password))
          .rejectedWith(`User ${MOCK_USER.email} already exists`)
          .to.eventually.have.property('code', 422);
      })
    })
    describe('Quando não existe um usuário cadastrado com o email informado', () => {
      before(() =>{
        sinon.stub(UserMock, 'findOne').resolves(null);
        sinon.stub(UserMock, 'create').resolves(MOCK_USER);
      });
      after(() => {
        UserMock.findOne.restore()
        UserMock.create.restore()
      });

      it('Retorna um objeto', async() => {
        const response = await User.createUser();
        expect(response).to.be.an('object');
      });
      it('O objeto possui as chaves "email", "_id", "createdAt" e "updatedAt"', async() => {
        const response = await User.createUser();
        expect(response).to.have.property('_id');
        expect(response).to.have.property('email');
        expect(response).to.have.property('createdAt');
        expect(response).to.have.property('updatedAt');
      });
    })
  })
  describe('Quando é requisitado um usuário por id através da função getUserById', () => {
    describe('Quando o usuário não foi encontrado', () => {

      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(null);
      });
      after(() => {
        UserMock.findById.restore()
      });

      it('deve retornar um erro com a mensagem "User not Found"', async() => {
        return expect(User.getUserById())
          .rejectedWith('User not Found');
      });
      it('deve retornar um erro com codigo 404', () => {
        return expect(User.getUserById())
          .rejectedWith('User not Found')
          .to.eventually.have.property('code', 404);
      });
    })
    describe('Quando o usuário foi encontrado', () => {

      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER);
      });
      after(() => {
        UserMock.findById.restore()
      });

      it('deve retornar um objeto', async() => {
        const response = await User.getUserById();
        expect(response).to.be.an('object');
      });
      it('deve possuir as chaves "email", "password", "_id", "createdAt", "updatedAt"', async() => {
        const response = await User.getUserById();
        expect(response).to.have.property('_id');
        expect(response).to.have.property('email');
        expect(response).to.have.property('createdAt');
        expect(response).to.have.property('updatedAt');
      });
    });
  })
  describe('Quando é requisitado uma atualização nas informações do usuário através da função updateUser', () => {
    describe('Quando o usuário não existe', () => {

      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(null);
        sinon.stub(UserMock, 'updateOne').resolves();
      });
      after(() => {
        UserMock.findById.restore()
        UserMock.updateOne.restore()
      });

      it('deve retornar um erro com a mensagem "User not Found"', async() => {
        return expect(User.getUserById())
          .rejectedWith('User not Found');
      });
      it('deve retornar um erro com codigo 404', () => {
        return expect(User.getUserById())
          .rejectedWith('User not Found')
          .to.eventually.have.property('code', 404);
      });
    });
    
    describe('Quando o usuário existe', () => {

      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER);
      });
      after(() => {
        UserMock.findById.restore()
      });

      it('deve retornar um boolean true', async() => {
        const response = await User.updateUser();
        expect(response).to.be.an('boolean');
        expect(response).to.be.equal(true);
      });
    })
  })

  describe('Quando é requisitado que o usuário deseja deletado através da função deleteUser', () => {
    describe('Quando o usuário não existe', () => {
      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(null);
      });
      after(() => {
        UserMock.findById.restore()
      });

      it('deve retornar um erro com a mensagem "User not Found"', async() => {
        return expect(User.deleteUser())
          .rejectedWith('User not Found');
      });
      it('deve retornar um erro com codigo 404', () => {
        return expect(User.deleteUser())
          .rejectedWith('User not Found')
          .to.eventually.have.property('code', 404);
      });
    })
    describe('Quando o usuário existe', () => {
      before(() =>{
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER);
      });
      after(() => {
        UserMock.findById.restore()
      });

      it('deve retornar um boolean true', async() => {
        const response = await User.deleteUser();
        expect(response).to.be.an('boolean');
        expect(response).to.be.equal(true);
      });
    })
  })

})