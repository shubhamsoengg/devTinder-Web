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
			const userFeed = res.data.feed;
			console.log(userFeed);
			dispatch(addFeed(userFeed));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserFeed();
	}, []);

	return (
		<div className="feed-wrapper flex justify-center">
			{userFeed && <UserCard user={userFeed[0]} />}
		</div>
	);
};

export default Feed;
