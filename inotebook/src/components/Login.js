import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let history = useNavigate();
  // let history = useHistory

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json =await response.json();
    console.log(json)
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);

      // history.push('/');
      props.showAlert("Logged In Successfully..","success")
      history("/");
      
    }else {
      // alert('Invalid Credentials');
      props.showAlert("Invalid Details","danger")
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // {...note } means isme jo value hai rahne do lekin  jo value extra aa rahi hai unko [...note] par over write kar do
  };



  return (
    <div className='mt-3'>
      <h2>Login to Continue to NotebBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
