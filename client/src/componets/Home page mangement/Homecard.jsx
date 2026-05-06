import React from 'react'
import './Homecard.css';
import { Link } from 'react-router-dom';



function Homecard({id,image, name }) {
 
  return (
    <div id='card'>
      <img src={image} alt="the image not found" />
        <Link to={`/${id}`} id='cardhover'>
          <h1>{name}</h1>
        </Link>
    </div>
  )
}

export default Homecard