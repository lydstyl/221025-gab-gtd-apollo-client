function Task({ task }) {
    const { name } = task
    function handleClick() {
        console.log("xx")
    }
    return (
        <div className="my-4">
            <span className="mx-4">{name}</span>

            <button
                onClick={handleClick}
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
            >
                X
            </button>
        </div>
    )
}

export default Task
