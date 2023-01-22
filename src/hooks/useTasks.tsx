import { useAtom } from "jotai"

import { isAuthenticatedAtom } from "../store"

import { OperationVariables, QueryResult, useQuery } from "@apollo/client"
import { GET_TASKS } from "../queries/tasks"
// import { useNavigate } from "react-router-dom"

function useTasks(): QueryResult<any, OperationVariables> {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

    const hook = useQuery(GET_TASKS)
    // const navigate = useNavigate()

    if (hook?.error?.message.toLowerCase().includes("unauthorised")) {
        localStorage.clear()

        // document.location.href = "/login"
        // console.log("redirect to /login with context or jotai ?")

        // navigate("/login")
        // setIsAuthenticated(false)
    }

    return hook
}

export default useTasks
