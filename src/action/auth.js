import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { beginTask, endTask } from 'redux-nprogress'
import { CLIENT_ID, CLIENT_SECRET } from '../constants/constants'
import { authHeader, jsonHeader, refreshTokenIfNeeded } from '../utils'
import { authTypes } from './types'
import { makeGetAuth } from '../selector/authSelector'
import {
    API_GET_TOKEN,
    API_GET_USER,
    API_REGISTER,
} from '../constants/routes'

import store from '../store'

const getAuth = makeGetAuth()

export const loginRequest = createAction(authTypes.LOGIN_REQUEST)
export const loginSuccess = createAction(authTypes.LOGIN_SUCCESS)
export const loginFailure = createAction(authTypes.LOGIN_FAILURE)
export const logout = createAction(authTypes.LOGOUT)
export const signUpRequest = createAction(authTypes.SIGNUP_REQUEST)
export const signUpFailure = createAction(authTypes.SIGNUP_FAILURE)
export const getUserRequest = createAction(authTypes.GET_USER_REQUEST)
export const getUserSuccess = createAction(authTypes.GET_USER_SUCCESS)
export const getUserFailure = createAction(authTypes.GET_USER_FAILURE)


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
            } else {
                dispatch(loginSuccess(json))
                dispatch(getUserAsync())
            }
        })
        .catch(e => {
            dispatch(loginFailure({ error: e.message }))
        })
        .finally(() => dispatch(endTask()))
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
                return
            }
            return res.json()
        })
        .then(json => {
            dispatch(signUpFailure({ error: json.message }))
        })
        .catch(e => {
            dispatch(signUpFailure({ error: e.message }))
        })
        .finally(() => dispatch(endTask()))
}

export const getUserAsync = () => dispatch => {
    dispatch(beginTask())

    const state = store.getState()
    const auth = getAuth(state)
    refreshTokenIfNeeded(auth, dispatch, getTokenAsync)

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
        })
        .catch(e => {
            dispatch(getUserFailure({ error: e.message }))
        })
        .finally(() => dispatch(endTask()))
}
