import { atom } from "jotai"

export const isAuthenticatedAtom2 = atom<boolean>(false) ///
export const isAuthenticatedAtom = atom(
    get => get(isAuthenticatedAtom2),
    (get, set, _arg) => {
        console.log(`gb🚀 ~ _arg`, _arg)
        set(isAuthenticatedAtom2, !get(isAuthenticatedAtom2))

        console.log("yo")
    }
)
export const taskDetailIdAtom = atom<string>("")

export const hasLoginInLocalStorage = atom<boolean>(false)
