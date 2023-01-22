function Button({
    options,
    children,
}: {
    options: { onClick: () => void }
    children: string
}) {
    return (
        <button
            className="my-4 sm:mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
            onClick={options.onClick}
        >
            {children}
        </button>
    )
}

export default Button
