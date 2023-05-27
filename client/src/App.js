import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import React, { createContext, useReducer, useState } from 'react';
import { Box } from '@material-ui/core';
import DetailView from './components/home/post/DetailView';
import { BrowserRouter , Switch, Route} from "react-router-dom";
import CreateView from './components/home/post/CreateView';
import UpdateView from './components/home/post/UpdateView';
import Signin from './components/home/user/Signin';
import Login from './components/home/user/Login';
import { initialState, reducer } from './reducer/UseReducer';
import MyProfile from './components/home/useroptions/MyProfile';

export const UserContext = createContext();


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
            
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{state, dispatch}}>
      <Header/>
      <Box styles={{marginTop: 64}}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/details/:id' component={DetailView}/>
          <Route exact path='/create' component={CreateView}/>
          <Route exact path='/update/:id' component={UpdateView}/>
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/profile/:username' component={MyProfile}/>
        </Switch>
      </Box>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
