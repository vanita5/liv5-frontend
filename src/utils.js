export const isProd = process.env.NODE_ENV === 'production'

export const jsonHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export const authHeader = token => ({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export const isTokenExpired = expires => new Date(expires).getTime() <= 300
