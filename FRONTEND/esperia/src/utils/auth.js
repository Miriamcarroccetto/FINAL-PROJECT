export const getToken = () => localStorage.getItem('token')

export const parseToken = () => {
    try {
        const token = getToken()
        if(!token) return null

        const parts = token.split('.')
        if (parts.length !== 3) return null

       const payload = JSON.parse(atob(parts[1]))
       return payload

    } catch (err) {
        console.error("Token parsing failed:", err)
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