import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import ReadingList from "./pages/reading_list";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path:"/reading-list",
        element: <ReadingList/>,
        errorElement: <Error/>
    }
])