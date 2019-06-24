import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import {API_GET_TOKEN, API_REGISTER} from '../constants/routes'
import { CLIENT_ID, CLIENT_SECRET } from '../constants/constants'
import { jsonHeader } from '../utils'

export const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',
}

export const loginRequest = createAction(types.LOGIN_REQUEST)
export const loginSuccess = createAction(types.LOGIN_SUCCESS)
export const loginFailure = createAction(types.LOGIN_FAILURE)
export const logout = createAction(types.LOGOUT)
export const signUpRequest = createAction(types.SIGNUP_REQUEST)
export const signUpFailure = createAction(types.SIGNUP_FAILURE)


export const getTokenAsync = (email, password) => dispatch => {
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
            dispatch(json.error ? loginFailure({ error: json.message }) : loginSuccess(json))
        })
        .catch(e => {
            console.log(e)
            dispatch(loginFailure({ error: e.message }))
        })
}

export const registerAsync = (name, email, password, password_confirmation) => dispatch => {
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
}
