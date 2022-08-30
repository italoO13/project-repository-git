import React from "react";
import Card from "../Card";

const Repositories = ({repo, onDelete, loadingError}) => {

  return(
    <div className="repositories">
    <h2 className="title">Repositórios</h2>

    <ul className="list">
      {
        repo.map((rep) => <Card 
          rep = {rep}
          onDelete = {onDelete}
        />)
      }
    </ul>
    {loadingError.status ==='repo' && (
      <div>
        {loadingError.message}
      </div>
    )}
  </div>
  )
}

export default Repositories;