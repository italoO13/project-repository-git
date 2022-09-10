const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const UserMock = require('../../../shemaModels/user.shemadb')
const RepoMock = require('../../../shemaModels/repo.shemadb')
const Repo = require('../../../models/Repo');
const { MOCK_REPO_ALL, MOCK_USER, MOCK_REPO } = require('../../mocks');
const { expect } = require('chai');
const { findById } = require('../../../shemaModels/user.shemadb');
chai.use(chaiAsPromised);


describe('Verifica as funções do model Repo', () => {
  describe('Quando é requisitado todos os repositórios através da função getRepoAll', () => {
    describe('Quando usuário não existe', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(null)
      });
      after(() => {
        UserMock.findById.restore();
      })
      it('Verifica se é retornado um erro com a mensagem "User not exists"', async() => {
        return expect(Repo.getRepoAll('564',null))
          .rejectedWith('User not exists');
      });
      it('Verifica se o código do erro é 422', () => {
        return expect(Repo.getRepoAll())
          .rejectedWith('User not exists')
          .to.eventually.have.property('code', 404);
      })

    });
    describe('Quando usuário existe e não é passado uma query', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER)
      });
      after(() => {
        UserMock.findById.restore();
      })
      describe('mas não possui nenhum repositório cadastrado', () => {
        before(() => {
          sinon.stub(RepoMock, 'find').resolves(null)
        });
        after(() => {
          RepoMock.find.restore();
        })

        it('deve retornar um erro com a mensagem "Repository not found"', async() => {
          return expect(Repo.getRepoAll())
            .rejectedWith('Repository not found');
        });
        it('deve retornar um erro com o código 422', async() => {
          return expect(Repo.getRepoAll())
            .rejectedWith('Repository not found')
            .to.eventually.have.property('code', 422)
        })
      })
      describe('possui pelo menos 1 repositório cadastrado', () => {
        before(() => {
          sinon.stub(RepoMock, 'find').resolves(MOCK_REPO_ALL)
        });
        after(() => {
          RepoMock.find.restore();
        })
        
        it('deve retornar um array', async() => {
          const response = await Repo.getRepoAll();
          expect(response).to.be.an('array')
        });
        it('o primeiro objeto do array deve conter pelo menos as chaves "_id", "name", "url", "userId" ', async() => {
          const response = await Repo.getRepoAll();
          expect(response[0]).to.have.property('_id');
          expect(response[0]).to.have.property('name');
          expect(response[0]).to.have.property('url');
          expect(response[0]).to.have.property('userId');
        })
      })
    });
  });
  describe('Quando é requisitado a criação de um novo repositório através da função createRepo', () => {
    describe('Quando usuário não existe', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(null)
      });
      after(() => {
        UserMock.findById.restore();
      })
      it('Verifica se é retornado um erro com a mensagem "User not exists"', async() => {
        return expect(Repo.getRepoAll('564',null))
          .rejectedWith('User not exists');
      });
      it('Verifica se o código do erro é 422', () => {
        return expect(Repo.getRepoAll())
          .rejectedWith('User not exists')
          .to.eventually.have.property('code', 404);
      })

    });
    describe('Quando usuário existe', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER)
      });
      after(() => {
        UserMock.findById.restore();
      })
      describe('mas a url do repositório já foi cadastrada', () => {
        before(() => {
          sinon.stub(RepoMock, 'find').resolves(MOCK_REPO_ALL)
          sinon.stub(RepoMock, 'create').resolves()
        });
        after(() => {
          RepoMock.find.restore();
          RepoMock.create.restore();
        })

        it('deve retornar um erro com a mensagem "Repository already exists"', async() => {
          return expect(Repo.createRepo())
            .rejectedWith('Repository already exists');
        });
        it('deve retornar um erro com o código 422', async() => {
          return expect(Repo.createRepo())
            .rejectedWith('Repository already exists')
            .to.eventually.have.property('code', 422)
        })
      })
      describe('repositório ainda não foi cadastrado', () => {
        before(() => {
          sinon.stub(RepoMock, 'find').resolves([])
          sinon.stub(RepoMock, 'create').resolves(MOCK_REPO)
        });
        after(() => {
          RepoMock.find.restore();
          RepoMock.create.restore();
        })
        
        it('deve retornar um objeto', async() => {
          const response = await Repo.createRepo();
          expect(response).to.be.an('object')
        });
        it(' deve conter pelo menos as chaves "_id", "name", "url", "userId" ', async() => {
          const response = await Repo.createRepo();
          expect(response).to.have.property('_id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('url');
          expect(response).to.have.property('userId');
        })
      })
    });
  })
  describe('Quando é requisitado a exclusão de um repositório através da função deleteRepo', () => {
    describe('Quando usuário não existe', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(null)
      });
      after(() => {
        UserMock.findById.restore();
      })
      it('Verifica se é retornado um erro com a mensagem "User not exists"', async() => {
        return expect(Repo.deleteRepo())
          .rejectedWith('User not exists');
      });
      it('Verifica se o código do erro é 404', () => {
        return expect(Repo.getRepoAll())
          .rejectedWith('User not exists')
          .to.eventually.have.property('code', 404);
      })

    });
    describe('Quando o usuário existe', () => {
      before(() => {
        sinon.stub(UserMock, 'findById').resolves(MOCK_USER)
      });
      after(() => {
        UserMock.findById.restore();
      })
      describe('mas o repositório não existe', () => {
        before(() => {
          sinon.stub(RepoMock, 'findById').resolves(null)
        });

        after(() => {
          RepoMock.findById.restore();
        });
        it('deve retorna um erro com a mensagem "Repository not exists"', async() => {
          return expect(Repo.deleteRepo())
            .rejectedWith('Repository not exists');
        })
        it('Verifica se o código do erro é 404', async() => {
          return expect(Repo.deleteRepo())
            .rejectedWith('Repository not exists')
            .to.eventually.have.property('code', 404);
        })
      })
      describe('quando o repositório existir', () => {
        before(() => {
          sinon.stub(RepoMock, 'findById').resolves(MOCK_REPO)
        });

        after(() => {
          RepoMock.findById.restore();
        });
        it('deve retornar um booleano true', async() => {
          const response = await Repo.deleteRepo();
          expect(response).to.be.equal(true);
        })

      })
    })
  })

})