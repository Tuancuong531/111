import { useEffect, useState } from "react";
import API1 from "../../API1";
import { useParams } from "react-router-dom";

function ListCmt(props){
  // console.log(props.dataCmt)
  const dataCmt = props.dataCmt
  // console.log(dataCmt)
  
  if(dataCmt.length > 0){
    return dataCmt.map((value,key)=>{
      return(
        <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src={value.image_user} alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />{value.name_user}</li>
                      <li><i className="fa fa-clock-o" />{value.created_at}</li>
                      <li><i className="fa fa-calendar" />{value.updated_at}</li>
                    </ul>
                    <p>{value.comment}</p>
                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
      )
    })
  }
    return(
        <div className="response-area">
              <h2>3 RESPONSES</h2>
              <ul className="media-list">
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-four.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
              </ul>					
            </div>
    )
}
export default ListCmt;