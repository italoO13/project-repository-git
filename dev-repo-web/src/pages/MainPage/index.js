import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import NewRepo from "../../components/NewRepo";
import Repositories from "../../components/Repositories";
import Search from "../../components/Search";
import AuthContext from "../../contexts/auth";
import { getRepositories, deleteRepository, createRepositories } from "../../services/api";

const MainPage = () => {

  const {user: userId, logout} = useContext(AuthContext)
  const [ repo, setRepo ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState({
    status: '',
    message:'',
  })

  const loadRepo = async(query) => {
    try {
      setLoading(true);
      const response = await getRepositories(userId, query)
      setRepo(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoadingError({
        status:'critical',
        message:"Erro crítico ao carregar aplicação"
      });
    }
  }

  useEffect(() => {
    loadRepo();
  }, [])

  const handleLogout = () => {
    logout();
  }

  const handleSearch = async(query) => {
    try {
      await loadRepo(query);
    } catch (error) {
      console.log(error);
      setLoadingError({
        status:'critical',
        message:'Erro crítico ao carregar aplicação'
      })
    }

  }
  const handleClear = async() => {
    try {
      await loadRepo();
    } catch (error) {
      console.log(error);
      setLoadingError({
        status:'critical',
        message:'Erro crítico ao carregar aplicação'
      })
    }
  }

  const handleDeleteRepo = async(userId, repoId) => {
    await deleteRepository(userId, repoId)
    await loadRepo();
  }

  const handleNewRepo = async(newRepo) => {
    try {
      setLoadingError({
        status:'',
        message:''
      })
      await createRepositories(userId, newRepo);
      await loadRepo();
    } catch (error) {
      setLoadingError({
        status:'repo',
        message:"Repositório já existe, tente cadastrar novamente"
      })
    }
  }

  if(loadingError.status==='critical') {
    return(
      <div className="loading">
        {loadingError.message}<Link to="/login">Voltar</Link>
      </div>
    )
  }

  if(loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div className="">
      <Header 
        onLogout ={handleLogout}
      />
      <Search 
        onClear={handleClear}
        onSearch={handleSearch}
      />
      <Repositories
        repo={repo}
        onDelete={handleDeleteRepo}
        loadingError={loadingError}
      />
      <NewRepo 
        onNewRepo={handleNewRepo}
      />
    </div>
  )
}

export default MainPage;
