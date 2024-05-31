import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: localStorage.getItem('userRole') || null
};

const userRoleSlice = createSlice({
	name: 'userRole',
	initialState,
	reducers: {
		setUserRole: (state, action) => {
			state.value = action.payload;
			localStorage.setItem('userRole', action.payload);
		},
		clearUserRole: (state) => {
			state.value = null;
			localStorage.removeItem('userRole');
		},
	},
});

export const { setUserRole, clearUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
