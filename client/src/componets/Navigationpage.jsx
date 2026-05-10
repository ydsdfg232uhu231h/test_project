import { useLocation,NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import './NavigationPage.css';
import Searchbar from "./Searchbar";
import Loading from "./Loading";
import Setbar from "./Setbar";
import { useState } from "react";
import { useEffect } from "react";

export default function Navigationpage(){
    const [isauth,setisauth] = useState(true);
    const savetoken = localStorage?.getItem("token");
    useEffect(()=>{
        if (savetoken) {
            setisauth(true);
        }
        else{
            setisauth(false)
        }

    },[savetoken])
   const locate = useLocation();
    const [accountisclick,setaccountisclicked] = useState(false);
    const navigation = useNavigation();
    const navigate = useNavigate();
    function handlenav(){
        navigate("/home");
    }
    function handlemybar(){
        setaccountisclicked(!accountisclick);
    }
    
    
    return (
        <>
         <header>
            <ul>
                <li><h1 onClick={handlenav}>UpTrends</h1></li>
                <li> {locate.pathname !== "/trends" && <Searchbar/>} </li>
                <li><NavLink className={({isActive}) => (isActive? 'active': "")} to={'/home'} end>Home</NavLink></li>
                <li><NavLink  className={({isActive}) => (isActive? 'active': "")} to={'/trends'} >Trends</NavLink></li>
                {isauth && <li> <div id="mybar">
                        <h2 onClick={handlemybar}>&#128100;</h2>
                        {accountisclick? <Setbar/> : ""}
                    </div>    </li>}
                <li><NavLink to={'/menu'}  className={({isActive}) => (isActive? 'active': "")} id="menu">&#x2630;</NavLink></li>
                
            </ul>
        </header>
        <main>
        
            {navigation.state === "loading" && <Loading/>}
            <Outlet/> 
        </main>
        <footer>
            All rights resured
        </footer>
        </>
       
    );
}