import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes"
export default function CustomRouter() {
    const router = createBrowserRouter(routes)
    return <RouterProvider router={router} />
}
