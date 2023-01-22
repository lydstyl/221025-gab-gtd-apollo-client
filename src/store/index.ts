import { atom } from "jotai"

export const isAuthenticatedAtom2 = atom<boolean>(false) ///
export const isAuthenticatedAtom = atom(
    get => get(isAuthenticatedAtom2),
    (get, set, _arg) => {
        console.log(`gb🚀 ~ _arg`, _arg)
        set(isAuthenticatedAtom2, !get(isAuthenticatedAtom2))

        console.log("yo")
    }
) ///

export const taskDetailIdAtom2 = atom<string>("")
export const taskDetailIdAtom = atom(
    get => get(isAuthenticatedAtom2),
    (get, set, _arg) => {
        console.log(`gb🚀 ~ _arg`, _arg)
        set(isAuthenticatedAtom2, !get(isAuthenticatedAtom2))

        console.log("yo")
    }
)

export const hasLoginInLocalStorage = atom<boolean>(false)
