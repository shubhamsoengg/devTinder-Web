import React from "react";

const UserCard = ({ user }) => {
	const { firstName, lastName, age, gender, profilePicture, about } = user;

	return (
		<div className="card bg-base-100 w-96 shadow-sm flex justify-center">
			<figure>
				<img src={profilePicture} className="w-full" alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					{firstName + " " + lastName}
					<div className="badge badge-secondary">NEW</div>
				</h2>
				<p>{about}</p>
				<div className="flex w-full gap-2">
					<button className="btn bg-gray-200 text-gray-800 flex-1">
						Ignore
					</button>
					<button className="btn bg-pink-500 text-white flex-1">
						Interested
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
