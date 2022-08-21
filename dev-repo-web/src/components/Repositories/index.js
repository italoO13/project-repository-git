import React, {useState} from "react";

const Repositories = ({repo, onDelete, onNewRepo, loadingError}) => {
  const [newRepo, setNewRepo] = useState('')

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

    <div className="new">
      <label htmlFor="newRepo">Novo Repo:</label>
      <input 
        type="url"
        name="newRepo"
        id="newRepo"
        onChange={({target}) => setNewRepo(target.value)}
        value={newRepo}
      />
      <button onClick={() => onNewRepo(newRepo)}>Adicionar</button>
    </div>
    {loadingError.status ==='repo' && (
      <div>
        {loadingError.message}
      </div>
    )}
  </div>
  )
}

export default Repositories;