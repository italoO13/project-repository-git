import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Repositories from "../../components/Repositories";
import Search from "../../components/Search";
import { getRepositories, deleteRepository } from "../../services/api";

const MainPage = () => {
  const USERID = '62fd35462f7c01b60898ba0a'
  const QUERY = ''

  const [ repo, setRepo ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false)

  const loadRepo = async() => {
    try {
      setLoading(true);
      const response = await getRepositories(USERID, QUERY)
      setRepo(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoadingError(true);
    }
  }

  useEffect(() => {
    loadRepo();
  }, [])

  const handleLogout = () => {
    
  }

  const handleSearch = (query) => {

  }
  const handleClear = () => {

  }

  const handleDeleteRepo = async(userId, repoId) => {
    await deleteRepository(userId, repoId)
    await loadRepo();
  }

  const handleNewRepo = (newRepo) => {

  }

  if(loadingError) {
    return(
      <div className="loading">
        Erro ao carregar os dados. <Link to="/login">Voltar</Link>
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
    <div>
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
        onNewRepo={handleNewRepo}
      />
    </div>
  )
}

export default MainPage;
