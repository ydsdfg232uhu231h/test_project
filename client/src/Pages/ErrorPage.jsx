import "./Errorpage.css";

function Errorpage({message}) {
    
  return (
    <div>
        <h1 id="error">&#x26A0;{message|| "This is an error page"}</h1>
    </div>
  )
}

export default Errorpage;