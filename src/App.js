import logo from './logo.svg';
import './App.css';
import Head from './component/Layout/Head';
import Menuleft from './component/Layout/Menuleft';
import Footer from './component/Layout/Footer';
import { Component } from 'react';
import { useLocation } from 'react-router-dom';
import MenuleftAcc from './component/Layout/MenuleftAcc';

function App(props) {
  let params1 = useLocation();
  console.log(params1)
  return (
    <div>
      <Head/>
      <section>
        <div className='container'>
          <div className='row'>
            {params1['pathname'].includes("account")?<MenuleftAcc/>: <Menuleft/> }

            {props.children}
          </div>

        </div>
      </section>
      <Footer/>
    </div>

  );
}

export default App;
