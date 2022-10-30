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
const byTodayOrLessOrNoDateFirst = (a: Task, b: Task, options?: Options) => {
    if (a.fixedDate) {
        if (new Date(a.fixedDate) <= new Date()) {
            return 1
        }
    }
    if (b.fixedDate) {
        if (new Date(b.fixedDate) <= new Date()) {
            return 1
        }
    }
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
const byFirstLabelPosition = (a: Task, b: Task) => {
    // TODO change this we have to sort label first
    if (a.labels[0]?.position > b.labels[0]?.position) {
        return 1
    }
    if (a.labels[0]?.position < b.labels[0]?.position) {
        return -1
    }
    return 0
}
const byNoLabelFirst = (a: Task, b: Task) => {
    if (!a.labels.length) {
        return -1
    }
    if (!b.labels.length) {
        return 1
    }
    return 0
}
const byCustom = (a: Task, b: Task) => {
    if (byTodayOrLessOrNoDateFirst(a, b, { orderBy: "asc" })) {
        return byTodayOrLessOrNoDateFirst(a, b, { orderBy: "asc" })
    }
    if (byNoLabelFirst(a, b)) {
        return byNoLabelFirst(a, b)
    }
    if (byFirstLabelPosition(a, b)) {
        return byFirstLabelPosition(a, b)
    }
    // if (byName(a, b, { orderBy: "asc" })) {
    //     return byName(a, b, { orderBy: "asc" })
    // }
    // if (byLink(a, b)) {
    //     return byLink(a, b)
    // }

    return 0
}

export { byName, byDate, byCustom }
