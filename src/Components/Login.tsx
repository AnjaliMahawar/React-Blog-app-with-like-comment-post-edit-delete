import { useFormik } from "formik";
import "./App.css";
import { LoginSchema } from "./schemas";
import swal from "sweetalert";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { LoginServices } from "../services/authSerice";

const initialValues = {
  email: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();
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
    validationSchema: LoginSchema,
    onSubmit: async(values, action) => {
      console.log("fun values", values);
  const payload={
    email: values.email,
    password: values.password,
  }
  //api call
  let response = await LoginServices(payload);
  if (response.status === 200) {
    swal("Good job!", "login successfully", "success");
    var token =response.data.data.token
    localStorage.setItem("token",token)
    localStorage.setItem("user_ID",response.data.data._id)
    localStorage.setItem('Lemail',response.data.data.email)
    console.log(response)
    navigate("/get");
  } else {
    alert("something went wrong probably you  already logged in");
 }
    },
   })
  
  const registerPage = () => {
    console.log("ok");
    navigate("register");
  };
  return (
    <>
      <div
        onCopy={(e) => {
          e.preventDefault();
        }}
      >
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <Button variant="outlined" onClick={registerPage}>
                  Don't have account ?signup
                </Button>
                <h1 className="registration">Login form</h1>
                <h2 className="modal-title">Welcome!</h2>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                  </div>

                  <div className="modal-buttons">
                    <button
                      className="input-button"
                      disabled={!isValid}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
