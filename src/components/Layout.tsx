import { Link, Outlet } from "react-router-dom"
import H2 from "./H2"
// import AuthStatus from "./AuthStatus"

function Layout() {
    return (
        <>
            {/* <AuthStatus /> */}

            <H2>Navigation</H2>
            <ul className="my-16 text-blue-500 flex justify-around">
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
