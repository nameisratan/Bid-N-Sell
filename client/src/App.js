import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/home';
import Product from './components/Product/product';
import Profile from './components/Profile/profile';
import Confirm from './components/Confirm/Confirm';
import Nothing from './components/nothing';
import {Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/register' Component={Register}/>
        <Route exact path='/product/:id' Component={Product}/>
        <Route exact path='/profile' Component={Profile}/>
        <Route exact path='/confirm/:id' Component={Confirm}/>
        
        <Route path='/' Component={Nothing}/>
      </Routes>
  );
}

export default App;