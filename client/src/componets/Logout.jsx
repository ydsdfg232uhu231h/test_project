import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
     const navigate = useNavigate();
        localStorage.removeItem("token");
        localStorage.removeItem("usersdata");
        useEffect(()=>{
            navigate('/account/login');
        },[navigate])
}