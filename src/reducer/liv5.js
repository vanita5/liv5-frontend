import Immutable from 'immutable'

import { types } from '../action/types'

const initialState = Immutable.fromJS({
    todos: [],
    todo: null,
    todo_q: null,
    labels: [],
})

const liv5Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TODOS_FAILURE:
            return state.set('todos', null)
        case types.GET_TODOS_REQUEST:
            return state.set('todos', [])
        case types.GET_TODOS_SUCCESS:
            return state.set('todos', action.payload)

        case types.GET_TODO_BY_ID_FAILURE:
            return state.set('todo', { error: action.payload })
        case types.GET_TODO_BY_ID_REQUEST:
            return state.set('todo', null)
        case types.GET_TODO_BY_ID_SUCCESS:
            return state.set('todo', action.payload)

        case types.GET_LABELS_SUCCESS:
            return state.set('labels', action.payload)

        case types.SET_TODO_QUERY:
            return state.set('todo_q', action.payload || [])

        default:
            return state
    }
}

export default liv5Reducer
