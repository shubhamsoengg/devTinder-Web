import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import clientSecretReducer from "./clientSecretSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		connections: connectionReducer,
		clientSecret: clientSecretReducer,
	},
});

export default appStore;
