import React, {useState} from "react";
import NewRepo from "../NewRepo";

const Repositories = ({repo, onDelete, onNewRepo, loadingError}) => {

  return(
    <div className="repositories">
    <h2 className="title">Repositórios</h2>

    <ul className="list">
      {
        repo.map((rep) => <li key={rep._id} className="item">
          <div className="info">
            <p>{rep.name.split('/')[0]}</p>
            <p>{rep.name.split('/')[1]}</p>
          </div>
          <button onClick={() => onDelete(rep.userId,rep._id)}>Apagar</button>
        </li>)
      }
      {/* <li className="item">
        <p>Titulo do repo</p>
        <p>tecnologia</p>
        <button onClick={onDelete}>Apagar</button>
      </li> */}
    </ul>

      <NewRepo 
        onNewRepo={onNewRepo}
      />
    {loadingError.status ==='repo' && (
      <div>
        {loadingError.message}
      </div>
    )}
  </div>
  )
}

export default Repositories;