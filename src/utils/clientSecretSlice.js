import { createSlice } from "@reduxjs/toolkit";

const clientSecretSlice = createSlice({
	name: "clientSecret",
	initialState: null,
	reducers: {
		setClientSecret: (state, action) => action.payload,
		clearClientSecret: (state, action) => null,
	},
});

export const { setClientSecret, clearClientSecret } = clientSecretSlice.actions;
export default clientSecretSlice.reducer;
