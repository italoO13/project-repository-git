import React from "react";

const Card = ({rep, onDelete}) => {

  return(
    <li className="item">
      <div className="info">
        <p>{rep.name.split('/')[0]}</p>
        <p>{rep.name.split('/')[1]}</p>
      </div>
      <button onClick={() => onDelete(rep.userId,rep._id)}>Apagar</button>
    </li>
  )

}

export default Card;