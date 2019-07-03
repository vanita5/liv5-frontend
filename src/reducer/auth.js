import Immutable from 'immutable'

import { authTypes } from '../action/types'

const initialState = Immutable.fromJS({
    auth: {
        authorized: false,
        loading: false,
        error: null,
        token: null,
        refresh_token: null,
        expires_in: null,
    },
    user: null,
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return state.set('auth', {
                loading: true,
            })

        case authTypes.LOGIN_SUCCESS:
            return state.set('auth', {
                authorized: true,
                loading: false,
                error: null,
                token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: action.payload.expires_in,
            })

        case authTypes.SIGNUP_FAILURE:
        case authTypes.LOGIN_FAILURE:
            return state.set('auth', {
                authorized: false,
                loading: false,
                error: action.payload.error,
                token: null,
                refresh_token: null,
                expires_in: null,
            })

        case authTypes.LOGOUT:
            return state.set('auth', {
                authorized: false,
                loading: false,
                error: null,
                user: null,
                token: null,
                refresh_token: null,
                expires_in: null,
            })

        case authTypes.GET_USER_SUCCESS:
            return state.set('user', action.payload)
        case authTypes.GET_USER_FAILURE:
            return state.set('user', null)

        default:
            return state
    }
}

export default authReducer
