import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import "./App.css";

const NavBar = () => {
  const navigate = useNavigate();
  const PostPage = () => {
    navigate("/create");
  };
  const logout=()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <Stack className='stack'  direction="row" alignItems="center" p={2} sx={{ position: "sticky",  overflow:" hidden", background: '#051d33', top: 0, justifyContent: "space-between" }}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
    </Link>
     <Button className="postBtn" onClick={PostPage}>
        Post
      </Button>
      <Button className="logout" onClick={logout}>
        logout
      </Button>
    <Typography sx={{ fontSize: "25px", color: "white", ml: "5px"  }} >Post Book By Anjali...</Typography>
  </Stack>
  )
}
export default NavBar