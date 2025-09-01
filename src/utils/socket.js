import { io } from "socket.io-client";
import { BASE_URL } from "../config/constants";

export const createSocketConnection = () => {
	if (location.hostname === "localhost") {
		return io(BASE_URL);
	} else {
		return io("/", { path: "/api/socket.io" });
	}
};
