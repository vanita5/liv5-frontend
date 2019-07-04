import { createSelector } from 'reselect'

export const getTodo = state => state.liv5.get('todo')
export const getTodos = state => state.liv5.get('todos')
export const getTodoQuery = state => state.liv5.get('todo_q')
export const getTodosFilteredByQuery = createSelector(
    [ getTodos, getTodoQuery ],
    (todos, query) => {
        if (!query || query.length === 0) return todos
        query = query.toLowerCase()
        return todos.filter(todo => todo.title.toLowerCase().includes(query))
    }
)
