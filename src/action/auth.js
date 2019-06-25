import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { beginTask, endTask } from 'redux-nprogress'
import { API_GET_TOKEN, API_GET_USER, API_REGISTER } from '../constants/routes'
import { CLIENT_ID, CLIENT_SECRET } from '../constants/constants'
import { authHeader, jsonHeader, isTokenExpired } from '../utils'
import { types } from './types'

import store from '../store'

export const loginRequest = createAction(types.LOGIN_REQUEST)
export const loginSuccess = createAction(types.LOGIN_SUCCESS)
export const loginFailure = createAction(types.LOGIN_FAILURE)
export const logout = createAction(types.LOGOUT)
export const signUpRequest = createAction(types.SIGNUP_REQUEST)
export const signUpFailure = createAction(types.SIGNUP_FAILURE)
export const getUserRequest = createAction(types.GET_USER_REQUEST)
export const getUserSuccess = createAction(types.GET_USER_SUCCESS)
export const getUserFailure = createAction(types.GET_USER_FAILURE)


export const getTokenAsync = (email, password) => dispatch => {
    dispatch(beginTask())
    dispatch(loginRequest())
    return fetch(API_GET_TOKEN, {
        headers: jsonHeader,
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            username: email,
            password,
            scope: '',
        })
    })
        .then(res => {
            return res.json()
        })
        .then(json => {
            if (json.error) {
                dispatch(loginFailure({ error: json.message }))
                dispatch(endTask())
            } else {
                dispatch(loginSuccess(json))
                dispatch(getUserAsync())
                dispatch(endTask())
            }
        })
        .catch(e => {
            dispatch(loginFailure({ error: e.message }))
            dispatch(endTask())
        })
}

export const registerAsync = (name, email, password, password_confirmation) => dispatch => {
    dispatch(beginTask())
    dispatch(signUpRequest())
    return fetch(API_REGISTER, {
        headers: jsonHeader,
        method: 'POST',
        redirect: 'manual',
        referrer: 'no-referrer',
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            name,
            email,
            password,
            password_confirmation,
        })
    })
        .then(res => {
            if (res.status === 0) {
                dispatch(getTokenAsync(email, password))
                dispatch(endTask())
                return
            }
            return res.json()
        })
        .then(json => {
            dispatch(signUpFailure({ error: json.message }))
            dispatch(endTask())
        })
        .catch(e => {
            dispatch(signUpFailure({ error: e.message }))
            dispatch(endTask())
        })
}

export const getUserAsync = () => dispatch => {
    dispatch(beginTask())

    const state = store.getState()
    const auth = state.auth.get('auth')
    if (isTokenExpired(auth.expires_in)) {
        console.warn('Token expired.')
        dispatch(getTokenAsync())
    }

    dispatch(getUserRequest())
    return fetch(API_GET_USER, {
        headers: authHeader(auth.token),
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(json => {
            dispatch(getUserSuccess(json))
            dispatch(endTask())
        })
        .catch(e => {
            dispatch(getUserFailure({ error: e.message }))
            dispatch(endTask())
        })
}
