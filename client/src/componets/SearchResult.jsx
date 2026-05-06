import React from 'react'
import "./SearchResult.css"
import { Link } from 'react-router-dom'
function SearchResult({ searchdata }) {
  return (
    <>
      <ul id='mysearch'>
        {searchdata?.map((mydata) =>
        (<li key={mydata.id}>
          <Link to={`/search/${mydata.id}`}> 
          <img src={mydata.image} alt="The image is not found" />
          <div>
            <h1>{mydata.name}</h1>
            <h2>{mydata.description}</h2>
          </div>
          </Link>
        </li>))}

      </ul>
    </>
  )
}

export default SearchResult