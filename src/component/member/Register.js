import { useState } from "react";
import ErrorForm from "../Error/FormError";
import API1 from "../../API1";

function Register(){
    const [inputs, setInput] = useState({
        name: "",
        email:"",
        pass:"",
        number:"",
        address:"",
        avatar:"",

    })
    const [error, setErr] = useState ([])
    const [getFile, setFile] = useState ("")
    const [getAva, setAva] = useState ("")

    function handleInput(e){
        const nameInput = e.target.name;
        let value = e.target.value;

        setInput(state =>({...state,[nameInput]:value}));
    }
    function handleUserInputFile(e){
        const file = e.target.files;
        console.log(file)
        setFile(file) //toan bo thong tin file upload vao file de xu ly
        
        let reader = new FileReader();
        reader.onload=(e)=>{
            setAva(e.target.result) //de gui qua api
        };
        reader.readAsDataURL(file[0]);
    }

    // function handleFile(e){
    //     setFile(e.target.files)
    //     console.log(e.target.files)
    // }
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function handleForm(e){
        e.preventDefault();
        let errSubmit = {};
        let flag = true;

        if(inputs.name==""){
            errSubmit.name = "Vui long nhap ten";
            flag = false
        }
        if(inputs.email==""){
            errSubmit.email = "Vui long nhap email";
            flag = false
        }else if (!validateEmail(inputs.email)) {
            errSubmit.email = "Email không hợp lệ";
            flag = false;
        }
        if(inputs.pass==""){
            errSubmit.pass = "Vui long nhap pass";
            flag = false
        }
        if(inputs.phone==""){
            errSubmit.phone = "Vui long nhap phone";
            flag = false
        }
        if(inputs.address==""){
            errSubmit.address = "Vui long nhap address";
            flag = false
        }
        if(getFile==""){
            errSubmit.getFile = "Vui long nhap anh";
            flag = false
        }else{
            console.log(getFile)
            let getSize = getFile[0]['size']
            let choPhep =['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            let getName = getFile[0]['name']
            let sentences = getName.split(".");
            if(!choPhep.includes(sentences[1])){
                errSubmit.getName = "Duoi anh k phu` hop"
                flag = false
            }else if(getSize > 1024 * 1024){
                errSubmit.getSize = "Dung luong anh lon hon 1MB"
                flag = false
            }
        }
        
        if(!flag){
            setErr(errSubmit);
        }else{
            setErr({});
            const data={
                name: inputs.name,
                email: inputs.email,
                password: inputs.pass,
                phone: inputs.phone,
                address: inputs.address,
                avatar: getAva,
                level: 0

            }
            API1.post('register',data)
            .then(res =>{

                if(res.data.errors){
                    setErr(res.data.errors)
                }else{
                    alert("thanh cong")
                    console.log(res)
                }

            })
            .catch(error => console.log(error))
            


        }

    }
    return(
        <div  className="col-sm-9">
            <h2>New User Signup!</h2>
            <div class="signup-form">

            <ErrorForm errors = {error}/>
            <form action="#" onSubmit={handleForm} encType="multipart/form-data">
            <input type="text" placeholder="Name" name="name" onChange={handleInput} />
            <input type="email" placeholder="Email Address" name="email"onChange={handleInput} />
            <input type="password" placeholder="Password" name="pass" onChange={handleInput}/>
            <input type="text" placeholder="Phone" name="phone" onChange={handleInput}/>
            <input type="text" placeholder="Address" name="address" onChange={handleInput}/>
            <input type="file" placeholder="Avatar" name="avatar" onChange={handleUserInputFile} />

            <button type="submit" >Signup</button>
            </form>
            </div>
        </div>
    )
}
export default Register;