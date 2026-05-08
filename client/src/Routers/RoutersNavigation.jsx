import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigationpage from '../componets/Navigationpage';
import Home from '../Pages/Home';
import LoginPage from '../Pages/LoginPage';
import SignIn from '../Pages/SignIn';
import ErrorPage from '../Pages/ErrorPage';
import Trends from '../Pages/Trends';
import MenuPage from '../Pages/MenuPage';
import useHomeloader from '../componets/Home page mangement/Homeloader'
import Loading from '../componets/Loading';
import Searcharea from '../componets/Searcharea';
import Cardarea from '../componets/Cardarea';
import Protectedroutes from './Protectedroutes';
import Logout from '../componets/Logout';
import Profilepage from '../Pages/Profilepage';
import ContactUs from '../componets/Contect';
export default function RoutesDefine() {
    const route = createBrowserRouter([
        {
            path: '/', element: <Navigationpage />,
            id: 'root',
            loader: useHomeloader,
            HydrateFallback: Loading,
            errorElement: <ErrorPage />,
            children: [
               {
                    path: '/home', element:
                        <Protectedroutes>
                            <Home />
                        </Protectedroutes>
                },
                { path: '/home:id', element: <Cardarea /> },
                {path: "contact", element: <ContactUs/>},
                {
                    path: 'trends',
                    element:
                        <Protectedroutes>
                            <Trends />
                        </Protectedroutes>
                },
                { path: 'menu', element: <MenuPage /> },
                { path: 'logout', element: <Logout /> },
                {
                    path: 'search',
                    children: [
                        {
                            index: true,
                            element:
                                <Protectedroutes>
                                    <Searcharea />
                                </Protectedroutes>
                        },
                        { path: "/search/:id", element: <Cardarea /> },
                    ]
                },
                {
                    path: '/account', children: [
                        { index: true, element: 
                            <Protectedroutes>
                                <Profilepage/>
                            </Protectedroutes>
                         },
                        { path: 'login', element: <LoginPage /> },
                        { path: 'sign', element: <SignIn /> },
                    ]
                },
                { path: "*", element: <Loading /> }


            ]
        }
    ])
    return (
        <RouterProvider router={route} fallbackElement={<Loading />} />
    );
}
