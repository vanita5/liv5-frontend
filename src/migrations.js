import { createMigrate } from 'redux-persist'

export default createMigrate({
    1: state => ({}),
}, { debug: false })
