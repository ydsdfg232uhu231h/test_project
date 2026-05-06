import "./Submitbtn.css";
import {useFormStatus } from 'react-dom';
export default function Submitbtn({children}){
    const {pending} = useFormStatus();   
    return (<button type="submit" id="Submit" disabled = {pending}>{pending? "Pending": children}</button>);
}