import './App.css';
import Toast from './components/popups/Toast';
import Homepage from './components/postlogin/Homepage';
import Product from './components/postlogin/Product';
import CreateAccount from './components/prelogin/CreateAccount';
import Login from './components/prelogin/Login';

import "./assets/css/global.css"

import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/dashboard' element={<Homepage />} />
          <Route path='/product' element={<Product />} />

        </Routes>

      </BrowserRouter >
    </div >
  );
}

export default App;
