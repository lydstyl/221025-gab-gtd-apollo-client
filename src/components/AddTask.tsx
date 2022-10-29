import { useMutation } from "@apollo/client"
import { ADD_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"

function AddTask() {
    let input
    const [addTask, { data, loading, error }] = useMutation(ADD_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addTask({ variables: { name: input.value } })
        input.value = ""
    }
    if (loading) return "Submitting..."
    if (error) return `Submission error! ${error.message}`
    return (
        <form onSubmit={handleSubmit}>
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
