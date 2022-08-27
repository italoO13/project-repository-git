import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../contexts/auth";

const LoginPage = () => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const {login} = context;

  const handleLogin = ({target}) => {
    setUser({...user, [target.name]:target.value})
  }
  return (
    <div id="login">
      <h1 className="title">Login</h1>
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
        <button onClick={async() => {
          await login(user.email, user.password)
          navigate('/')
          }}>Entrar</button>
      </div>
    </div>
  )
}

export default LoginPage;
