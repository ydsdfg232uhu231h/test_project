import Submitbtn from '../componets/Submitbtn';
import './SignIn.css'
import React from 'react';
import validationpassword from '../componets/Util/Validation';
import { Link, useNavigate } from 'react-router-dom';
import Success from '../componets/Success';
import Errors from '../componets/Error';
import Loading from '../componets/Loading';

export default function SignIn() {
  const initialdata = { firstname: "", lastname: "", phone: "", gender: "", email: "", password: "", confirmpassword: "", role: "", termsagree: false };
  const [signformdata, setsignformdata] = React.useState(initialdata);
  const [errordata, seterrordata] = React.useState(initialdata);
  const [error, seterror] = React.useState("");
  const [issignsuccess, setissignsuccess] = React.useState({issign: false, signmessage: ""});
  const navigate = useNavigate();
 
  function Navhone() {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    setissignsuccess(true);
    return () => {
      clearTimeout(timer);
    }
  }

   async function handleSubmit(data) {
    data.preventDefault();
    try {
      const a = new FormData(data.currentTarget);
      const b = Object.fromEntries(a.entries());
      const isagreed = (b.termsagree !== 'on') ? 'off' : "on";
      console.log(b);
      b.termsagree = isagreed;
      if (!b.role) {
         b.role = "student";
      }
      if (!b.termsagree || b.termsagree === "on") {
         b.termsagree = true;
      }

      const payload = { firstname: b.firstname, lastname: b.lastname, email: b.email, password: b.password,confirmpassword: b.confirmpassword, gender: b.gender, role: b.role, phone: b.phone, termsagree: b.termsagree }
      const validerror = validationpassword(payload);
      seterrordata({ firstname: validerror.firstnames, lastname: validerror.lastnames, email: validerror.emails, password: validerror.passwords,confirmpassword: validerror.confirmpasswords, gender: validerror.genders, role: validerror.roles, phone: validerror.phones, termsagree: validerror.termsagrees });
      
      const response = await fetch("http://localhost:3000/api/account/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(payload)
      });
      const datares = await response.json();
    
      // console.log('defaultdatasignin', payload);
      if (response.status === 409 ) {
        seterror(datares);
      }
      if (!response.ok) {
        return;
      }
      if (response.ok) {
        setissignsuccess({issign: true, signmessage: datares});
        Navhone();
      }
      console.log(datares);
      } catch (error) {
      console.log('error:', error);

    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignformdata(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  //  8 inputs

  return (<>
    {!issignsuccess.issign ?

      <div className="box1">
        <div className="box2">
          
            <h1>Sign In</h1>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="firstname">First Name</label>
              {(errordata.firstname !== "") ? <h2>{errordata.firstname}</h2> : null}
              <input type="text" name="firstname" placeholder='First Name' value={signformdata.firstname} onChange={handleChange} />
              <label htmlFor="lastname">Last Name</label>
              {(errordata.lastname !== "") ? <h2>{errordata.lastname}</h2> : null}
              <input type="text" name="lastname" value={signformdata.lastname} onChange={handleChange} placeholder='Last Name' />
              <label htmlFor="gender">Gender</label>
              {(errordata.gender !== "") ? <h2>{errordata.gender}</h2> : null}
              <div id="gender">
                <div className="Gender">
                  <input type="radio" name="gender" value='male' className="Sender" />
                  <label htmlFor="gender">Male</label>
                  <input type="radio" name="gender" value='female' className="Sender" />
                  <label htmlFor="gender">Female</label>
                  <input type="radio" name="gender" value='other' className="Sender" />
                  <label htmlFor="gender">Other</label></div>
              </div>

              <label htmlFor="email">Email:</label>
              {(errordata.email !== "") ? <h2>{errordata.email}</h2> : null}

              <input type="text" name="email" value={signformdata.email} onChange={handleChange} placeholder='Email' />
              <label htmlFor="password">Password:</label>
              {(errordata.password !== "") ? <h2>{errordata.password}</h2> : null}
              <input type="text" name="password" id='password' value={signformdata.password} onChange={handleChange} placeholder='Password' />
              <label htmlFor="confirmpassword">Confirm Password:</label>
              {(errordata.confirmpassword !== "") ? <h2>{errordata.confirmpassword}</h2> : null}
              <input type="text" id='confirmpassword' name="confirmpassword" value={signformdata.confirmpassword} onChange={handleChange} placeholder='Confirm Password' />

              <label htmlFor="phone">Phone No:</label>
              {(errordata.phone !== "") ? <h2>{errordata.phone}</h2> : null}
              <input type="tel" id='phone' name="phone" placeholder='+91 0000000000' value={signformdata.phone} onChange={handleChange} maxLength={10} minLength={8} />
              <div className="control inputani">
                <label htmlFor="role">How we address you?</label>
                {(errordata.role !== "") ? <h2>{errordata.role}</h2> : null}
                <select id="role" name="role" onChange={handleChange} className='inputani' required>
                  <option value="student" defaultChecked>Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="employee">Employee</option>
                  <option value="founder">Founder</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {(errordata.termsagree !== "") ? <h2>{errordata.termsagree}</h2> : null}
              <label htmlFor="termsagree" id='agreesarea'><input type='checkbox' name="termsagree" id='termsagree' onChange={handleChange} /> Do you agree to terms and condition</label>
              {error && <Errors message = {error.message}/>}
              {<Submitbtn>Sign</Submitbtn>}

              <h3>If you have any account: <Link to={'/account/login'}>Login up</Link></h3>
            </form>
          
        </div>
      </div>:
      <>
      <Success message={issignsuccess.signmessage}/> 
      <Loading/>
      </>
    }
    
  </>);
}