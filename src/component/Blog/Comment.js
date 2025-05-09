import { useEffect, useState } from "react";
import API1 from "../../API1";
import axios from "axios";
import { useParams } from "react-router-dom";

function Comment(props){
    const [inputs, setInput] = useState ('');
    const [err, setErr] = useState('')
    let params = useParams();

    // console.log(props.idBlog.id) 
    function handleInput(e){
      setInput(e.target.value)
    }
    function handleCommentSubmit(e){
        e.preventDefault();
        const checklogin = localStorage.getItem("Checklogin");
        
        // console.log(checklogin)
        if(checklogin){

          console.log(inputs)
          if(inputs == ""){
            setErr("Vui long nhap binh luan");
          }else{
            setErr("");
            var data = localStorage.getItem("data")
            if(data){
              data = JSON.parse(data)
              console.log(data)
            }
            const accessToken = localStorage.getItem("token");
            //config de gui token qua API
            let config = { 
              headers: { 
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
              } 
            };
            const formData = new FormData();
            formData.append('id_blog',props.idBlog.id);
            formData.append('id_user',data.id);
            formData.append('id_comment',0);
            formData.append('comment', inputs);
            formData.append('image_user',data.image);
            formData.append('name_user',data.name);
            API1.post('blog/comment/'+params.id, formData, config)
            .then(res=>{
                console.log(res)
            })
          }
        }else{
            console.log("Vui long dang nhap de binh luan" );
        }
    }
    return(
        
              <div className="row">
                <div className="col-sm-8">
                  <h2>Leave a replay</h2>
                  <form onSubmit= {handleCommentSubmit} encType="multipart/form-data">
                    <textarea name="message" rows={11}  onChange={handleInput} >{inputs}</textarea>
                    <p>{err}</p>
                    <button type="submit" className="btn btn-primary" >Post Comment</button>
                
                  </form>
                </div>
              </div>
            
    )
}
export default Comment;