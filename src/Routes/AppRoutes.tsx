import axios from 'axios';
import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CreatePost from '../Components/CreatePost';
import EditPost from '../Components/EditPost';
import Form1 from '../Components/Form1';
import GetPost from '../Components/GetPost';
import Login from '../Components/Login';

import PrivateRoute from './PrivatRoute';

axios.defaults.baseURL='http://192.168.1.37:4000/'
export default function AppRoutes() {
//return

  return (
    <BrowserRouter>
    <Routes>
    <Route path='register' element={<Form1/>}/>
    <Route path="/" element={<Login />} />
      <Route element={ <PrivateRoute />}  > 
      <Route path='create' element={<CreatePost/>}/>
      <Route  path='editpost/:id' element={<EditPost/>}/>
     <Route path='get' element={<GetPost/>}/>  
    </Route>
    </Routes>
</BrowserRouter>
  )
}
