import { useQuery } from "@apollo/client"
import { GET_TASKS } from "../queries/tasks"

function useTasks() {
    return useQuery(GET_TASKS)
}

export default useTasks
