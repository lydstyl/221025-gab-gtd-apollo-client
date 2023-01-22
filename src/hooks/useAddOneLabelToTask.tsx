import { useMutation } from "@apollo/client"
import { GET_TASKS } from "../queries/tasks"
import { ADD_ONE_LABEL_TO_TASK } from "../mutations/task"

function useAddOneLabelToTask() {
    const [addOneLabelToTask, mutationTuple] = useMutation(
        ADD_ONE_LABEL_TO_TASK,
        {
            refetchQueries: [{ query: GET_TASKS }],
        }
    )
    return [addOneLabelToTask, mutationTuple]
}
export default useAddOneLabelToTask
