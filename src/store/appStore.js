import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
import connectionReducer from "./slice/connectionSlice";
import clientSecretReducer from "./slice/clientSecretSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		connections: connectionReducer,
		clientSecret: clientSecretReducer,
	},
});

export default appStore;
