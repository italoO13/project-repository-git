import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../contexts/auth";
import { createAcount } from "../../services/api";
import imgLogin from '../../imgs/imgLogin.png';

const CreateAcount = () => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const {alert, setAlert} = useContext(AuthContext);
  useEffect(() =>{
    setAlert('');
  }, [])

  const create = async() => {
    try {
      await createAcount(user.email, user.password)
      setAlert('');
      navigate('/login');
    } catch (error) {
      if(error.message.includes('422')) {
        return setAlert('Usuário já cadastrado no sistema');
      }
      setAlert(error.message);
    }
  }

  const handleLogin = ({target}) => {
    setUser({...user, [target.name]:target.value})
  }
  return (
    <div id="createAcount" className="min-h-screen mx-auto">
            <div className="xl:w-1/5 w-1/2 mx-auto max-w-xs min-w-[200px]">
          <img src={imgLogin} className="mx-auto w-full" alt="imagem acima do login"/>
      </div>
      <h1 className="font-medium tracking-wide mb-3 text-4xl 
        md:text-5xl text-center text-secondary">Sing up</h1>
      <div className="Form max-w-xl mx-auto flex flex-col items-center">
        <div className="field flex flex-col w-11/12 md:w-3/4 mb-2">
          <label htmlFor="email" className="opacity-50 font-light	mb-1">Email</label>
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
          <label className="opacity-50 font-light mb-1" htmlFor="password">Password</label>
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
          className="drop-shadow-md bg-primary text-white py-2 px-16 mt-6 mb-3 rounded"
          type="button" 
          onClick={create}>
            Cadastrar
          </button>
        <Link to="/login">
          <p className="opacity-50 font-light">
            Já tem uma conta? <span className="font-bold text-primary">Sing In</span></p></Link>
        </div>
      </div>
    </div>
  )
}

export default CreateAcount;
