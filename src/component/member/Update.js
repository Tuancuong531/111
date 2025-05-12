import { useEffect, useState } from "react";
import ErrorForm from "../Error/FormError";
import API1 from "../../API1";

function Update() {
    const [error, setErr] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        avatar: "",
    });
    const [getFile, setFile] = useState("");
    const [getAva, setAva] = useState("");
    useEffect(() => {
        let userData = localStorage.getItem("data");
        if (userData) {
            userData = JSON.parse(userData);
            setUser({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
                password: userData.pass,
                avatar: userData.avatar,
                id: userData.id,
            });
            
        }
    }, []);
    function handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;

        setUser((state) => ({ ...state, [nameInput]: value }));
    }
    function handleUserInputFile(e) {
        const file = e.target.files;
        console.log(file);
        setFile(file); 

        let reader = new FileReader();
        reader.onload = (e) => {
            setAva(e.target.result); 
            
        };
        reader.readAsDataURL(file[0]);
    }
    function handleForm(e) {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;

        if (user.name == "") {
            errSubmit.name = "Vui long nhap ten";
            flag = false;
        }
        if (user.phone == "") {
            errSubmit.phone = "Vui long nhap phone";
            flag = false;
        }
        if (user.address == "") {
            errSubmit.address = "Vui long nhap address";
            flag = false;
        }
        if (getFile == "" && !user.avatar) {
            errSubmit.getFile = "Vui long nhap anh";
            flag = false;
         } else if (getFile) {
            console.log(getFile);
            let getSize = getFile[0]["size"];
            let choPhep = ["png", "jpg", "jpeg", "PNG", "JPG"];
            let getName = getFile[0]["name"];
            let sentences = getName.split(".");
            if (!choPhep.includes(sentences[1])) {
                errSubmit.getName = "Duoi anh k phu` hop";
                flag = false;
            } else if (getSize > 1024 * 1024) {
                errSubmit.getSize = "Dung luong anh lon hon 1MB";
                flag = false;
            }
        }

        if (!flag) {
            setErr(errSubmit);
         } else {
            setErr({});
            
            const accessToken = localStorage.getItem("token");
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                }
            }
            const formData = new FormData();
                formData.append('name',user.name);
                formData.append('email',user.email);
                formData.append('password',user.password);
                formData.append('phone', user.phone);
                formData.append('address',user.address);
                formData.append('avatar',getAva);
                formData.append('id',user.id);

                API1.post(`user/update/${user.id}`, formData, config)
                .then(res=>{
                console.log(res)
                alert("Update Profile Success")
                var dataNew = JSON.stringify(res.data.Auth)
                localStorage.setItem("data",dataNew)
                localStorage.setItem("token",res.data.token)

            })
         }
    }
    return (
        <div className="col-sm-9">
            <h2>User Update!</h2>
            <div class="signup-form">
                <ErrorForm errors={error} />
                <form action="#" onSubmit={handleForm} encType="multipart/form-data">
                    <input type="text" placeholder="Name" name="name" onChange={handleInput} value={user.name} />
                    <input type="email" placeholder="Email Address" name="email" onChange={handleInput}  value={user.email} readOnly />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} value={user.pass}/>
                    <input type="text" placeholder="Phone" name="phone" onChange={handleInput} value={user.phone}/>
                    <input type="text" placeholder="Address" name="address" onChange={handleInput}value={user.address} />
                    <input type="file" name="avatar" onChange={handleUserInputFile}  />
                    <img src={`http://laravel8.test/laravel8/public/upload/user/avatar/${user.avatar}`}   width="200" />
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}
export default Update;
