import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button } from "react-bootstrap";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NavBar from "./NavBar";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { deletePostService } from "../services/CurdServices";
import { useDispatch } from "react-redux";

const GetPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [comment, setComment] = useState([]);
  const [postComment,setPostComment]=useState('')
  const[lshow,setLshow]=useState(false)
  const token = localStorage.getItem("token");
  const emailId = localStorage.getItem("Lemail");
  const[showCom,setShowCom]=useState(false)


  var object = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Host: "api.producthunt.com",
    },
  };
  const getData = () => {
    fetch("http://192.168.1.37:4000/posts/getallposts", object)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data.newData);
      });
  };
  var userID=localStorage.getItem('user_ID')
  console.log("user id",userID)
  useEffect(() => {
    getData();
  }, []);
  const showCmnt = (cv: any) => {
    if(showCom){
      setShowCom(false)
    }
    else{
      setShowCom(true)
    }
    
  };
  const deleteItem = async(id: any) => {
    var key = id._id;
    let res = await  deletePostService(key)
    if (res.status === 200) {  swal("Good job!", "Post deleted  successfully", "success");  getData();} }
   const editItem=(id:any)=>{
    var key1 = id._id;
    console.log("edit",key1)
    navigate(`/editpost/${key1}`)
}
  
var x = localStorage.getItem("token");
console.log("token", x);
const headers = {
'Content-Type': 'application/json',
'Authorization': `Bearer ${x}`,
}


const comentFun =(comnt:any,cv:any)=>{

  console.log("commnet",postComment)
  axios.put('http://192.168.1.37:4000/posts/comments', {
    text: comnt,
   postid: cv
  },{headers:headers})
  .then(function (response) {
    console.log("comnt res",response);
    getData()
  })
  .catch(function (error) {
    console.log(error);
  });

}

// const like = async (data:any) => {

//   try {

//       const token = localStorage.getItem('token')
//       const res = await axios.put(`http://192.168.1.37:4000/posts/like-unlike`, { postid: data._id }, {
//           headers: {
//               'Authorization': `Bearer ${token}`
//           }
//       })
//       getData()
//   } catch (error) {
//       console.log(error)
//   }


// }
const like=(id:any)=>{

  if(lshow){
    setLshow(false)
  }
  else{
    setLshow(true)
  }
  
  axios.put('http://192.168.1.37:4000/posts/like-unlike', {
   postid: id._id
  },{headers:headers})
  .then(function (response) {
    console.log("like res",response);
    getData()
    
  })
  .catch(function (error) {
    console.log(error);
  });
}
console.log("alldata",allData)
  return (
    <div className="image_div">
      <NavBar />
      {allData.map((cv: any, indx) => (
        <Card key={indx} className="card" sx={{ maxWidth: 500 }}>
          <span>Posted By :-{cv.postedBy.email}</span>
          <span>
             {emailId === cv.postedBy.email ? (
            <>  <button  onClick={() => {  deleteItem(cv);}}><DeleteIcon /></button>
                 <button onClick={()=>{editItem(cv)}}><ModeEditIcon/></button>
            </>
              ):""} 
               
         
            
          </span>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={cv.image[0].replace("localhost", "192.168.1.37")}
              alt="Image not uploded"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                TITLE:- {cv.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CONTENT:- {cv.content}
              </Typography>
               <span>
               {cv?.comments?.map((cmnt: any) => (
                showCom?<div key={cmnt._id}>
                <h4>{cmnt.text}</h4>
                <span>{cmnt?.postedBy?.email}</span>
              </div>:''
              ))}
               </span>
              <span
                onClick={() => {
                  showCmnt(cv.comments);
                }}
              >
                {" "}
                Comment <ChatBubbleOutlineIcon />
               
              </span>
                                    {
                                           cv?.likes.includes(userID)
                                            ?<> <FavoriteIcon className="button3" style={{ color: 'red' }} onClick={() => like(cv)}></FavoriteIcon><span>{cv.LikeCounts}</span></>
                                            :<> <FavoriteBorderIcon className="button3" onClick={() => like(cv)}></FavoriteBorderIcon><span>{cv.LikeCounts}</span></>

                                    }
              {comment.map((cmnt: any) => (
                <div key={cmnt._id}>
                  <h4>{cmnt.text}</h4>
                  <span>{cmnt?.postedBy?.email}</span>
                </div>
              ))}
              
             <>
             
              <form onSubmit={(e:any)=>{
                e.preventDefault()
               comentFun(e.target[0].value,cv._id)
               e.target[0].value=''
              }}>
                <input name="commentss" placeholder="add comment" type='text' />
              </form>
                
             </>
              
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="sm" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default GetPost;
