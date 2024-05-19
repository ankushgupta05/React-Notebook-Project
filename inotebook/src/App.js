import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

import {
  // BrowserRouter as Router,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>

        <Navbar />
        <Alert message='This is amezing web'/>
        <BrowserRouter>
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/login" element={<Login showAlert={showAlert} />} /> */}
              {/* <Route exact path="/signup" element={<Signup showAlert={showAlert} />} /> */}
            </Routes>
          </div>

        </BrowserRouter>

      </NoteState>

    </>
  );
}

export default App;
