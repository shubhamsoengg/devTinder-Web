import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const userFeed = useSelector((store) => store.feed);

	const fetchUserFeed = async () => {
		if (userFeed) return;
		try {
			const res = await axios.get(BASE_URL + "/user/feed", {
				withCredentials: true,
			});
			const userFeed = res?.data?.data;
			dispatch(addFeed(userFeed));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserFeed();
	}, []);

	if (!userFeed) {
		return (
			<div className="flex w-52 flex-col gap-4">
				<div className="skeleton h-32 w-full"></div>
				<div className="skeleton h-4 w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
			</div>
		);
	}
	if (userFeed.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<p className="text-lg font-semibold text-gray-700">
					No users found in your feed.
				</p>
			</div>
		);
	}
	return (
		<>
			<div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-orange-400 to-rose-500 p-6">
				<h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
					Connect with new developers here!
				</h1>
				{/* Card container */}
				<div className=" max-w-sm stack stack-top w-full">
					{userFeed.map((user) => (
						<UserCard key={user._id} user={user} />
					))}
				</div>
				<p className="mt-6 text-white text-sm text-center drop-shadow-md max-w-xs">
					Swipe right if you’re interested, left to skip. Connect with
					like-minded developers!
				</p>
			</div>
		</>
	);
};

export default Feed;
