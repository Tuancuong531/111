import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react"; 
import API1 from '../../API1';
import { useParams } from 'react-router-dom';

function Rate(props){
  const [rating, setRating] = useState(0)
  const [tbrate, setTbrate] = useState('')
  const [averageRating, setAverageRating] = useState(0)
  let params = useParams();
      // console.log(props) 
  useEffect(()=>{
    API1.get('blog/rate/'+params.id)
    .then(res=>{
      // console.log(res.data.data)
      setTbrate(res.data.data)
      if(tbrate.length > 0){
        // console.log(tbrate.length)
        //tbrate.map((value,key)=>{
            // console.log(key)
            // console.log(value.rate)
        //})
        // console.log(tbrate[0]["rate"])
        const total = tbrate.reduce((sum,item)=>sum + item.rate,0)
        const average = total / tbrate.length
        // console.log(average)
        setAverageRating(average);
      }  
    })
  },[])
    
    
    

    
    function changeRating(newRating,name){
      // - xu ly logic
      // - xu ly api
      const checklogin = localStorage.getItem("Checklogin");
      if(!checklogin){
        alert("Vui long Login de danh gia")
      }else{
        setRating(newRating)
        var data = localStorage.getItem("data")
        if(data){
          data = JSON.parse(data)
          // console.log(data)
        }
        const accessToken = localStorage.getItem("token");
        let config = { 
          headers: { 
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
          }
          
        };
        const formData = new FormData();
          formData.append('blog_id',props.idBlog.id);
          formData.append('user_id',data.id);
          formData.append('rate',rating);
          API1.post('blog/rate/'+params.id, formData, config)
          .then(res=>{
              console.log(res)
          }) 

      }      
    }
    return(
        <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                <StarRatings
                  rating={averageRating}
                  starRatedColor="yellow"
                  changeRating={changeRating}
                  numberOfStars={5}
                  name='rating'
                />
                </li>
                <li className="color">(5 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
              </ul>
            </div>
    )
}
export default Rate;