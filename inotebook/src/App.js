import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';


import {
  // BrowserRouter as Router,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  
  const [alert , setAlert] = useState(null)

  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  
  return (
    <>
      <NoteState>

        <Navbar />
        <Alert alert={alert}/>
        <BrowserRouter>
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert = {showAlert} />} />
            </Routes>
          </div>

        </BrowserRouter>

      </NoteState>

    </>
  );
}

export default App;
