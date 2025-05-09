import { useEffect, useState } from "react";
import axios from "axios";
import {useParams,useLocation,useNavigate} from "react-router-dom";
import Comment from "./Comment";
import ListCmt from "./ListComment";
import Rate from "./Rate";
import API1 from "../../API1";
function Detail(props){
    let params = useParams();
    // console.log(params)
    
    const [getData,setData] = useState('')
    // const [cmt,setCmt] = useState([])
    // const [idRely,setIdRely] = useState('')

    // var data = localStorage.getItem("data")
    //   if(data){
    //     data = JSON.parse(data)
    //     console.log(data)
    //   }
    const [dataCmt, setdataCmt] = useState([]);
    useEffect(()=>{
      // axios.get('http://laravel8.test/laravel8/public/api/blog/detail/'+ params.id)
      API1.get("/blog/detail/"+params.id)
      .then(res =>{
        // console.log(res.data.data)
        setData(res.data.data)
        // console.log(res.data.data.comment)
        setdataCmt(res.data.data.comment)
      })
      .catch(error => console.log(error))
    },[])
    function fetchData(){
      if(Object.keys(getData).length>0){
          return(
            <div className="single-blog-post">
                <h2 className="title text-center">{getData['title']}</h2>
                <h3>{getData['description']}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> {getData['created_at']}</li>
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
                  <img src={"http://laravel8.test/laravel8/public/upload/Blog/image/" + getData['image']} alt="" />
                </a>
                <p>{getData['content']}</p> <br />
                
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
          )
        
        
      }
    }
    
		// console.log(dataCmt)
		
		
		
		
	
		
    return (
      
      <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            
          </div>
          <div className="col-sm-9">
            <div className="blog-post-area">
            {
              fetchData()
            }
            </div>{/*/blog-post-area*/}
            <Rate idBlog = {params}/>
            <div className="socials-share">
              <a href><img src="images/blog/socials.png" alt="" /></a>
            </div>{/*/socials-share*/}
            <div className="media commnets">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-one.jpg" alt="" />
              </a>
              <div className="media-body">
                <h4 className="media-heading">Annie Davis</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className="blog-socials">
                  <ul>
                    <li><a href><i className="fa fa-facebook" /></a></li>
                    <li><a href><i className="fa fa-twitter" /></a></li>
                    <li><a href><i className="fa fa-dribbble" /></a></li>
                    <li><a href><i className="fa fa-google-plus" /></a></li>
                  </ul>
                  <a className="btn btn-primary" href>Other Posts</a>
                </div>
              </div>
            </div>{/*Comments*/}
           <ListCmt dataCmt ={dataCmt} />
            <Comment idBlog = {params} />
          </div>	
        </div>
      </div>
    </section>
          
          
      );
}
export default Detail;