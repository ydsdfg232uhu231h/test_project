import { Link } from "react-router";
import React from "react";
import './MenuPage.css'
export default function MenuPage(){
     const [isauth,setauth] = React.useState(false);
    const savedata = localStorage?.getItem('token');
    React.useEffect(()=>{
        if (savedata) {
            setauth(true);
        }
        else{
            setauth(false);
        }
    },[])
    return (<>
        <ul id="ulmenu">
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/trends'}>Trends</Link></li>
            <li><Link to={"/profile"}>Profile</Link></li>
            {isauth? <li><Link to={"/logout"}>Logout</Link></li>
               : <li><Link to={'/account/login'}>Login</Link></li>}
        </ul>
    </>);
}