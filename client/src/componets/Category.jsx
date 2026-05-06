
import "./Category.css";
import React from "react";


function Category({ Category, dispatch }) {
    const [active, setactive] = React.useState("All");
    let categorys = Category; 
    console.log(categorys)

    function activelimage(id) {
        setactive(id)
    }


    return (
        <>
            <div id="categaries">
                <ol>
                    {categorys?.map((ctg => (<li key={ctg} onClick={() => { dispatch({ type: ctg }); activelimage(ctg); }} className={`${active === ctg ? "activecategary" : ""}`}>{ctg}</li>)))}
                </ol>
            </div>
        </>
    )
}

export default Category;
