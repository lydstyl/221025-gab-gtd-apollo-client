export type AuthContextType = {
    storedAuth: StoredAuth
    signin: (user: string) => void
    signout: () => void
}

export type StoredAuth = {
    user: string
    token: string
}
