import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AuthProvider from "./components/AuthProvider"
import RequireAuth from "./components/RequireAuth"
import LoginPageOld from "./pages/LoginPageOld"
import ProtectedPage from "./pages/ProtectedPage"
import PublicPage from "./pages/PublicPage"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"
import LabelsPage from "./pages/LabelsPage"
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <div className=" mx-0 px-4 w-320">
                <h1 className="-mx-4 mb-4 py-4 text-center bg-stone-300 text-3xl font-bold text-stone-600">
                    My custom GTD
                </h1>

                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<PublicPage />} />
                        <Route path="/loginOld" element={<LoginPageOld />} />

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/labels" element={<LabelsPage />} />

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
