import { createSelector } from 'reselect'

const getAuth = state => state.auth.get('auth')
export const getUser = state => state.auth.get('user')

export const makeGetAuth = () => {
    return createSelector(
        getAuth,
        auth => auth
    )
}
