import React from 'react'
import NavBar from '../../navBar/NavBar'
import Products from "../../catalogue/products/container/Products.jsx";
import './Home.css'; 

const Home = () => {

  console.log('francisco');
    return (
        <>
        <NavBar color='black'/>
        <div className='home'>
          <div>
            <Products />
          </div>
        </div>
        </>
    )
}

export default Home;
