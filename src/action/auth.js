import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { API_GET_TOKEN } from '../constants/routes'
import { CLIENT_ID, CLIENT_SECRET } from '../constants/constants'
import { jsonHeader } from '../utils'

export const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
}

export const loginRequest = createAction(types.LOGIN_REQUEST)
export const loginSuccess = createAction(types.LOGIN_SUCCESS)
export const loginFailure = createAction(types.LOGIN_FAILURE)

export const logout = createAction(types.LOGOUT)

export const getTokenAsync = (username, password) => dispatch => {
    dispatch(loginRequest())
    return fetch(API_GET_TOKEN, {
        headers: jsonHeader,
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            username,
            password,
            scope: '',
        })
    })
        .then(res => {
            if (!res.ok) throw Error(`${res.status} ${res.statusText}`)
            return res.json()
        })
        .then(json => {
            dispatch(loginSuccess(json))
        })
        .catch(e => {
            dispatch(loginFailure({ error: e.message }))
        })
}
