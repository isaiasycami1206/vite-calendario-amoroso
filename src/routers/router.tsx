
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage'
import Layout from '../pages/layout/Layout.tsx'

import HomePage from '../pages/HomePage';
import CalendarioGeneralPage from '../pages/CalendarioGeneralPage.tsx';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/home",
                    element: <HomePage />,
                },
                {
                    path: "/calendarGeneral",
                    element: <CalendarioGeneralPage />,
                },
            ],
        },
    ],
    {
        basename: "/vite-calendario-amoroso",
    }
);

const RouterConfig = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
};

export default RouterConfig;