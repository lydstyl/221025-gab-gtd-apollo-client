import { Task } from "../types/task"

interface Options {
    orderBy: "asc" | "desc"
}

const byName = (a: Task, b: Task, options?: Options) => {
    if (a.name > b.name) {
        if (options?.orderBy === "desc") {
            return -1
        }
        return 1
    }
    if (a.name < b.name) {
        if (options?.orderBy === "desc") {
            return 1
        }
        return -1
    }
    return 0
}
const byDate = (a: Task, b: Task) => {
    if (a.fixedDate > b.fixedDate) {
        return 1
    }
    if (a.fixedDate < b.fixedDate) {
        return -1
    }
    return 0 // -1 to see task without date on top
}
const byNoDateFirst = (a: Task, b: Task, options?: Options) => {
    if (!a.fixedDate && b.fixedDate) {
        if (options?.orderBy === "desc") {
            return 1
        }
        return -1
    }
    if (!b.fixedDate && a.fixedDate) {
        if (options?.orderBy === "desc") {
            return -1
        }
        return 1
    }

    return 0
}
const byLink = (a: Task, b: Task) => {
    if (a.link > b.link) {
        return 1
    }
    if (a.link < b.link) {
        return -1
    }
    return 0
}

const byCustom = (a: Task, b: Task) => {
    if (byNoDateFirst(a, b, { orderBy: "asc" })) {
        return byNoDateFirst(a, b, { orderBy: "asc" })
    }

    if (byDate(a, b)) {
        return byDate(a, b)
    }

    if (byName(a, b, { orderBy: "asc" })) {
        return byName(a, b, { orderBy: "asc" })
    }

    if (byLink(a, b)) {
        return byLink(a, b)
    }

    return 0
}

export { byName, byDate, byCustom }
