import { useFormik } from 'formik';
import './App.css';
import { singnUpSchema } from './schemas';
import swal from 'sweetalert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    Mobile_no:""
  };
function Form1() {

  const navigate = useNavigate();
 const {values,errors,handleBlur,handleChange,touched,handleSubmit,isValid} =useFormik({
    initialValues:initialValues,
    validationSchema:singnUpSchema,
    onSubmit:(values,action)=>{
      console.log("fun values",values)
        
      fetch('http://192.168.1.37:4000/users/register',{
          method:"POST",
          headers: {
              'Content-Type': 'application/json'
  
          },
          body: JSON.stringify({
            name:values.name,
            phone:values.Mobile_no,
            email:values.email,
            password:values.password
          })
        }).then(response => response.json())
        .then((d)=>{
          console.log("response",d)
          if(d.message== "success"){
              swal("Good job!", "user registered successfully", "success");
              navigate('/get')

          }
         
        }).catch((e)=>{
          console.log(e)
        })
      action.resetForm()
    
  }
 })
 const loginPage=()=>{
 navigate('/')
 }
   return (
    <div onCopy={(e)=>{e.preventDefault()}}>
     <div className="container">
      <div className="modal">
       <div className="modal-container">
         <div className="modal-left">
         <Button variant="outlined" onClick={loginPage} >Already have account ?log In</Button>
         <h1 className="registration">Registration form</h1>
          <h2 className="modal-title">Welcome!</h2>
         <form onSubmit={handleSubmit}>
           <div className="input-block">
                    <label htmlFor="name" className="input-label">
                      Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                   {errors.name && touched.name ? <p className='form-error'>{errors.name}</p> : null}
                  </div>
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
                      {errors.email && touched.email? <p className='form-error'>{errors.email}</p> : null}
                   
                  </div>
                  <div className="input-block">
                    <label htmlFor="Mobile_no" className="input-label">
                      Mobile_no.
                    </label>
                    <input
                      type="Number"
                      autoComplete="off"
                      name="Mobile_no"
                      id="Mobile_no"
                      placeholder="enter your email"
                      value={values.Mobile_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                     />
                      {errors.Mobile_no && touched.Mobile_no? <p className='form-error'>{errors.Mobile_no}</p> : null}
                   
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
                     {errors.password && touched.password? <p className='form-error'>{errors.password}</p> : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="enter your password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                     
                    />
                    {errors.confirm_password && touched.confirm_password? <p className='form-error'>{errors.confirm_password}</p> : null}
                  </div>
                  <div className="modal-buttons">
                    <button  className="input-button" disabled={!isValid} type="submit" >
                      Registration 
                    </button>
                  </div>
                  </form>
                 </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                </div>  
               </div>
               </div>
               
       </div>
  )
}

export default Form1