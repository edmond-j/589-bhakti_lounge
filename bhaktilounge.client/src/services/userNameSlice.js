import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: localStorage.getItem('userName') || null
};

const userNameSlice = createSlice({
	name: 'userName',
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.value = action.payload;
			localStorage.setItem('userName', action.payload);
		},
		clearUserName: (state) => {
			state.value = null;
			localStorage.removeItem('userName');
		},
	},
});

export const { setUserName, clearUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
