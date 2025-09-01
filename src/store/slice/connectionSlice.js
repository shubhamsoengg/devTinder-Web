import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
	name: "connections",
	initialState: {
		connections: null,
		pendingRequests: null,
	},
	reducers: {
		setConnections: (state, action) => {
			state.connections = action.payload;
		},
		addConnection: (state, action) => {
			state.connections.push(action.payload);
		},
		removeConnection: (state, action) => {
			state.connections = state.connections.filter(
				(conn) => conn._id !== action.payload
			);
		},
		setPendingRequests: (state, action) => {
			state.pendingRequests = action.payload;
		},
		updatePendingRequest: (state, action) => {
			state.pendingRequests = state.pendingRequests.filter(
				(req) => req._id !== action.payload
			);
		},
	},
});

export const {
	setConnections,
	addConnection,
	removeConnection,
	setPendingRequests,
	updatePendingRequest,
} = connectionSlice.actions;

export default connectionSlice.reducer;
