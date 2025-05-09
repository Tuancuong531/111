import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Blog(props){
  const [getItem,setItem] = useState([]);

   useEffect(()=>{
          axios.get('http://laravel8.test/laravel8/public/api/blog')
          .then(res =>{
              // console.log(res.data.blog.data)
              // console.log(res.data.blog.data)

              // data.blog.data:ket qua cuoi cung
              setItem(res.data.blog.data)
          })
          .catch(error => console.log(error))
          
      },[])
      function fetchData(){
        if (getItem.length > 0){
          return getItem.map((value,key)=>{
            // console.log(value.title)
            // console.log(getItem.data)
            // console.log(getItem.data[0]['image'])
            // console.log(getItem.data[0]['content'])
            // console.log(getItem.data[0]['id'])
            return(
              
            <div className="single-blog-post">
            <h3>{value['title']}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" /> Mac Doe</li>
                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                <li><i className="fa fa-calendar" /> {value['updated_at']}</li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href>
            <img src={"http://laravel8.test/laravel8/public/upload/Blog/image/" + value['image'] } />
            </a>
            <p>{value['description']}</p>
            {/* <a className="btn btn-primary" href>Read More</a> */}
            <Link to={"/blog/detail/" + value.id} >Read more</Link>
            
          </div>
            )
          })
        }
        
    }


    return (
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          
          {
            fetchData()
          }
          <div className="pagination-area">
            <ul className="pagination">
              <li><a href className="active">1</a></li>
              <li><a href>2</a></li>
              <li><a href>3</a></li>
              <li><a href><i className="fa fa-angle-double-right" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    
    );
  }
  export default Blog;