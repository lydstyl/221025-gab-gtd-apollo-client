import "./App.css"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AuthProvider from "./components/AuthProvider"
import RequireAuth from "./components/RequireAuth"
import LoginPageOld from "./pages/LoginPageOld"
import ProtectedPage from "./pages/ProtectedPage"
import PublicPage from "./pages/PublicPage"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"

function App() {
    return (
        <AuthProvider>
            <h1>Auth Example</h1>

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<PublicPage />} />
                    <Route path="/loginOld" element={<LoginPageOld />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route
                        path="/protected"
                        element={
                            <RequireAuth>
                                <ProtectedPage />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
