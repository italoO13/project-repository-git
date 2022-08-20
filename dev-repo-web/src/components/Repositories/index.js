import React, {useState} from "react";

const Repositories = ({repo, onDelete, onNewRepo}) => {
  const [newRepo, setNewRepo] = useState('')

  return(
    <div className="repositories">
    <h2 className="title">Repositórios</h2>

    <ul className="list">
      <li className="item">
        <p>Titulo do repo</p>
        <p>tecnologia</p>
        <button onClick={onDelete}>Apagar</button>
      </li>
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
  </div>
  )
}

export default Repositories;