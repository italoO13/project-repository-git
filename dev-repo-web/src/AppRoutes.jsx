import React from "react";
import {Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ControllSession from "./components/ControllSession";
import CreateAcount from "./pages/createAcount";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="create" element={<CreateAcount />}/>
        <Route path="/" element={<ControllSession><MainPage /></ControllSession>} />
      </Routes>
  );
}

export default AppRoutes;