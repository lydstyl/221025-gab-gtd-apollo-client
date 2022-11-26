import { useQuery } from "@apollo/client"
import { GET_TASKS } from "../queries/tasks"
import { useNavigate } from "react-router-dom"

function useTasks() {
    const hook = useQuery(GET_TASKS)
    let navigate = useNavigate()

    if (hook?.error?.message.toLowerCase().includes("unauthorised")) {
        localStorage.clear()
        return navigate("/login")
    }

    return hook
}

export default useTasks
