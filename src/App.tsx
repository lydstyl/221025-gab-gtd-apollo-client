import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AuthProvider from "./components/AuthProvider"
import RequireAuth from "./components/RequireAuth"
import LoginPage from "./pages/LoginPage"
import TasksPage from "./pages/TasksPage"
import LabelsPage from "./pages/LabelsPage"
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <div className="mx-0 px-4">
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <RequireAuth>
                                    <TasksPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/labels"
                            element={
                                <RequireAuth>
                                    <LabelsPage />
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
