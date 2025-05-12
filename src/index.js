import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Head from './component/Layout/Head';
import Home from './Home';
import Login from './component/member/Login';
import Detail from './component/Blog/Detail';
import Blog from './component/Blog/Blog';
import Register from './component/member/Register';
import Comment from './component/Blog/Comment';
import ListCmt from './component/Blog/ListComment';
import Rate from './component/Blog/Rate';
import Update from './component/member/Update';
import AddPr from './component/Product/AddPr';
import MyPro from './component/Product/MyPro';
import EditPro from './component/Product/EditPro';
import Prodetail from './component/Product/Prodetail';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='/blog/list' element={<Blog/>} />
          <Route path='/blog/detail/:id' element={<Detail/>} />
          {/* <Route path='/cmt' element={<Comment/>} /> */}
          {/* <Route path='/listcmt' element={<ListCmt/>} /> */}
          {/* <Route path='/rate' element={<Rate/>} /> */}
          <Route path='/account/update' element={<Update/>} />
          <Route path='/account/add-product' element={<AddPr/>} />
          <Route path='/account/my-product/' element={<MyPro/>} />
          <Route path='/account/edit-product/:id' element={<EditPro/>} />
          <Route path='/product-detail/:id' element={<Prodetail/>} />





        </Routes>
      </App>
    </BrowserRouter>
     

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
