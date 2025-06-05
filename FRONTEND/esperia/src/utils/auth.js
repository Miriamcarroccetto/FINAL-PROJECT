export const getToken = () => localStorage.getItem('token')

export const parseToken = () => {
    try {
        const token = getToken()
        if(!token) return null
        return JSON.parse(atob(token.split('.')[1]))
    } catch (err) {
        return null
    }
}

export const isAuthenticated = () => !!getToken()

export const isAdmin = () => {

        const user = parseToken()
        return user?.isAdmin === true
    
}

export const logout = () => {
    localStorage.removeItem('token')
}