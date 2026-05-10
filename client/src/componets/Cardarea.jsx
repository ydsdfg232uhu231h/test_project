import "./Cardarea.css";
import { useParams, useRouteLoaderData } from "react-router-dom";
import RatingSystem from "./Design for website/Star";
// import Formater from "./Util/Formater";
function Cardarea() {
    const { id } = useParams();
    // card id
    const carddata = useRouteLoaderData('root');
    console.log(carddata)
    function finddata(prodid) {
        return prodid.id === id;
    }
    const productdata = carddata[carddata.findIndex(finddata)];
    function handleopenflipkartlinklink(){
        window.open(productdata?.flipkartlink);
    }
    function handleopenamazonlink(){
        window.open(productdata?.amazonlink);
    }

    return (
        <>
            <div className="cardareacontainer">
                <img src={productdata?.image} alt="image not found" />
                <h2>{productdata?.name}</h2>
                <h3>{productdata?.description}</h3>
                <RatingSystem rating={productdata?.rate} />
                <div className="pricesin">
                <div className={`pricein ${productdata?.amazon < productdata?.flipkart? "active": ""} `} onClick={handleopenamazonlink} >
                    
                    <h3>Amazon</h3>
                    {/* <h4>Price: &#8377;<Formater price={productdata?.amazon} contry={"India"} /></h4> */}
                    <h4>Price: &#8377; {productdata?.amazon}</h4>

                </div>
                <div className= {`pricein ${productdata?.flipkart < productdata?.amazon? "active": ""}`} onClick={handleopenflipkartlinklink}>
                    <h3>Flipkart</h3>
                    {/* <h4>Price: &#8377;<Formater price={productdata?.flipkart} contry={"India"} /></h4> */}
                    <h4>Price: &#8377; {productdata?.flipkart}</h4>

                </div>

                </div>

            </div>
        </>
    )
}

export default Cardarea;
