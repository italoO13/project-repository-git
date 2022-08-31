import React from "react";
import clearRepo from '../../imgs/clearRepo.svg';

const Card = ({rep, onDelete}) => {

  return(
    <li className="item bg-primary drop-shadow-md p-1 px-5 rounded hover:bg-[#229F8B]">
      <div className="info">
        <div className="py-1">
          <p className="text-white font-medium">Usuário</p>
          <p className="px-2">{rep.name.split('/')[0]}</p>
        </div>
        <div className="py-1">
          <p className="text-white font-medium">Repo</p>
          <p className="px-2 ">{rep.name.split('/')[1]}</p>
        </div>
      </div>
      <button
        className="absolute top-3 right-3"
        onClick={() => onDelete(rep.userId,rep._id)}
        >
          <img className="w-[30px]" src={clearRepo} alt="Apagar Repo" />
      </button>
    </li>
  )

}

export default Card;