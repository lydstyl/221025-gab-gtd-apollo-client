import { useMutation } from "@apollo/client"
import { ADD_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import H2 from "./H2"

function AddTask() {
    let input: HTMLInputElement | null
    const [addTask, { data, loading, error }] = useMutation(ADD_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addTask({ variables: { name: input?.value } })
        if (input) {
            input.value = ""
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <form onSubmit={handleSubmit}>
            <H2>Add a new task</H2>

            <input
                ref={node => {
                    input = node
                }}
                type="text"
                name="name"
                placeholder="name"
                required
            />
            <button
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                type="submit"
            >
                Add task
            </button>
        </form>
    )
}

export default AddTask
