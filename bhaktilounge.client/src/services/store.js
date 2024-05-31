
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice.js';
import userNameReducer from './userNameSlice.js';
import userRoleReducer from './userRoleSlice.js';

const store = configureStore({
	reducer: {
		token: tokenReducer,
		userName: userNameReducer,
		userRole: userRoleReducer,
	},
});

export default store;
