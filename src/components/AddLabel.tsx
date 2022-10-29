import { useMutation } from "@apollo/client"
import { GET_LABELS } from "../queries/label"
import { ADD_LABEL } from "../mutations/label"

function AddLabel() {
    let nameInput: HTMLInputElement | null,
        positionInput: HTMLInputElement | null,
        colorInput: HTMLInputElement | null
    const [addLabel, { data, loading, error }] = useMutation(ADD_LABEL, {
        refetchQueries: [{ query: GET_LABELS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addLabel({
            variables: {
                name: nameInput?.value,
                position: parseInt(positionInput?.value || "1", 10),
                color: colorInput?.value || "stone-500",
            },
        })
        if (nameInput) {
            nameInput.value = "" // TODO is this needed ?
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-evenly">
            <input
                ref={node => {
                    nameInput = node
                }}
                type="text"
                placeholder="name"
                required
            />
            <input
                ref={node => {
                    positionInput = node
                }}
                type="number"
                placeholder="position"
            />
            <input
                ref={node => {
                    colorInput = node
                }}
                type="text"
                placeholder="tailwind color ex.: green-500"
            />
            <button
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                type="submit"
            >
                Add label
            </button>
        </form>
    )
}

export default AddLabel
