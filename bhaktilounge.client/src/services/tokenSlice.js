import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: localStorage.getItem('token') || null
};

const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.value = action.payload;
			localStorage.setItem('token', action.payload);
		},
		clearToken: (state) => {
			state.value = null;
			localStorage.removeItem('token');
		},
	},
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
