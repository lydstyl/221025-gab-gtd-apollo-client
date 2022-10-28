import { gql, useQuery } from "@apollo/client"

const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            id
            user
            name
            labels {
                id
                user
                name
                position
            }
        }
    }
`

function TasksPage() {
    const { loading, error, data } = useQuery(GET_TASKS)

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <ul>
            {data.getTasks.map(task => (
                <li key={task.id}>{JSON.stringify(task)}</li>
            ))}
        </ul>
    )
}

export default TasksPage
