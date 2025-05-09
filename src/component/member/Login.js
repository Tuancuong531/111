import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../Error/FormError";
import API1 from "../../API1";

function Login(){
    const   navigate = useNavigate();
    const [inputs, setInput] = useState({
      email: "",
      pass : "",
      level: 0,
    })
    const [error, setErr] = useState ("")
    function handleInput(e){
      const nameInput = e.target.name;
      const value = e.target.value;

      setInput(state => ({...state,[nameInput]: value}))
    }
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    function handleForm(e){
      e.preventDefault();
      let errSubmit = {};
      let flag = true;

      if(inputs.email==""){
        errSubmit.email = "Vui long nhap email";
        flag = false;
      }else if (!validateEmail(inputs.email)) {
        errSubmit.email = "Email không hợp lệ";
        flag = false;
      }
      if (inputs.pass=="") {
        errSubmit.pass = "Vui long nhap pass";
        flag = false;
      }
      if(!flag){
        setErr(errSubmit)
      }else{
        setErr({});
        const data = {
          email: inputs.email,
          password : inputs.pass,
          level: 0
        }
        // alert("ok")
        API1.post('login',data)
        .then(res=>{
          if(res.data.errors){
            setErr(res.data.errors)
          }else{
            
            localStorage.setItem("Checklogin","true")
            // console.log(res.data.Auth)
            var dataUser = JSON.stringify(res.data.Auth)
            // console.log(dataUser)
            localStorage.setItem("data",dataUser)
            // console.log(res.data)
            localStorage.setItem("token",res.data.token)

            navigate('/')
          }
        })
        .catch(function(error){
          console.log(error)
        })
        
      }
    }
    
   
    return (
        <div className="col-sm-9">
          
          <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <ErrorForm errors = {error}/>
            <form onSubmit={handleForm} encType="multipart/form-data">
              <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
              <input type="password" placeholder="Password" name="pass" onChange={handleInput} />

              <span>
                <input type="checkbox" className="checkbox" /> 
                Keep me signed in
              </span>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>{/*/login form*/}
          
        </div>
          
      );
}
export default Login;