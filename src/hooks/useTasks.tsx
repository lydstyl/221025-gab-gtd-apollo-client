import { OperationVariables, QueryResult, useQuery } from "@apollo/client"
import { GET_TASKS } from "../queries/tasks"
// import { useNavigate } from "react-router-dom"

function useTasks(): QueryResult<any, OperationVariables> {
    const hook = useQuery(GET_TASKS)
    // const navigate = useNavigate()

    if (hook?.error?.message.toLowerCase().includes("unauthorised")) {
        localStorage.clear()

        document.location.href = "/login"

        // navigate("/login")
    }

    return hook
}

export default useTasks
