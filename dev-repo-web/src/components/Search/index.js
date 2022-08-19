import React, {useState} from "react";

const Search = ({onClear, onSearch}) => {
  const [ query, setQuery] = useState('')

  return(
    <div className="search">
    <label htmlFor="query">Procurar: </label>
    <input 
      type="search"
      name="query" 
      id="query" 
      value={query}
      onChange={({target}) => setQuery(target.value)}
    />
    <button onClick={() => onSearch(query)}>Procurar</button>
    <button onClick={onClear}>Limpar</button>
  </div>
  )
}

export default Search