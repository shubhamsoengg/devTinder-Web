import React from "react";
import logo from "../../assets/devTinder_logo_1.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
	UserIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user);

	const handleLogout = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/logout",
				{},
				{
					withCredentials: true,
				}
			);
			dispatch(removeUser(user));
			navigate("/login");
		} catch (error) {}
	};

	return (
		<div className="navbar bg-white/80 backdrop-blur-md text-gray-800 shadow-sm px-6">
			{/* Left: Logo */}
			<div className="flex-1 flex items-center">
				<Link to="/" className="flex items-center">
					<span className="font-bold text-lg">DevTinder</span>
				</Link>
			</div>

			{/* Center: Navigation Links */}
			<div className="hidden md:flex gap-6 mx-auto mr-10 text-md font-semibold text-gray-700">
				<Link to="/feed" className="hover:text-orange-500">
					Discover
				</Link>
				<Link to="/connections" className="hover:text-orange-500">
					Connections
				</Link>
				<a href="/messages" className="hover:text-orange-500">
					Messages
				</a>
			</div>

			{/* Right: User Greeting & Avatar */}
			{user && (
				<div className="flex items-center gap-4">
					<p className="hidden sm:block font-semibold text-gray-700">
						👋 Hello,{" "}
						<span className="text-orange-500">
							{user.firstName}
						</span>
						!
					</p>

					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="rounded-full w-10 h-10">
								<img
									src={user.profilePicture}
									alt="User Avatar"
								/>
							</div>
						</div>

						<ul
							tabIndex={0}
							className="menu menu-md dropdown-content bg-white text-gray-800 rounded-box shadow mt-3 w-48 p-2"
						>
							<li>
								<Link to="/profile">
									{" "}
									<UserIcon className="w-6 h-6 text-gray-700" />{" "}
									Profile
								</Link>
							</li>

							<li>
								<a onClick={handleLogout}>
									<ArrowRightStartOnRectangleIcon className="w-6 h-6 text-gray-700" />{" "}
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
