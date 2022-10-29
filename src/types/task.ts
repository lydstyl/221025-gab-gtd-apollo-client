import { Label } from "./label"

export interface Task {
    id: string
    name: string
    labels: Label[]
}
