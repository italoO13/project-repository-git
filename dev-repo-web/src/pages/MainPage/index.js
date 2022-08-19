import React from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";

const MainPage = () => {

  const handleLogout = () => {
    
  }

  const handleSearch = (query) => {

  }
  const handleClear = () => {

  }

  const handleDeleteRepo = () => {

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
      <div className="repositories">
        <h2 className="title">Repositórios</h2>

        <ul className="list">
          <li className="item">
            <p>Titulo do repo</p>
            <p>tecnologia</p>
            <button onClick={handleDeleteRepo}>Apagar</button>
          </li>
        </ul>

        <div className="new">
          <label htmlFor="newRepo">Novo Repo:</label>
          <input type="url" name="newRepo" id="newRepo"/>
          <button>Adicionar</button>
        </div>
      </div>
    </div>
  )
}

export default MainPage;
