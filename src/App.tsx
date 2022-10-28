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
            <div className="bg-gray-100 h-screen">
                <div className=" mx-0 px-4 w-320">
                    <h1 className="-mx-4 mb-4 py-4 text-center bg-slate-300 text-3xl font-bold">
                        Gab's zen GTD
                    </h1>

                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<PublicPage />} />
                            <Route
                                path="/loginOld"
                                element={<LoginPageOld />}
                            />

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
            </div>
        </AuthProvider>
    )
}

export default App
