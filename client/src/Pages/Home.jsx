import './Home.css';
import React, { useMemo } from 'react';
import Typinganime from "../componets/Home page mangement/Typinganime";
import Homecardmanagement from '../componets/Home page mangement/Homecardmanagement';
import Category from '../componets/Category';
import { Await, useRouteLoaderData } from 'react-router-dom';
import Loading from '../componets/Loading';
import reducer from '../componets/Reducer';
import NoAuthanticated from './NoAuthanticated';

export default function Home() {
    localStorage.clear();

    const DATA = useRouteLoaderData('root');
    const newcategories = useMemo(()=>{
        return ["All" ,...new Set(DATA.map((catdata)=> catdata.category))];
    },
    [DATA]);
    const Ncategories = newcategories.sort();
    const [state, dispatch] = React.useReducer(reducer, { category: DATA || [], filtered: DATA || [] });
    const savetoken = localStorage?.getItem('token');
       //  i have to make a page for not authanticated
    return (<>
        {savetoken? <div id='homecontainer'>

                {Array.isArray(state.filtered) && (state.filtered.length !== 0) ?
                     <div>
                        <React.Suspense fallback={<Loading />}>
                            <Await resolve={state.filtered}>
                                        <Category dispatch={dispatch} Category = {Ncategories} />
                                        <Typinganime />
                                        <div className='homemanagescard'>
                                        <Homecardmanagement mydata={state.filtered} />

                                        </div>
                            </Await>
                        </React.Suspense>
                    </div>: null }
            </div> : <NoAuthanticated/>}
    </>);
}