import { useLocation, Navigate } from "react-router-dom"

function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation()

    const localAuth = localStorage.getItem("login")

    if (!localAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
