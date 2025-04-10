import logo from './logo.svg';
import './App.css';
import Login from "./pages/auth/login/login"
import Register from "./pages/auth/register/Register"
import Home from "./pages/home/Home"
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
