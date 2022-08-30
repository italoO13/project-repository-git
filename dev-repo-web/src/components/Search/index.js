import React, {useState} from "react";

const Search = ({onClear, onSearch}) => {
  const [ query, setQuery] = useState('')

  const handleClean = () => {
    setQuery('');
    onClear('');
  }

  return(
    <div className="search flex max-w-6xl m-auto mt-10 items-center flex-wrap	">
    <input 
      className="drop-shadow-md border py-2 px-3 flex-1
      focus:outline-none text-gray-700
      focus:ring focus:outline-primary"
      placeholder="Pesquise o repositório"
      type="text"
      name="query" 
      id="query" 
      value={query}
      onChange={({target}) => setQuery(target.value)}
    />
    <button
      onClick={() => onSearch(query)}
      className="drop-shadow-md bg-primary text-white py-2 px-16 ml-2 rounded hover:bg-[#229F8B]"
      >
        Procurar
    </button>
    <button
      onClick={handleClean}
      className="drop-shadow-md bg-primary text-white py-2 px-16 ml-1 rounded hover:bg-[#229F8B]"
    >
      Limpar
    </button>
  </div>
  )
}

export default Search