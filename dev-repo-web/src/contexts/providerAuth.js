import React from "react";
import AuthContext from "./auth";

const ProviderAuth= ({ children }) => {

  const context = {
    
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )

}

export default ProviderAuth;