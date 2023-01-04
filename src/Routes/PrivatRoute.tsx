import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, Navigate, Outlet } from 'react-router-dom'



export default function PrivateRoute() {
  
  var isLogedIn=localStorage.getItem("token")


return (
  <>

  {
    isLogedIn?<Outlet/>:<Navigate to='/'/>
  }
</>
)
}
