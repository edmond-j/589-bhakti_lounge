
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice.js';


const store = configureStore({
	reducer: {
		token: tokenReducer,
	},
});

export default store;
