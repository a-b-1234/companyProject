import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';
import { reducer as appReducer } from './app/store/slice'

// Create the store with logger middleware    
const logger = createLogger({
});
const middlewares = [logger];

const store = configureStore({
    reducer: {
        main: appReducer,
    },
    middleware: middlewares
});

export default store;