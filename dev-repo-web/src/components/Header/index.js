import React from "react";

const Header = ({onLogout}) => {

  return(
    <div className="nav">
      <h1 className="repo">Sisrepo</h1>
      <button onClick={onLogout}>Sair</button>
    </div>
  )
}

export default Header;