import {
    useEffect,
    useState
 } from "react";
 import ErrorForm from "../Error/FormError";
 import API1 from "../../API1";
import EditPro from "./EditPro";
 
 function AddPr() {
    const [error, setErr] = useState("");
    const [getFile, setFile] = useState("")
 
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [data, setData] = useState({
       category: '',
       brand: '',
       name: '',
       images: [],
       price: '',
       status: '1',
       sale: '',
       detail: '',
       company: '',
    });
    useEffect(() => {
       API1.get('/category-brand')
          .then(res => {
             // console.log(res.data.brand)
             setCategory(res.data.category);
             setBrand(res.data.brand);
          });
    }, []);
    // console.log(brand)
    function handleInput(e) {
       const nameInput = e.target.name;
       const value = e.target.value;
 
       setData(state => ({
          ...state,
          [nameInput]: value
       }));
    }
 
    function handleInputFile(e) {
       setFile(e.target.files)
       console.log(e.target.files)
    }
 
    function handleForm(e) {
       e.preventDefault();
       const errSubmit = {}
       let flag = true;
 
       if (data.name == "") {
          errSubmit.name = "Vui long nhap Name"
          flag = false;
       }
       if (data.price == "") {
          errSubmit.price = "Vui long nhap Price"
          flag = false;
       }
       if (data.category == "") {
          errSubmit.category = "Vui long chon Category"
          flag = false;
       }
       if (data.brand == "") {
          errSubmit.brand = "Vui long chon Brand"
          flag = false;
       }
       if (data.status === "0" && data.sale == "") {
          errSubmit.sale = "Vui long nhap Sale"
          flag = false;
       }
       if (data.company == "") {
          errSubmit.company = "Vui long nhap Company"
          flag = false;
       }
       if (data.detail == "") {
          errSubmit.detail = "Vui long nhap Detail"
          flag = false;
       }
       if (getFile == "") {
          errSubmit.getFile = "Vui long chon anh";
          flag = false
       } else {
          let choPhep = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
          for (let i = 0; i < getFile.length; i++) {
             let getSize = getFile[0]['size'];
             let getName = getFile[0]['name']
             let sentences = getName.split(".");
 
             if (!choPhep.includes(sentences[1])) {
                errSubmit.getName = "Duoi anh k phu` hop"
                flag = false
             } else if (getSize > 1024 * 1024) {
                errSubmit.getSize = "Dung luong anh lon hon 1MB"
                flag = false
             }
          }
 
       }
 
       if (!flag) {
          setErr(errSubmit)
       } else {
          setErr({});
          const accessToken = localStorage.getItem("token");
          let config = {
             headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
             }
          }
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('price', data.price);
          formData.append('category', data.category);
          formData.append('brand', data.brand);
          formData.append('company', data.company);
          formData.append('detail', data.detail);
          formData.append('status', data.status);
          formData.append('sale', data.sale);
 
          for (let i = 0; i < getFile.length; i++) {
             formData.append("file[]", getFile[i]);
             
          }
 
          API1.post('user/product/add', formData, config)
             .then(res => {
                console.log(res)
                console.log("Sản phẩm đã được thêm thành công:", res);
         })
       }
 
    }
        
        
        
        return (
            <div className="col-sm-9">
               <h2>Create Product!</h2>
               <div class="signup-form">
                  <ErrorForm errors = {error}/>
                  <form onSubmit={handleForm} action="#"  encType="multipart/form-data">
                     <input type="text" placeholder="Name" name="name" onChange={handleInput}  />
                     <input type="number" placeholder="Price" name="price" onChange={handleInput}  />
                     <select   name="category" onChange={handleInput} >
                        <option value="">Please Choose Category</option>
                        {category.map((c) => (
                        <option  value={c.id}>{c.category}</option>
                        ))}                     
                     </select>
                     <select name="brand" onChange={handleInput} >
                        <option value="">Please Choose Brand</option>
                        {brand.map((b) => (
                        <option  value={b.id}>{b.brand}</option>
                        ))}  
                     </select>
                     <select name="status" value={data.status} onChange={handleInput} >
                        <option value="0">Sale</option>
                        <option value="1">New</option>
                     </select>
                     {data.status === "0" && (
                     <div>
                        <input type="number" placeholder="0" name="sale" value={data.sale} onChange={handleInput}/>
                        <span>%</span>
                     </div>
                     )}
                     <input type="text" placeholder="Company Profile" name="company" onChange={handleInput} />
                     <input type="file" name="avatar" onChange={handleInputFile}  multiple/>
                     <textarea name="detail" placeholder="Detail"onChange={handleInput}/>
                     <button type="submit">Create</button>
                  </form>
               </div>
            </div>
            
        );
                    
    }
    export default AddPr;