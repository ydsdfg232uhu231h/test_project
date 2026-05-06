import React from 'react'

function Formater({price, contry}) {
    switch(contry){
        case "India":{
            const a = (price*93.96);
            return a.toFixed(2);
        };
        case "China":{
            const a = (price*6.89);
            return a.toFixed(2);
        };
        case "Japan":{
            const a = (price*158.62);
            return a.toFixed(2);
        };
        case "Russia":{
            const a = (price*82.12);
            return a.toFixed(2);
        };
        case "Africa":{
            const a = (price*16.87);
            return a.toFixed(2);
        };
        case "Europe":{
            const a = (price*0.86);
            return a.toFixed(2);
        };
        case "Sri Lanka":{
            const a = (price*313.54);
            return a.toFixed(2);
        };
        case "Australia":{
            const a = (price*1.43);
            return a.toFixed(2);
        };
        default:
            return price;
    }
}

export default Formater;