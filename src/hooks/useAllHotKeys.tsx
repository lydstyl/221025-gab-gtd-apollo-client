import { useHotkeys } from "react-hotkeys-hook"

function useAllHotKeys(addOneLabelToTask) {
    for (let labelPosition = 1; labelPosition <= 9; labelPosition++) {
        useHotkeys(`shift+${labelPosition}`, () => {
            function labelIsInTask(labelIdToCheck: string) {
                const labelIdsInSelectedTask: string[] = []
                const deleteLabelButtons = document.querySelectorAll(
                    ".labels-in-selected-task li [data-label-id]"
                ) as NodeListOf<HTMLButtonElement>
                deleteLabelButtons.forEach(deleteLabelButton => {
                    const deleteButton = deleteLabelButton as HTMLButtonElement
                    const labelId = deleteButton.dataset.labelId as string
                    labelIdsInSelectedTask.push(labelId)
                })
                return labelIdsInSelectedTask.includes(labelIdToCheck)
            }
            const option = document.querySelector(
                `option:nth-child(${labelPosition})`
            ) as HTMLOptionElement
            const labelId = option.value

            const deleteButton = document.getElementById(
                "delete-task-button"
            ) as HTMLButtonElement
            const taskId = deleteButton.dataset.taskId
            if (labelIsInTask(labelId)) {
                const buttonToDeleteLabel = document.querySelector(
                    `[data-label-id="${labelId}"]`
                ) as HTMLButtonElement
                buttonToDeleteLabel.click()
            } else {
                addOneLabelToTask({ variables: { labelId, taskId } })
            }
        })
    }
}
export default useAllHotKeys
