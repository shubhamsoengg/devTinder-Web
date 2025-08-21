import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const MatchedConnections = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections.connections);

	const fetchUserConnections = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/user/connections`, {
				withCredentials: true,
			});
			const connectionData = res?.data?.connections;
			console.log(connectionData);
			dispatch(setConnections(connectionData));
		} catch (error) {
			console.error("Error fetching user connections:", error);
		}
	};

	useEffect(() => {
		fetchUserConnections();
	}, []);

	if (!connections) return;

	return (
		<>
			{connections.map((connection) => {
				const { profilePicture, firstName, lastName, age, about } =
					connection;
				return (
					<div
						key={connection._id}
						className="flex items-center gap-6 w-full max-w-3xl bg-base-100 rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300 my-4"
					>
						{/* Profile Picture */}
						<div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
							<img
								src={profilePicture}
								alt={`${firstName} ${lastName}`}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* User Info */}
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-bold">
									{firstName} {lastName}, {age}
								</h2>
								<span className="badge badge-success text-white">
									Connected
								</span>
							</div>
							<p className="text-sm opacity-80 mt-2 line-clamp-3">
								{about}
							</p>
						</div>

						{/* Actions */}
						<div className="flex flex-col gap-3">
							<button className="btn btn-sm rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-red-500 text-white">
								Message
							</button>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default MatchedConnections;
