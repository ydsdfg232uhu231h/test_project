import { Fragment } from 'react/jsx-runtime';
import './Loginpage.css';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Errors from '../componets/Error';
import Success from '../componets/Success';
import Submitbtn from '../componets/Submitbtn';
import Loading from '../componets/Loading';
import TokenExpired from '../componets/TokenExpired';

/*
correct email and password for login 
    email: dfwef3213421@gmail.com
    password: AAAA6ef23f789&&&&
*/

export default function LoginPage() {

    const [error, seterror] = useState(null);
    const [formerr, setformerr] = useState({ email: false, password: false });
    const [locals,setlocals] = useState({email: "", password: ""});
    const [isloginsuccess, setisloginsuccess] = useState({islogin: false, loginmessage: ""});
    const navigate = useNavigate();


    function Navhome() {
                    const timer = setTimeout(() => {
                        return navigate("/");
                    }, 3000);
                   return ()=>clearTimeout(timer);
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const loginformdata = new FormData(event.target);
        const data = Object.fromEntries(loginformdata.entries());
        setformerr({ email: false, password: false })
        console.log('data:', data);
        try {
                
            if (data.email.length === 0 || data.password.length === 0) {
                console.log('email', data.email.length, "\n Password", data.password.length);
                if (data.email.length === 0 && data.password.length === 0) {
                    return setformerr({ email: true, password: true })
                }
                if (data.email.length === 0) {
                    return setformerr({ email: true, password: false });
                }
                else if (data.password.length === 0) {
                    return setformerr({ password: true, email: false });
                }
                throw new Error(JSON.stringify({ error: "Incorrect Data", message: "You are not allowed to pass incorrect details" }));
                
            }
            seterror(null);
            const response = await fetch('http://localhost:4000/account/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });
            const dataresponse = await response.json();
            console.log(dataresponse)
            if (!response.ok) {
                throw new Error(JSON.stringify(dataresponse));
            }
            
            if (response.ok) {
                const userdata = JSON.stringify(dataresponse.userdata);
                localStorage?.setItem("usersdata", userdata);
                localStorage?.setItem("token", dataresponse.access_token);
                setisloginsuccess({islogin: true, loginmessage: "successfully login in page"})
                Navhome();
            }
            if (TokenExpired(dataresponse.access_token)) {
                console.log("your token have been expired")
                setisloginsuccess({islogin: false, loginmessage: ""});
            }



        } catch (myerrors) {

            console.log('Error: ', myerrors.message);
            const jsonerror = JSON.parse(myerrors.message);
            seterror(jsonerror);


        }
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setlocals(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

    return (
        <Fragment>
            {!isloginsuccess.islogin && <div className="box1">
                <div className="box2">

                    <h1>Login In</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="email">Email:</label>
                        {formerr.email && <h2>Incorrect Email</h2>}

                        <input type="email" onChange={handleChange} value={locals.email} name='email' placeholder='Enter Your Email' />
                        <label htmlFor="password">Passward:</label>
                        {formerr.password && <h2>Incorrect Password</h2>}
                        <input type="text" onChange={handleChange} value={locals.password} name='password' placeholder='Enter Your Passward' />

                        <Submitbtn>Login</Submitbtn>
                        
                        {error && <Errors error={error.error} message={error.message} />}

                        <h3>If you don't have any account: <Link to={'/account/sign'}>Sign up</Link></h3>
                    </form>

                </div>
            </div>}
            {isloginsuccess.islogin && <>
                                <Success message={isloginsuccess.loginmessage} />
                                <div id='laodingcenter'>
                                <Loading/>

                                </div>
                                </>}
        </Fragment>
    );
}