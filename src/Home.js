import { useEffect, useState } from "react";
import MyPro from "./component/Product/MyPro";
import API1 from "./API1";
import { Link, useParams } from "react-router-dom";

function Home(){
  
  const [product, setProduct] = useState([])
  useEffect(()=>{
    API1.get('/product')
    .then(res=>{
      // console.log(res.data.data)
      setProduct(res.data.data)
    })
  },[]);
  console.log(product)
  function renderPro() {
    if (product.length > 0) {
      return product.map((value, key) => {
        const images = value.image ? JSON.parse(value.image) : []; // Chuyển chuỗi thành mảng
        const userId = value.id_user;
  
        return (
          <div className="col-sm-4" key={key}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">

                  {images.map((imgName, imgKey) => (
                    <div key={imgKey} style={{ display: 'inline-block', margin: '10px' }}>
                      <img
                        src={`http://laravel8.test/laravel8/public/upload/product/${userId}/${imgName}`}
                        width="100"
                        alt={value.name}
                      />
                    </div>
                  ))}
  
                  <h2>${value.price}</h2>
                  <p>{value.name}</p>
                  <a href="#" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart" />Add to cart
                  </a>
                </div>
  
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${value.price}</h2>
                    <p>{value.name}</p>
                    <form>
                      <input defaultValue={value.price} type="hidden" name="price" />
                      <input defaultValue={value.name} type="hidden" name="title" />
                      <button type="submit" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart" />Add to cart
                      </button>
                    </form>
                  </div>
                </div>
              </div>
  
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to={"/product-detail/"+value.id}><i className="fa fa-plus-square" />Product detail</Link>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-plus-square" />Add to compare</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  
  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">{/*features_items*/}
        <h2 className="title text-center">Features Items</h2>
        {renderPro()}
      </div></div>
  );
}
export default Home;
