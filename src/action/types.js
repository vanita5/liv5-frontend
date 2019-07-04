const authTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAILURE: 'GET_USER_FAILURE',
}

const types = {
    GET_TODOS_REQUEST: 'GET_TODOS_REQUEST',
    GET_TODOS_SUCCESS: 'GET_TODOS_SUCCESS',
    GET_TODOS_FAILURE: 'GET_TODOS_FAILURE',
    GET_TODO_BY_ID_REQUEST: 'GET_TODO_BY_ID_REQUEST',
    GET_TODO_BY_ID_SUCCESS: 'GET_TODO_BY_ID_SUCCESS',
    GET_TODO_BY_ID_FAILURE: 'GET_TODO_BY_ID_FAILURE',
    GET_LABELS_REQUEST: 'GET_LABELS_REQUEST',
    GET_LABELS_SUCCESS: 'GET_LABELS_SUCCESS',
    GET_LABELS_FAILURE: 'GET_LABELS_FAILURE',
    POST_CREATE_TODO_REQUEST: 'POST_CREATE_TODO_REQUEST',
    POST_CREATE_TODO_SUCCESS: 'POST_CREATE_TODO_SUCCESS',
    POST_CREATE_TODO_FAILURE: 'POST_CREATE_TODO_FAILURE',
    SET_TODO_QUERY: 'SET_TODO_QUERY',
}

export { authTypes, types }