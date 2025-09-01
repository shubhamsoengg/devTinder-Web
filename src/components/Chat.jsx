import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import { formatChatTimestamp } from "../utils/formatTime";

export default function Chat() {
	const targetUserId = useParams().targetUserId;
	const { _id: sourceUserId, firstName } =
		useSelector((store) => store.user) || {};

	const [messages, setMessages] = useState([]);

	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = (e) => {
		const socket = createSocketConnection();
		e.preventDefault();
		if (!newMessage.trim()) return;
		setNewMessage("");
		socket.emit("sendMessage", {
			firstName,
			sourceUserId,
			targetUserId,
			message: newMessage,
		});
	};

	const fetchMessageHistory = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
				withCredentials: true,
			});
			const messagesData = res?.data?.data?.messages || [];
			setMessages(messagesData);
		} catch (error) {
			console.error("Error fetching message history:", error);
		}
	};

	useEffect(() => {
		fetchMessageHistory();
	}, []);

	useEffect(() => {
		if (!sourceUserId || !targetUserId) return;

		const socket = createSocketConnection();

		socket.emit(
			"joinRoom",
			{ firstName, sourceUserId, targetUserId },
			() => {
				console.log("Connected to WebSocket server");
			}
		);

		socket.on("receiveMessage", ({ message, firstName }) => {
			console.log(message);
			setMessages((prevMessages) => [...prevMessages, message]);
			console.log(messages);
		});
		return () => {
			socket.disconnect();
			console.log("Socket disconnected");
		};
	}, [sourceUserId, targetUserId]);

	return (
		<div className="h-[50em] bg-gray-100 flex flex-col">
			{/* Chat Header */}
			<div className="bg-blue-600 text-white p-4 text-center font-bold text-lg">
				Chat Room
			</div>

			{/* Messages */}
			<div className="flex-1 p-4 space-y-4 overflow-y-auto">
				{messages.map((msg) => (
					<div
						key={msg._id}
						className={
							"chat " +
							(firstName === msg?.senderId?.firstName
								? "chat-end"
								: "chat-start")
						}
					>
						<div className="chat-header">
							{msg?.senderId?.firstName}
							<time className="text-xs opacity-50">
								{formatChatTimestamp(msg?.createdAt)}
							</time>
						</div>
						<div
							className={
								"chat-bubble " +
								(firstName === msg?.senderId?.firstName
									? "chat-bubble-success"
									: "chat-bubble-neutral")
							}
						>
							{msg.message}
						</div>
						<div className="chat-footer opacity-50">Delivered</div>
					</div>
				))}
			</div>
			{/* Input Box */}
			<form
				onSubmit={handleSendMessage}
				className="p-4 bg-white flex items-end space-x-2 border-t border-gray-300"
			>
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type your message..."
					className="input input-bordered flex-1"
				/>
				<button type="submit" className="btn btn-primary">
					Send
				</button>
			</form>
		</div>
	);
}
