import React, {useState} from "react";

const Search = ({onClear, onSearch}) => {
  const [ query, setQuery] = useState('')

  const handleClean = () => {
    setQuery('');
    onClear('');
  }

  return(
    <div className="px-2 md:px-6 search flex max-w-5xl m-auto mt-10 items-center flex-wrap	">
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
    <div className="m-auto">
      <button
        onClick={() => onSearch(query)}
        className="drop-shadow-md bg-primary text-white py-2 px-10 md:px-16 md:ml-2 rounded hover:bg-[#229F8B]"
        >
          Procurar
      </button>
      <button
        onClick={handleClean}
        className="drop-shadow-md bg-primary text-white py-2 px-10 md:px-16 ml-2 mt-3 md:ml-1 md:mt-0 rounded hover:bg-[#229F8B]"
      >
        Limpar
      </button>
    </div>
  </div>
  )
}

export default Search