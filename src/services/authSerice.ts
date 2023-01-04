import httpServices from "./httpServices"

export const LoginServices =(payload : any)=>{
    return httpServices.post("/users/login", payload)
}
export const RegisterServices =(payload : any)=>{
    return httpServices.post("/users/register", payload)
}
