import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

const ControllSession = ({children}) => {
  const {authenticated} = useContext(AuthContext)
  if(!authenticated) {
    return <Navigate to="/login"/> 
  }
  return children;
}

export default ControllSession;