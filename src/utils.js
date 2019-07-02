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

export const refreshTokenIfNeeded = (auth, dispatch, refreshFunc) => {
    if (isTokenExpired(auth.expires_in)) {
        console.warn('Token expired.')
        dispatch(refreshFunc())
    }
}

export const getEventText = type => {
    switch (type) {
        case 'CREATED':
            return 'created this task.'
        case 'COMMENT':
            return 'added a comment.'
        default:
            return type
    }
}
