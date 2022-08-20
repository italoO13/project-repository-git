import React from "react";
import Header from "../../components/Header";
import Repositories from "../../components/Repositories";
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

  const handleNewRepo = (newRepo) => {

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
        repo={[]}
        onDelete={handleDeleteRepo}
        onNewRepo={handleNewRepo}
      />
    </div>
  )
}

export default MainPage;
