import dayjs from "dayjs"

function getDateForInput(fixedDate: any) {
    if (fixedDate) {
        return dayjs(new Date(fixedDate)).format("YYYY-MM-DD")
    } else {
        return null
    }
}
export { getDateForInput }
