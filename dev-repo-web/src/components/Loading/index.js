import React from "react";

const Loading = () => {
  return(
    <div className="absolute h-full w-full bg-black opacity-80 z-50 flex justify-center items-center">
      <p className="text-white text-5xl">Carregando...</p>
    </div>
  )
}

export default Loading;