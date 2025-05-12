import { useEffect, useState } from "react";
import ErrorForm from "../Error/FormError";
import API1 from "../../API1";
import { useParams } from "react-router-dom";

function EditPro(props){
   let params = useParams();
   // console.log(params.id)
    const [error, setErr] = useState("")
    const [getFile, setFile] = useState("")

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [data, setData] = useState({
       id_category: '',
       id_brand: '',
       name: '',
       images: [],
       price: '',
       status: '1',
       sale: '',
       detail: '',
       company_profile: '',
    });
   const accessToken = localStorage.getItem("token");
          let config = {
             headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
             }
            }
   useEffect(()=>{
      API1.get("/user/product/"+params.id,config)
      .then(res =>{
         console.log(res.data.data)
         setData(res.data.data)
      })
   },[])
   useEffect(() => {
       API1.get('/category-brand')
          .then(res => {
            //  console.log(res.data.category)
             setCategory(res.data.category);
             setBrand(res.data.brand);
          });
   }, []);
   const [avatarCheckBox, setAvatarCheckBox] = useState([]);   
   const image = data.image
   function handleCheck(e) {
      const { value, checked } = e.target;
    
      let newCheckBox;
      if (checked) {
        newCheckBox = [...avatarCheckBox, value];
      } else {
        newCheckBox = avatarCheckBox.filter(image => image !== value);
      }
    
      setAvatarCheckBox(newCheckBox);
      console.log("New state will be:", newCheckBox);
    }
    
    function handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
  
        setData(state => ({...state,[nameInput]: value}));
     }
  
     function handleInputFile(e) {
      setFile(Array.from(e.target.files));
      console.log(e.target.files)
     }
     function handleForm(e){
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
       if (data.id_category == "") {
          errSubmit.id_category = "Vui long chon Category"
          flag = false;
       }
       if (data.id_brand == "") {
          errSubmit.id_brand = "Vui long chon Brand"
          flag = false;
       }
       if (data.status === "0" && data.sale == "") {
          errSubmit.sale = "Vui long nhap Sale"
          flag = false;
       }
       if (data.company_profile == "") {
          errSubmit.company_profile = "Vui long nhap Company"
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
             let getSize = getFile[i]['size'];
             let getName = getFile[i]['name']
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
         let userData = localStorage.getItem("data");
         if (userData) {
            userData = JSON.parse(userData);
               // console.log(userData)
         }
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
                  formData.append('category', data.id_category);
                  formData.append('brand', data.id_brand);
                  formData.append('company', data.company_profile);
                  formData.append('detail', data.detail);
                  formData.append('status', data.status);
                  // formData.append('sale', data.sale);
         
                  for (let i = 0; i < getFile.length; i++) {
                     formData.append("file[]", getFile[i]);
                  }
                  for (let i = 0; i < avatarCheckBox.length; i++) {
                     formData.append("avatarCheckBox[]", avatarCheckBox[i]);
                  }          
                  API1.post('user/product/update/' + params.id, formData, config)
                  .then(res => {
                     console.log(res);
                  })
                  .catch(error => {
                     console.error("Lỗi từ server:", error.response?.data?.message);
                  });
      }
      
     }   
     return (
        <div className="col-sm-9">
           <h2>Edit Product!</h2>
           <div class="signup-form">
              <ErrorForm errors = {error}/>
              <form onSubmit={handleForm} action="#"  encType="multipart/form-data">
                 <input type="text" placeholder="Name" name="name" value={data.name}onChange={handleInput}  />
                 <input type="number" placeholder="Price" name="price" value={data.price} onChange={handleInput}  />
                 <select value={data.id_category}  name="id_category" onChange={handleInput} >
                    <option >Please Choose Category</option>
                    {category.map((c) => (
                    <option  value={c.id}>{c.category}</option>
                    ))}                     
                 </select>
                 <select value={data.id_brand} name="id_brand" onChange={handleInput} >
                    <option >Please Choose Brand</option>
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
                 <input type="text" placeholder="Company Profile" name="company_profile" value={data.company_profile} onChange={handleInput} />
                 <input type="file" name="images" onChange={handleInputFile}  multiple/>
                 {Array.isArray(image) && image.map((value, key) => (
                  <div  style={{ display: 'inline-block', margin: '10px' }}>
                      <img src={`http://laravel8.test/laravel8/public/upload/product/${data.id_user}/${value}`} width="50"/>
                     <div>
                        <input type="checkbox" name="check" value={value} 
                        onChange={handleCheck} 
                        checked={avatarCheckBox.includes(value)}
                        />
                     </div>
                  </div>
                  ))}
                 <textarea name="detail" value={data.detail}placeholder="Detail"onChange={handleInput}/>
                 <button type="submit">Update</button>
              </form>
           </div>
        </div>
    );  
}
export default EditPro;