import { useEffect, useState } from "react";
import API1 from "../../API1";
import { Link, useParams } from "react-router-dom";
import EditPro from "./EditPro";

function MyPro(props){
  
    const [data, setData] = useState([])
    const accessToken = localStorage.getItem("token");
    //config de gui token qua API
    let config = { 
      headers: { 
      'Authorization': 'Bearer '+ accessToken,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
      } 
    };
    useEffect(()=>{
      API1.get('user/my-product', config)
      .then(res=>{
      console.log(res.data.data)
      setData(res.data.data)
      })
    },[])
    // console.log(data[3]["id"])
    
    function fetchData(){
      if(Object.keys(data).length > 0){
        return Object.keys(data).map((key, index)=>{
          // console.log(data[key]['name']) 
          const image = data[key]['image']
          const id_user = data[key]['id_user']
          const id_pro = data[key]['id']
          // console.log(id_pro)
          let imageUrl =""
          // console.log(id_user)
          // console.log(image)
          if(image){
            let imageArr = JSON.parse(image)
            // console.log(imageArr)
            if(imageArr.length > 0){
              imageUrl = `http://laravel8.test/laravel8/public/upload/product/${id_user}/${imageArr[0]}`;
            }
          }
      function Del(){
        API1.get(`user/product/delete/${id_pro}`, config)
        .then(res => {
          console.log(res.data.data);
          setData(res.data.data);
        })
            .catch(err => console.log(err));
      }  
      
        return(
          <tr>

                  <td className="cart_product">
                    <a href><img src={imageUrl} alt="" style={{ width: "100px", height: "auto" }}/></a>
                  </td>
                  <td className="cart_description">
                    <h4><a href>{data[key]['name']}</a></h4>
                  </td>
                  <td className="cart_price">
                    <p>${data[key]['price']}</p>
                  </td>
                  <td className="cart_total">
                    <Link to={"/account/edit-product/"+id_pro}>Edit</Link> <a>|| </a>
                    <a href="#" onClick={()=>Del()}>Delete</a>
                  </td>
          </tr>
          )
        })
      }
    }
    return (
        <div className="col-sm-9">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Image</td>
                  <td className="description">Name</td>
                  <td className="price">Price</td>
                  <td className="total">Action</td>
                </tr>
              </thead>
              <tbody>
               
                  {fetchData()}
                
              </tbody>
            </table>
          </div>
        </div>
      );
}
export default MyPro;