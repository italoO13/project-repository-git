const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const userService = require('../../../services/user.service');
const userController = require('../../../controllers/user.controller');
const CustomError = require('../../../utils/customError');
const {MOCK_USER_ALL, MOCK_USER} = require('../../mocks/index')
const { expect } = require('chai');
chai.use(chaiAsPromised)

describe('Verifica as funções da camada do controller User', () => {
  describe('Quando é requisitado todos os usuários cadastrados através da função getUserAll', () => {
    describe('Quando ocorre um erro', () => {
      const response = {};
      const request= {};
      before(() => {
        sinon.stub(userService, 'getUserAll').resolves(new CustomError(500, 'Error intern in server'))
      });
      after(() => {
        userService.getUserAll.restore();
      })
      it('a requisitação deve enviar a mensagem para o next ', async() => {
        const next = sinon.stub().returns();
        await userController.getUserAll(request, response, next)
        expect(next.calledWith()).to.be.equal(true)
      });

    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {}
      before(() => {
        request.body = {}
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(userService, 'getUserAll').resolves(MOCK_USER_ALL)
      });
      after(() => {
        userService.getUserAll.restore();
      })
      it('deve ser retornado um array de tamanho 1', async() => {
        await userController.getUserAll(request, response, next)
        expect(response.json.calledWith(MOCK_USER_ALL)).to.be.equal(true);
      })
      it('deve retornar um status 200 e os dados na variável MOCK_USER_ALL', async() => {
        await userController.getUserAll(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    })
  })
  describe('Quando é requisitado a criação de um novo usuário através da função createUser', () => {
    describe('Quando ocorre um erro', () => {
      const response = {};
      const request= {};
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        sinon.stub(userService, 'createUser').resolves(new CustomError(422, 'User already exists'))
      });
      after(() => {
        userService.createUser.restore();
      })
      it('a requisitação deve enviar a mensagem para o next ', async() => {
        const next = sinon.stub().returns();
        await userController.createUser(request, response, next)
        expect(next.calledWith()).to.be.equal(true)
      });

    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {}
      before(() => {
        request.body = {}
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        sinon.stub(userService, 'createUser').resolves(MOCK_USER)
      });
      after(() => {
        userService.createUser.restore();
      })
      it('deve retornar um status 200 e os dados na variável MOCK_USER', async() => {
        await userController.createUser(request, response, next)
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(MOCK_USER)).to.be.equal(true);
      })
    })
  })

  describe('Quando é requisitado a atualização de um usuário através da função updateUser', () => {
    describe('Quando ocorre um erro imprevisto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'updateUser').resolves(new CustomError(500, 'Error server'))
      });
      after(() => {
        userService.updateUser.restore();
      })
      it('a função next deve ser executada', async() => {
        const next = sinon.stub().returns();
         await userController.updateUser(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      });
    })
    describe('Quando ocorre um erro previsto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'updateUser').resolves(null)
      });
      after(() => {
        userService.updateUser.restore();
      })
      it('a requisitação deve enviar um erro de status 500 ', async() => {
        const next = sinon.stub().returns();
        await userController.updateUser(request, response, next)
        expect(response.status.calledWith(500)).to.be.equal(true);
      });
      it('a requisitação deve enviar um erro com a mensagem "Error server" ', async() => {
        const next = sinon.stub().returns();
        await userController.updateUser(request, response, next)
        expect(response.json.calledWith({message: "Error server"})).to.be.equal(true);
      });
    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {};
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns()
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'updateUser').resolves(MOCK_USER)
      });
      after(() => {
        userService.updateUser.restore();
      })
      it('deve retornar um status 200 e uma mensagem ""', async() => {
        await userController.updateUser(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith({message:'successfully updated'})).to.be.equal(true);
      })
    })
  })
  describe('Quando é requisitado as infos de um usuário através da função getUserById', () => {
    describe('Quando ocorre um erro', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'getUserById').resolves(new CustomError(500, 'Error server'))
      });
      after(() => {
        userService.getUserById.restore();
      })
      it('a função next deve ser executada', async() => {
        const next = sinon.stub().returns();
         await userController.getUserById(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      });
    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {};
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns()
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'getUserById').resolves(MOCK_USER)
      });
      after(() => {
        userService.getUserById.restore();
      })
      it('deve retornar um status 200 e os dados do usuário', async() => {
        await userController.getUserById(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(MOCK_USER)).to.be.equal(true);
      })
    })
  })

  describe('Quando é requisitado a exclusão de um usuário através da função deleteUser', () => {
    describe('Quando ocorre um erro imprevisto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'deleteUser').resolves(new CustomError(500, 'Error server'))
      });
      after(() => {
        userService.deleteUser.restore();
      })
      it('a função next deve ser executada', async() => {
        const next = sinon.stub().returns();
         await userController.deleteUser(request, response, next)
         expect(next.calledWith()).to.be.equal(true)
      });
    })
    describe('Quando ocorre um erro previsto', () => {
      const response = {};
      const request= {};
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        response.status = sinon.stub().returns(response)
        response.json = sinon.stub().returns()
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'deleteUser').resolves(null)
      });
      after(() => {
        userService.deleteUser.restore();
      })
      it('a requisitação deve enviar um erro de status 500 ', async() => {
        const next = sinon.stub().returns();
        await userController.deleteUser(request, response, next)
        expect(response.status.calledWith(500)).to.be.equal(true);
      });
      it('a requisitação deve enviar um erro com a mensagem "Error server" ', async() => {
        const next = sinon.stub().returns();
        await userController.deleteUser(request, response, next)
        expect(response.json.calledWith({message: "Error server"})).to.be.equal(true);
      });
    })
    
    describe('Quando a função é executada com sucesso', () => {
      const response = {};
      const request= {};
      const next = () => {};
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns()
      before(() => {
        request.body = {
          email: 'italo@gmail.com',
          password: 'password'
        }
        request.params = {
          id: '1asdasdasdasdsadas'
        }
        sinon.stub(userService, 'deleteUser').resolves(MOCK_USER)
      });
      after(() => {
        userService.deleteUser.restore();
      })
      it('deve retornar um status 200 e uma mensagem ""', async() => {
        await userController.deleteUser(request, response, next)
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith({message:'successfully delete'})).to.be.equal(true);
      })
    })
  })
})
