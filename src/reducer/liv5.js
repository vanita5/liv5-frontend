import Immutable from 'immutable'

import { types } from '../action/authTypes'

const initialState = Immutable.fromJS({
    todos: [],
})

const liv5Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TODOS_FAILURE:
        case types.GET_TODOS_REQUEST:
            return state.set('todos', [])
        case types.GET_TODOS_SUCCESS:
            return state.set('todos', action.payload)

        default:
            return state
    }
}

export default liv5Reducer
