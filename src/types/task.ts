import { Label } from "./label"

export interface Task {
    id: string
    name: string
    link: string
    fixedDate: string
    labels: Label[]
}
