import { useAtom } from "jotai"
import { useEffect } from "react"
import { hasLoginInLocalStorage } from "../store"

function useHasLoginStored() {
    const [hasLoginStored, setHasLoginStored] = useAtom(hasLoginInLocalStorage)

    useEffect(() => {
        if (localStorage.getItem("login")) {
            setHasLoginStored(true)
        }
    }, [])

    return [hasLoginStored, setHasLoginStored]
}

export default useHasLoginStored
