interface Props {
    children: React.ReactNode
    classes?: string
}

const H2: React.FC<Props> = ({ children, classes }) => {
    return <h2 className={classes}>{children}</h2>
}
H2.defaultProps = {
    classes: "text-xl my-8 text-stone-500",
}
export default H2
