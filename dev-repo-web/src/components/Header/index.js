import React from "react";
import iconGit from '../../imgs/iconGit.png';
import iconLogout from '../../imgs/iconLogout.png';

const Header = ({onLogout}) => {

  return(
    <div className="header bg-secondary">
      <div className="container px-5 md:px-0 m-auto flex justify-between h-[80px]">
        <div className="logo flex items-center">
          <div className="w-[50px] mr-4">
            <img src={iconGit} className="w-full" alt="icone do git" />
          </div>
          <h1 className="repo text-white font-bold text-xl">Sistem Repo</h1>
        </div>
        <button
          data-testid='button_logout'
          onClick={onLogout} 
          className="logout flex relative items-center">
            <img className="mr-1 " src={iconLogout} alt="icone logout"/>
            <p className="text-white font-bold text-xl">Sair</p>
        </button>
      </div>
    </div>
  )
}

export default Header;