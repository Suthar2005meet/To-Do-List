import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import {Login} from "../Component/Common/Login";
import {Register} from "../Component/Common/Register";

const router = createBrowserRouter([
    {path : "/",element : <Login />},
    {path : "/register",element : <Register />}
])

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
