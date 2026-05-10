import React from 'react';
import "./Welcomepage.css";
import { useNavigate } from 'react-router-dom';
function Welocomepage() {
  const savetoken = localStorage?.getItem('token');
  const navigate = useNavigate();
  function NavtoHome(){
    navigate('/home');
  }
  function NavtoLogin(){
    navigate('/account/login');
  }
  return (
    <div className='welcome'>
      <h1>Welcome to Uptrands</h1>
      <h4>This is the website where we share information on trending products</h4>
      <div>

      {savetoken? <button onClick={NavtoHome}>Home page</button>:<button onClick={NavtoLogin}>login</button>}
      
      </div>
    </div>

  )
}

export default Welocomepage