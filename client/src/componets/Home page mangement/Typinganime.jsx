import React from 'react'
import "./Typinganime.css";

 function Typinganime() {
    const [typing,settyping] = React.useState(0);
    let i =1;
    const productMessages = [
            "Fresh & Delicious Food - Taste Happiness in Every Bite!",
            "Upgrade Your Life with the Latest Smartphones!",
            "Powerful Computers for Work, Gaming, and Creativity!",
            "Stylish Furniture to Transform Your Home!",
            "Healthy Food, Happy Life - Eat Fresh Daily!",
            "Next-Gen Mobile Technology at Your Fingertips!",
            "High-Performance Computers Built for Speed!",
            "Modern Furniture for a Comfortable Lifestyle!",
            "Delicious Meals Made with Love and Quality Ingredients!",
            "Smartphones That Keep You Connected Everywhere!",
            "Smart Computers for Smart People!",
            "Furniture That Adds Elegance to Every Room!",
            "Hot, Fresh, and Tasty Food Delivered to You!",
            "Experience Innovation with Premium Mobile Devices!",
            "Reliable Computers for Study, Office, and Gaming!",
            "Comfortable Furniture Designed for Modern Living!",
            "Satisfy Your Cravings with Our Delicious Food!",
            "Discover the Power of the Latest Smartphones!",
            "Advanced Computers for Maximum Productivity!",
            "Beautiful Furniture to Make Your House a Home!"
        ];
        React.useEffect(()=>{
       
        const interval = setInterval(()=> {
           settyping(((i++) % productMessages.length));
        },4000);
        return ()=> clearInterval(interval);
            
        },[]);
    

  return (
    <div id='typeanimation'>
        <h1>{productMessages[typing]}</h1>
    </div>
  )
}

export default Typinganime