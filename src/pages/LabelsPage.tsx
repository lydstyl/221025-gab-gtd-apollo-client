import { useQuery } from "@apollo/client"
import AddLabel from "../components/AddLabel"
import H2 from "../components/H2"
import Label from "../components/Label"
import { GET_LABELS } from "../queries/label"
import { Label as LabelType } from "../types/label"

function LabelsPage() {
    const { loading, error, data } = useQuery(GET_LABELS)
    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <>
            <AddLabel />
            <ul>
                <H2>Update labels</H2>

                {data.getLabels.map((label: LabelType) => (
                    <Label key={label.id} label={label} />
                ))}
            </ul>
        </>
    )
}
export default LabelsPage
