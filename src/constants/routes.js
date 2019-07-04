import { API_BASE } from './constants'

export const LANDING = '/'
export const SIGN_IN = '/signin'
export const SIGN_UP = '/signup'
export const ACCOUNT = '/account'

export const API_GET_TOKEN = `${API_BASE}/oauth/token`
export const API_REGISTER = `${API_BASE}/register`
export const API_GET_USER = `${API_BASE}/api/user`
export const API_GET_TODOS = `${API_BASE}/api/todos`
export const API_GET_LABELS = `${API_BASE}/api/labels`
export const API_GET_TODO_BY_ID = id => `${API_BASE}/api/todo/${id}`
export const API_POST_TODO_CREATE = `${API_BASE}/api/todo/create`

export const TODOS = '/todo'
export const TODO = id => `/todo/${id || ':id'}`
export const MODULE2 = '/module2'
export const MODULE3 = '/module3'