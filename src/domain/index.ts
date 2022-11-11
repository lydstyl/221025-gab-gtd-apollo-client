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
const byLink = (a: Task, b: Task) => {
    if (a.link > b.link) {
        return 1
    }
    if (a.link < b.link) {
        return -1
    }
    return 0
}

const byPosition = (a: Label, b: Label) => {
    if (a.position > b.position) {
        return 1
    }
    if (a.position < b.position) {
        return -1
    }
    return 0
}
const sortTaskLabels = (task: Task): Label[] => {
    let newTaskLabels = [...task.labels]

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
    function hasLabel(task: Task) {
        return task.labels.length
    }
    if (!hasLabel(a) && !hasLabel(b)) {
        if (byName(a, b, { orderBy: "asc" })) {
            return byName(a, b, { orderBy: "asc" })
        }
    }
    if (!hasLabel(a)) {
        return -1
    }
    if (!hasLabel(b)) {
        return 1
    }
    return 0
}
const byAllLabelsPositions = (a: Task, b: Task): number => {
    // sort by first label then second ... x times
    const maxIndex = Math.max(a.labels.length, b.labels.length)
    for (let index = 0; index <= maxIndex; index++) {
        if (byNoLabelFirst(a, b)) {
            return byNoLabelFirst(a, b)
        }
        if (byLabelPosition(a, b, index)) {
            return byLabelPosition(a, b, index)
        }
    }
    return 0
}
const byCustom = (a: Task, b: Task): number => {
    if (byDate(a, b)) {
        return byDate(a, b)
    }
    if (byAllLabelsPositions(a, b)) {
        return byAllLabelsPositions(a, b)
    }
    if (byName(a, b, { orderBy: "asc" })) {
        return byName(a, b, { orderBy: "asc" })
    }
    if (byLink(a, b)) {
        return byLink(a, b)
    }
    return 0
}

function getMyTasksCustomlySorted(tasks: Task[]) {
    // dispatch tasks in categories
    let noDateNoLabel: Task[] = []
    let todayOrBefore: Task[] = []
    let tomorrowTasks: Task[] = []
    let noDateButLabel: Task[] = []
    let otherDates: Task[] = []

    tasks.forEach(task => {
        if (task.fixedDate) {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            if (new Date(task.fixedDate) <= today) {
                todayOrBefore.push(task)
            } else {
                if (new Date(task.fixedDate) <= tomorrow) {
                    tomorrowTasks.push(task)
                } else {
                    otherDates.push(task)
                }
            }
        } else {
            if (task.labels.length) {
                noDateButLabel.push(task)
            } else {
                noDateNoLabel.push(task)
            }
        }
    })

    // sort categories
    noDateNoLabel = noDateNoLabel.sort(byName)
    todayOrBefore = todayOrBefore.sort(byCustom)
    tomorrowTasks = tomorrowTasks.sort(byCustom)
    noDateButLabel = noDateButLabel.sort(byCustom)
    otherDates = otherDates.sort(byCustom)

    // combine all categories in a wished way
    const tasksCustomlySorted = [
        ...noDateNoLabel,
        ...todayOrBefore,
        ...tomorrowTasks,
        ...noDateButLabel,
        ...otherDates,
    ]

    return tasksCustomlySorted
}

export { byName, byDate, byCustom, byPosition, getMyTasksCustomlySorted }
