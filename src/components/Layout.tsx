import { Link, Outlet } from "react-router-dom"
import AuthStatus from "./AuthStatus"

function Layout() {
    return (
        <div>
            <AuthStatus />

            <ul className="my-4 text-blue-500">
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
                <li>
                    <Link to="/tasks">Tasks</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    )
}

export default Layout
