import RoutesDefine from './Routers/RoutersNavigation';
import './App.css';
import { createContext, useState } from "react";


export const ProductContext = createContext({

});



export default function App(){
  const [data, setdata] = useState([]);
  return (<>
  <ProductContext.Provider value={{data, setdata}}>
    <RoutesDefine />
    </ProductContext.Provider>
  </>
      
  );
}