import React from "react";
import { Button, Form } from "react-bootstrap";
import NavBar from "./NavBar";
import "./App.css";
import swal from "sweetalert";
import { singnUpSchema } from "./schemas";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  Mobile_no: "",
};
const Register = () => {
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: singnUpSchema,
    onSubmit: (values: any, action: any) => {
      console.log("fun values.......", values, action);
      // fetch('http://192.168.1.9:8020/api/user/register',{
      //   method:"POST",
      //   headers: {
      //       'Content-Type': 'application/json'

      //   },
      //   body: JSON.stringify({
      //     userName: userData.name,
      //     password:userData.pass,
      //     email:userData.email,
      //     confirmPassword:userData.cpass
      //   })
      // }).then(response => response.json())
      // .then((d)=>{
      //   console.log(d)
      //   if(d.message== "Registered Sucessfully"){
      //       swal("Good job!", "user registered successfully", "success");
      //   }

      // }).catch((e)=>{
      //   console.log(e)
      // })

      
      action.resetForm();
      {
        values ? (
          swal("Good job!", "User Register successfully", "success")
        ) : (
          <></>
        );
      }
    },
  });
  return (
    <div>
      <div className="container1">
        <div>
          <div>
            <div className="modal-container1">
              <h1 className="h1registration">Registration form</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-block1">
                  <label className="input-label1">Name</label>
                  <input
                    type="name"
                    autoComplete="off"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="inputForm"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <p className="form-error">{errors.name}</p>
                  ) : null}
                </div>
                <div className="input-block1">
                  <label className="input-label1">Email</label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="enter your email"
                    className="inputForm"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
                <div className="input-block1">
                  <label className="input-label1">Mobile Number</label>
                  <input
                    type="number"
                    autoComplete="off"
                    name="Mobile_no"
                    id="Mobile_no"
                    placeholder="enter your Mobile Number"
                    className="inputForm"
                    value={values.Mobile_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.Mobile_no && touched.Mobile_no ? (
                    <p className="form-error">{errors.Mobile_no}</p>
                  ) : null}
                </div>
                <div className="input-block1">
                  <label htmlFor="password" className="input-label1">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="enter your password"
                    className="inputForm"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                </div>

                <div className="input-block1">
                  <button className="input-button1" type="submit">
                    Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
