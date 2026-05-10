import React from 'react'
import "./Setbar.css";
import { Link } from 'react-router-dom';
import TokenExpired from './TokenExpired';
function Setbar() {
   const [isauth,setauth] = React.useState(true);
   const userdata = JSON.parse(localStorage?.getItem('usersdata'));
    const savetoken = localStorage?.getItem('token');
    const timerrefs = React.useRef(null);
    const [visibility, setvisibility] = React.useState(true);
    React.useEffect(()=>{
        if (TokenExpired(savetoken)) {
            setauth(false);
        }
        else{
            setauth(true);
        }
    },[]);
 
  function handleMouseenter() {
    setvisibility(true);
    if (timerrefs.current) {
      clearTimeout(timerrefs.current);
    }
  }
  function handlemyauth(){
    setvisibility(false);
  }
  function handleMouseLeave() {
    timerrefs.current = setTimeout(() => {
      setvisibility(false);
    }, 6000)
  }
  return (
    <>
    {visibility &&
        <>
          <span id='squarebox'>
          </span>
          <div
            id='setbar'
            onMouseEnter={handleMouseenter}
            onMouseLeave={handleMouseLeave}
          >
            <ol>
              <li>{userdata.email}</li>
              <li><Link to={'/account'}>Profile</Link></li>
              <li><Link to={"/contact"}>Contact us</Link></li>
              {isauth ? <li className='red'><Link onClick={handlemyauth} to={"/logout"}>Logout</Link></li>: <li className='green'><Link onClick={handlemyauth} to={`/account/login`}>Login</Link></li> }
            </ol>

            </div>
        </>
      }

    </>
  )
}

export default Setbar