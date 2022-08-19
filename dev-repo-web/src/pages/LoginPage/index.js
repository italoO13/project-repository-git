import React, {useState} from "react";

const LoginPage = () => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })

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
        <button>Entrar</button>
      </div>
    </div>
  )
}

export default LoginPage;
