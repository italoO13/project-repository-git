import React, {useState, useEffect} from "react";
import AuthContext from "./auth";
import {createSession} from '../services/api';
import { useNavigate } from "react-router-dom";

const ProviderAuth= ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser]  = useState(null);
  const [alert, setAlert] = useState('');
  const [token, setToken] = useState('null');


  useEffect(() => {
    const loadSession = () => {
      const user = localStorage.getItem('user') || null;
      const token = localStorage.getItem('token') || null;
      setUser(JSON.parse(user));
      setToken(JSON.parse(token));
      if(user && token) {
        navigate('/');
      }
    }
    loadSession();
  }, [])

  const login = async (email, password) => {
    try {
      const response = await createSession(email, password)
      const {data} = response;
      if(data.message) {
        return setAlert(data.message);
      }
      setUser(data.user.id);
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user.id));
      localStorage.setItem('token', JSON.stringify(data.token));
      setAlert('');
    } catch (error) {
      if(error.message.includes('401')) {
        return setAlert('Email ou senha inválidos')
      }
      setAlert('Erro no servidor')
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const context = {
    user, 
    authenticated: !!user,
    token,
    setAlert, 
    alert,
    login, 
    logout, 
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )

}

export default ProviderAuth;