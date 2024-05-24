import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  let history = useNavigate();
  // let history = useHistory

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json)

    if(json.success){
      localStorage.setItem('token', json.authtoken);
      history("/");
      props.showAlert("Account Created Successfully..","success")
    }else{
      props.showAlert("Invalid Credentials","danger")
    }

  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // {...note } means isme jo value hai rahne do lekin  jo value extra aa rahi hai unko [...note] par over write kar do
  };




  return (
    <div className='container mt-2'>
      <h2>Create an to use Our NotebBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name :-</label>
          <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name} id="name" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" required minLength={5} className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" required minLength={5} className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} name='cpassword' id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup
 

// NOTE :- 
// Onsubmit par required run honga