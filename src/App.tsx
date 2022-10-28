import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AuthProvider from "./components/AuthProvider"
import RequireAuth from "./components/RequireAuth"
import LoginPageOld from "./pages/LoginPageOld"
import ProtectedPage from "./pages/ProtectedPage"
import PublicPage from "./pages/PublicPage"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <div className="container mx-2 my-2 bg-gray-200 mx-auto">
                <h1 className="text-3xl font-bold underline bg-slate-500">
                    Gab's zen GTD
                </h1>

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
            </div>
        </AuthProvider>
    )
}

export default App
