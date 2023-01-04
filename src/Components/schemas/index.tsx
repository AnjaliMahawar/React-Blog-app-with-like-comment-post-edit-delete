import * as yup from 'yup';

export const singnUpSchema=yup.object({
    name: yup.string().min(2).max(15).required('please enter your name'),
    email: yup.string().email().required('please enter your email'),
    password:yup.string().min(6).max(10).required('please enter your password') ,
    confirm_password:yup.string().required().oneOf([yup.ref('password'),null,],'password and confirm password should be same'),
    Mobile_no: yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(8)
  .required('A phone number is required'),
})


export const LoginSchema=yup.object({
    email: yup.string().email().required('please enter your email'),
    password:yup.string().min(6).max(10).required('please enter your password') ,
  
})

export const PostSchema=yup.object({
  title:yup.string().required('please enter Title'),
  contentt:yup.string().required("enter content"),
  file: yup.mixed().required('A file is required')
})