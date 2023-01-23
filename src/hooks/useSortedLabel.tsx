import { useAtom } from "jotai"
import { SetStateAction, useEffect, useState } from "react"
import { taskDetailIdAtom } from "../store"
import { byPosition } from "../domain"
import { Label, Data } from "../types/label"

function useSortedLabel(
    setLabelId: React.Dispatch<SetStateAction<string | null>>,
    data: Data
): [string, Label[], React.Dispatch<SetStateAction<Label[]>>] {
    const [taskDetailId] = useAtom(taskDetailIdAtom)

    const [sortedLabels, setSortedLabels] = useState<Label[]>([])

    useEffect(() => {
        if (!data?.getLabels.length) {
            setSortedLabels([])
            return
        }

        if (data?.getLabels) {
            let labels = [...data.getLabels]

            labels = labels.sort(byPosition)

            setLabelId(labels[0].id)
            setSortedLabels(labels)
        }
    }, [data])

    return [taskDetailId, sortedLabels, setSortedLabels]
}
export default useSortedLabel
