import { useEffect, useState } from "react"
import TokenExpired from "../componets/TokenExpired";
import { useNavigate } from "react-router-dom";
import NoAuthanticated from "../Pages/NoAuthanticated";

function Protectedroutes({children}) {
    const savetoken = localStorage?.getItem("token");
    const [isauth,setisauth] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
            if (savetoken) {
                setisauth(true);
            }
            else{
                setisauth(false);
            }
            if (TokenExpired(savetoken)) {
                setisauth(false);
                navigate("/logout");
            }
            if (isauth === false) {
               return navigate('/login');
            }

    },[savetoken]);
    return (

    <>
    {isauth? children: <NoAuthanticated/>}
    </>
  )
}

export default Protectedroutes