import React from 'react'
import "./Homecardmanagement.css"
// import useHomeloader from './Homeloader'
import Homecard from './Homecard';
import { useNavigation } from 'react-router-dom';
import Loading from '../Loading';
function Homecardmanagement({mydata}) {
    const navigation = useNavigation();
    if (navigation.state === "loading") {
      return <Loading/>
    }
   
  return (
    <>
    <div id='homemanagecontainer'>
      <div id='dul'>
       <ol id='manages'>
        {mydata?.map((prod)=> (
            <li key={prod.id}><Homecard id={prod.id} image={prod.image} name={prod.name}/></li>
        ))}
        </ol>

      </div>
        <span id='extarline'></span>
    </div>
    </>
  )
}

export default Homecardmanagement