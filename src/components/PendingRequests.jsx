import axios from "axios";
import { BASE_URL } from "../config/constants";
import { useDispatch, useSelector } from "react-redux";
import {
	setPendingRequests,
	updatePendingRequest,
} from "../store/slice/connectionSlice";
import { useEffect } from "react";

const PendingRequests = () => {
	const dispatch = useDispatch();
	const pendingRequests = useSelector(
		(store) => store.connections.pendingRequests
	);
	const fetchPendingRequests = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/user/requests/received`, {
				withCredentials: true,
			});
			const requestsData = res?.data?.data;
			dispatch(setPendingRequests(requestsData));
		} catch (error) {
			console.error("Error fetching pending requests:", error);
		}
	};

	useEffect(() => {
		if (!pendingRequests) {
			fetchPendingRequests();
		}
	}, [pendingRequests, dispatch]);

	const handleRequest = async (status, requestId) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/request/review/${status}/${requestId}`,
				{},
				{ withCredentials: true }
			);
			console.log(res.data.data);
			const updatedRequest = res?.data?.data;
			dispatch(updatePendingRequest(updatedRequest._id));
		} catch (error) {
			console.error(`Error ${status} request:`, error);
		}
	};

	if (!pendingRequests || pendingRequests.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<p className="text-lg font-semibold text-gray-700">
					No pending requests found.
				</p>
			</div>
		);
	}
	return pendingRequests.map((request) => {
		const { firstName, lastName, age, about, profilePicture, gender } =
			request.fromUserId;
		return (
			<div
				className="flex items-center gap-6 w-full max-w-3xl bg-base-100 rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300"
				key={request._id}
			>
				{/* Profile Picture */}
				<div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
					<img
						src={profilePicture}
						alt={`${firstName} ${lastName}`}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* User Info */}
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold">
							{firstName} {lastName}, {age}
						</h2>
						<span className="badge bg-gradient-to-r from-orange-500 to-pink-500 text-white">
							{gender}
						</span>
					</div>
					<p className="text-sm opacity-80 mt-2 line-clamp-3">
						{about}
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col gap-3">
					<button
						onClick={() => handleRequest("rejected", request._id)}
						className="btn btn-sm rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
					>
						Reject
					</button>
					<button
						onClick={() => handleRequest("accepted", request._id)}
						className="btn btn-sm rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-red-500 text-white"
					>
						Accept
					</button>
				</div>
			</div>
		);
	});
};

export default PendingRequests;
