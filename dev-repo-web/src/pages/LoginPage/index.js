import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../contexts/auth";
import imgLogin from "../../imgs/imgLogin.png";

const LoginPage = () => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const {login, alert} = context;

  const handleLogin = ({target}) => {
    setUser({...user, [target.name]:target.value})
  }
  return (
    <div id="login" className="min-h-screen mx-auto">
      <div className="xl:w-1/5 w-1/2 mx-auto max-w-xs min-w-[200px]">
          <img src={imgLogin} className="mx-auto w-full" alt="imagem acima do login"/>
      </div>
      <h1 className="font-medium tracking-wide mb-3 text-4xl 
        md:text-5xl text-center text-secondary">Login</h1>
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="field flex flex-col w-11/12 md:w-3/4 mb-2">
          <label className="opacity-50 font-light	mb-1" htmlFor="email">Email</label>
          <input
            className="drop-shadow-md border py-2 px-3
            focus:outline-none text-gray-700    
            focus:ring focus:outline-primary
            "
            type="email" 
            name="email" 
            id="email"
            value={user.email}
            onChange={handleLogin}
          />
        </div>
        <div className="field flex flex-col w-11/12 md:w-3/4 m-1">
          <label className="opacity-50 font-light mb-1	" htmlFor="password">Password</label>
          <input 
            className="drop-shadow-md border py-2 px-3
            focus:outline-none text-gray-700
            focus:ring focus:outline-primary
            "
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleLogin}
          />
        </div>
      <div className="actions w-11/12 md:w-3/4 m-1">
        {alert && <p className="pt-2 text-red-600">{alert}</p>}
        <button 
        type="button" 
        className="drop-shadow-md bg-primary text-white py-2 px-16 mt-6 mb-3 rounded"
        onClick={async() => {
          await login(user.email, user.password)
          navigate('/')
        }}>Entrar</button>
        <Link to="/create">
          <p className="opacity-50 font-light">Não tem uma conta?
            <span className="font-bold text-primary"> Sing up</span>
          </p>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default LoginPage;
