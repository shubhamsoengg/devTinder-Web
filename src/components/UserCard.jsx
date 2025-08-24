import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
	const dispatch = useDispatch();

	const { firstName, lastName, age, gender, profilePicture, about } = user;

	const handleSendRequest = async (status) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/request/send/${status}/${user._id}`,
				{},
				{ withCredentials: true }
			);
			dispatch(removeUserFromFeed(user._id));
			console.log(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="relative w-96 h-[500px] rounded-2xl overflow-hidden shadow-xl">
			{/* Full background profile picture */}
			<img
				src={profilePicture}
				alt={`${firstName} ${lastName}`}
				className="w-full h-full object-cover"
			/>

			{/* Overlay info panel at the bottom */}
			<div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
				{/* Name + Age + Gender */}
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-xl font-bold drop-shadow-md">
						{firstName} {lastName}, {age}
					</h2>
					<span className="badge bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md">
						{gender}
					</span>
				</div>

				{/* About */}
				<p className="text-sm opacity-95 mb-4 line-clamp-3 drop-shadow-sm">
					{about}
				</p>

				{/* Action buttons */}
				<div className="flex gap-3">
					<button
						className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl py-2 shadow-sm cursor-pointer"
						onClick={() => handleSendRequest("ignored")}
					>
						Ignore
					</button>
					<button
						className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-red-500 text-white font-semibold rounded-xl py-2 shadow-md cursor-pointer"
						onClick={() => handleSendRequest("interested")}
					>
						Interested
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
