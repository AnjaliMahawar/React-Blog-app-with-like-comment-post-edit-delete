import { useFormik } from "formik";
import React, { useState } from "react";
import "./App.css";
import { PostSchema } from "./schemas";
import { useDispatch } from "react-redux";
import { postApi } from "../features/users/userSlice";
const CreatePost = () => {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    title: "",
    contentt: "",
    image: "",
  });

  const handleImage = (e) => {
    console.log("file", e.target.files);
    var myFile = e?.target?.files[0];
    setPostData({ ...postData, image: e?.target?.files[0] });
  };

  let changeData = (e) => {
    const value = e.target.value;
    setPostData({
      ...postData,
      [e.target.name]: value,
    });
  };

  console.log("post data", postData);

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", postData.image);
  //   // formData.append("title", postData.title);
  //   // formData.append("content", postData.contentt);
  //   var x = localStorage.getItem("token");
  //   console.log("token", x);
  //   var cobj = {
  //     // method: "POST",
  //     // body: Fdata,
  //     // headers: {
  //     //   "Content-Type": "application/json",
  //     //   Authorization: `Bearer ${x}`,
  //     // }
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "multipart/form-data'",
  //     },
  //     body: formData,
  //   };
  //   // debugger;
  //   // fetch("http://192.168.1.37:4000/posts/createpost", {
  //   //   method: "POST", // or 'PUT'
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: Fdata,
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     console.log("inside", data);
  //   //     debugger;
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });

  //   fetch("http://192.168.1.37:4000/posts/createpost", {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${x}`,
  //     },
  //     // body: JSON.stringify(postData),
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  const handleSubmit1 = async (e) => {
    e.preventDefault()
   
    const formData = new FormData()
    console.log("file",postData.image)
     formData.append("image",postData.image )
     formData.append("title", postData.title)
     formData.append("content", postData.contentt)
  
       
     
        
            // const Authentication = 'Bearer '.concat(token);
            // // const headerObj = {
            // //     'content-type': 'multipart/form-data',
            // //     Authorization:Authentication
            // // }
          
            // let response = await addPostService(formData)
            dispatch(postApi(formData))
        //     console.log(response)
        //     if (response.status===200){
        //       swal("Good job!", "Post successfully", "success");
        //       navigate('/get')
        //     }
        // else{
        //   alert('something went wrong')
        // }
}
  return (
    <div>
      <div
        onCopy={(e) => {
          e.preventDefault();
        }}
      >
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="registration">Post form</h1>
                <h2 className="modal-title">Write something here...</h2>
                <form onSubmit={handleSubmit1}>
                  <div className="input-block">
                    <label htmlFor="title" className="input-label">
                      Title
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="title"
                      id="title"
                      placeholder="title"
                      value={postData.title}
                      onChange={changeData}
                     
                    />
                  
                  </div>
                  <div className="input-block">
                    <label htmlFor="contentt" className="input-label">
                      Content
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="contentt"
                      id="contentt"
                      placeholder="content"
                      value={postData.contentt}
                      onChange={changeData}
                     
                    />
                 
                  </div>

                  <div className="input-block">
                    <label className="input-label">File</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleImage}

                    />
                
                  </div>

                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
