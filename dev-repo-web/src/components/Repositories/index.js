import React from "react";
import Card from "../Card";

const Repositories = ({repo, onDelete, loadingError}) => {

  return(
    <div className="repositories container max-w-5xl m-auto px-2 md:px-6">
    <h2 className="title mt-8 mb-3">Repositórios</h2>

    <ul className="list grid grid-cols-2 gap-2">
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