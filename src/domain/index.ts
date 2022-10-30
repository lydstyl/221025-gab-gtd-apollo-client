import { Label } from "../types/label"
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
    function isTodayOrLess(fixedDate: string) {
        if (new Date(fixedDate) <= new Date()) {
            return true
        } else {
            return false
        }
    }

    if (a.fixedDate && b.fixedDate) {
        if (isTodayOrLess(a.fixedDate) && isTodayOrLess(b.fixedDate)) {
            //  > <
            if (a.fixedDate > b.fixedDate) {
                return -1
            }
            return 1
        }
        if (isTodayOrLess(a.fixedDate)) {
            return -1
        }
        if (isTodayOrLess(b.fixedDate)) {
            return 1
        }
        if (a.fixedDate > b.fixedDate) {
            return 1
        }
        return -1
    }
    if (a.fixedDate) {
        if (isTodayOrLess(a.fixedDate)) {
            return -1
        }
        return 1
    }
    if (b.fixedDate) {
        if (isTodayOrLess(b.fixedDate)) {
            return 1
        }
        return -1
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

const sortTaskLabels = (task: Task): Label[] => {
    let newTaskLabels = [...task.labels]

    const byPosition = (a: Label, b: Label) => {
        if (a.position > b.position) {
            return 1
        }
        if (a.position < b.position) {
            return -1
        }
        return 0
    }

    newTaskLabels = newTaskLabels.sort(byPosition)

    return newTaskLabels
}

const byLabelPosition = (a: Task, b: Task, labelIndex: number) => {
    const aLabels = sortTaskLabels(a)
    const bLabels = sortTaskLabels(b)

    if (aLabels[labelIndex]?.position > bLabels[labelIndex]?.position) {
        return 1
    }
    if (aLabels[labelIndex]?.position < bLabels[labelIndex]?.position) {
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
        // TODO if 0 sort by name
        return byNoLabelFirst(a, b)
    }

    // filter by first label then second ... 5 times
    for (let index = 0; index < 6; index++) {
        if (byLabelPosition(a, b, index)) {
            return byLabelPosition(a, b, index)
        }
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
