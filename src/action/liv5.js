import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { beginTask, endTask } from 'redux-nprogress'
import { getTokenAsync } from './auth'
import { authHeader,  refreshTokenIfNeeded } from '../utils'
import { types } from './types'
import * as ROUTES from '../constants/routes'
import { makeGetAuth } from '../selector/authSelector'

import store from '../store'

const getAuth = makeGetAuth()

export const getTodosRequest = createAction(types.GET_TODOS_REQUEST)
export const getTodosSuccess = createAction(types.GET_TODOS_SUCCESS)
export const getTodosFailure = createAction(types.GET_TODOS_FAILURE)

export const getTodosAsync = () => dispatch => {
    dispatch(beginTask())

    const state = store.getState()
    const auth = getAuth(state)
    refreshTokenIfNeeded(auth, dispatch, getTokenAsync)

    dispatch(getTodosRequest())
    return fetch(ROUTES.API_GET_TODOS, {
        headers: authHeader(auth.token),
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(json => {
            dispatch(getTodosSuccess(json))
            dispatch(endTask())
        })
        .catch(e => {
            dispatch(getTodosFailure(e.message))
            dispatch(endTask())
        })
}

export const getTodoByIdRequest = createAction(types.GET_TODO_BY_ID_REQUEST)
export const getTodoByIdSuccess = createAction(types.GET_TODO_BY_ID_SUCCESS)
export const getTodoByIdFailure = createAction(types.GET_TODO_BY_ID_FAILURE)

export const getTodoByIdAsync = id => dispatch => {
    dispatch(beginTask())

    const state = store.getState()
    const auth = getAuth(state)
    refreshTokenIfNeeded(auth, dispatch, getTokenAsync)

    dispatch(getTodoByIdRequest())
    return fetch(ROUTES.API_GET_TODO_BY_ID(id), {
        headers: authHeader(auth.token),
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(json => {
            dispatch(getTodoByIdSuccess(json))
            dispatch(endTask())
        })
        .catch(e => {
            dispatch(getTodoByIdFailure(e.message))
            dispatch(endTask())
        })
}

export const getLabelsRequest = createAction(types.GET_LABELS_REQUEST)
export const getLabelsSuccess = createAction(types.GET_LABELS_SUCCESS)
export const getLabelsFailure = createAction(types.GET_LABELS_FAILURE)

export const getLabelsAsync = () => dispatch => {
    const state = store.getState()
    const auth = getAuth(state)
    refreshTokenIfNeeded(auth, dispatch, getTokenAsync)

    dispatch(getLabelsRequest())
    return fetch(ROUTES.API_GET_LABELS, {
        headers: authHeader(auth.token),
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(json => {
            dispatch(getLabelsSuccess(json))
        })
        .catch(e => {
            console.error(e)
            dispatch(getLabelsFailure(e))
        })
}

export const setTodoQuery = createAction(types.SET_TODO_QUERY)
