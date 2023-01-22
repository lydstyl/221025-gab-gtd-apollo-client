export interface Label {
    id: string
    name: string
    position: number
    color: string
}
export type Data = {
    getLabels: Label[]
}
