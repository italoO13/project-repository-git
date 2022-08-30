import React, {useState} from "react";

const NewRepo = ({onNewRepo}) => {

  const [newRepo, setNewRepo] = useState('')

  return(
    <div className="new fixed bottom-0 bg-secondary w-full">
      <div className="max-w-5xl px-2 md:px-6 m-auto flex flex-wrap md:flex-nowrap	 items-center h-[110px] py-2 md:py-0 md:h-[70px]">
        <input 
          className="drop-shadow-md border py-2 px-3 flex-1
          max-w-[595px]
          focus:outline-none text-gray-700
          focus:ring focus:outline-primary"
          placeholder="Adicione um novo Repositório"
          type="url"
          name="newRepo"
          id="newRepo"
          onChange={({target}) => setNewRepo(target.value)}
          value={newRepo}
        />
        <div className="flex justify-center w-full md:w-auto">
          <button 
            className="drop-shadow-md bg-primary text-white py-2 px-10 mt-2 md:mt-0 md:px-16 ml-2 rounded hover:bg-[#229F8B]"
            onClick={() => onNewRepo(newRepo)}
            >
              Adicionar
            </button>
        </div>
      </div>
    </div>
  )
}

export default NewRepo;