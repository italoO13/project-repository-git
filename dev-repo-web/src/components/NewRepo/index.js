import React, {useState} from "react";

const NewRepo = ({onNewRepo}) => {

  const [newRepo, setNewRepo] = useState('')

  return(
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
  )
}

export default NewRepo;