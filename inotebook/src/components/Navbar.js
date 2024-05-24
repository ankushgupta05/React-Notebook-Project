import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const Navbar = () => {

  // let history = useNavigate();


  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location)
  //   // eslint-disable-next-line
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // history('/login')
  }

  return (
    <>

      <nav className="navbar navbar-dark  navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/about">About</a>
              </li>


            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <a className="btn btn-warning mx-1" href='/login' role="button">Login</a>
              <a className="btn btn-warning mx-1" href='/signup' role="button">SignUp</a>
            </form> : <button className="btn btn-warning mx-1" onClick={handleLogout} >Logout</button>}

          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar
