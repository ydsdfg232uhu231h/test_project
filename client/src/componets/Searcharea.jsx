import React, { useContext, useMemo } from 'react'
import "./Searcharea.css";
import { useNavigate, Await } from 'react-router-dom';
import Category from './Category';
import SearchResult from './SearchResult';
import reducer from './Reducer';
import Loading from './Loading';
import { ProductContext } from '../App';
function Searcharea() {
    const [statesearch, dispatchsearch] = React.useReducer(reducer, { category: [], filtered: [] });
    const DATAs = useContext(ProductContext);
    const savetoken = localStorage?.getItem("token");
    const searchdata = DATAs.data;
    const categories = useMemo(()=>{
        return ["All",...new Set(searchdata?.map((catdata) => catdata.category))];
    },[]);
    const navigate = useNavigate();
     // no useage here
    React.useEffect(() => {
        if (Array.isArray(searchdata)) {
            dispatchsearch({
                type: 'All',
                payload: searchdata
            })
        }
        if (searchdata.length === 0) {
            navigate('/home');
        }
    }, [searchdata])

    return (
        <>
            {savetoken? <div id='searchareadisplay'>
                <React.Suspense fallback={<Loading />}>
                    <Await resolve={statesearch.filtered}>
                        <Category Category={categories} dispatch={dispatchsearch} />
                        <SearchResult searchdata={statesearch.filtered} />
                    </Await>
                </React.Suspense>
            </div>: <h1>You are not authanticated!</h1> }
        </>
    )
}

export default Searcharea