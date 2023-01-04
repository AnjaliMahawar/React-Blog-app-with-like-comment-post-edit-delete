
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

import { updateFetchPostService, updatePostService } from "../services/CurdServices";

const EditPost = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    contentt: "",
    image: "",
  });
  const { id } = useParams();
  console.log("useParam hook ...", id);
  useEffect(() => {
    updateFetchPostService(id)
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   "content-type": "multipart/form-data",
    // };
    // axios
    //   .get(`http://192.168.1.37:4000/posts/editpost/${id}`, { headers })
    //   .then((response) => {
    //     setPostData({
    //       title: response.data.title,
    //       contentt: response.data.content,
    //       image: response.data.image,
    //     });
    //     console.log("edit res", response.data);
    //   });
  }, []);

  let changeData = (e) => {
    const value = e.target.value;
    setPostData({
      ...postData,
      [e.target.name]: value,
    });
  };
  const handleImage = (e) => {
    console.log("file", e.target.files);
    setPostData({ ...postData, image: e.target?.files[0] });
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();

   

      const formData = new FormData();
      console.log("file", postData.image);
      formData.append('postID',id)
      formData.append("image", postData.image);
      formData.append("title", postData.title);
      formData.append("content", postData.contentt);
      //  const Authentication = "Bearer ".concat(token);
      // const headerObj = {
      //   "content-type": "multipart/form-data",
      //   Authorization: Authentication,
      // };

      // let response = await axios.put(
      //   `http://192.168.1.37:4000/posts/updatepost/${id}`,
      //   formData,
      //   { headers: headerObj }
      // );
      // dispatch(updateApi(id,formData))
      let response = await updatePostService(id,formData);
      console.log(response);
      if (response.status === 201) {
        swal("Good job!", "Post edit successfully", "success");
        navigate("/get");
      } else {
        alert("something went wrong");
     }
   
  };

  console.log("edit data...", postData);
  return (
    <div>
      <div>
        <div>
          <div className="container">
            <div className="modal">
              <div className="modal-container">
                <div className="modal-left">
                  <h1 className="registration">Post Edit form</h1>
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
    </div>
  );
};

export default EditPost;
