import { Link, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <div className="bg-stone-300 -mx-4 py-4 ">
                <h1 className="text-center text-3xl font-bold text-stone-600">
                    My custom GTD
                </h1>

                <ul className="mt-4 text-blue-500 flex justify-around">
                    <li>
                        <Link to="login">Login</Link>
                    </li>
                    <li>
                        <Link to="/">Tasks</Link>
                    </li>
                    <li>
                        <Link to="/labels">Labels</Link>
                    </li>
                </ul>
            </div>

            <Outlet />
        </>
    )
}

export default Layout
