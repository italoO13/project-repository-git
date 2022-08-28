import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../contexts/auth";
import { createAcount } from "../../services/api";

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
    <div id="createAcount">
      <h1 className="title">Nova Conta</h1>
      <div className="Form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={user.email}
            onChange={handleLogin}
          />
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleLogin}
          />
        </div>
      </div>
      <div className="actions">
        <button type="button" onClick={create}>Cadastrar</button>
      </div>
      <Link to="/login"><p>Já tenho uma nova conta</p></Link>
      {alert && <p>{alert}</p>}
    </div>
  )
}

export default CreateAcount;
