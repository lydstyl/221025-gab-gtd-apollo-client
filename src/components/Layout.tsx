import { Link, Outlet } from "react-router-dom"
// import AuthStatus from "./AuthStatus"

function Layout() {
    return (
        <>
            {/* <AuthStatus /> */}

            <h2 className="text-xl mb-4">Navigation</h2>
            <ul className="my-4 text-blue-500">
                {/* <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li> */}
                <li>
                    <Link to="login">Login</Link>
                </li>
                <li>
                    <Link to="/tasks">Tasks</Link>
                </li>
                <li>
                    <Link to="/labels">Labels</Link>
                </li>
            </ul>

            <Outlet />
        </>
    )
}

export default Layout
