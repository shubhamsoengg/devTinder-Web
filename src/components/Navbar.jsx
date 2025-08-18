import React from "react";
import logo from "../../assets/devTinder_logo_1.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

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
		<div className="navbar">
			<div className="flex-1">
				<a className="m-2">
					<div className="h-15 overflow-hidden flex items-center">
						<img
							src={logo}
							alt="devTinder Logo"
							className="w-auto h-[10em]"
						/>
					</div>
				</a>
			</div>
			{user && (
				<div className="flex gap-2">
					<p className="self-center">Hello, {user.firstName}!</p>
					<div className="dropdown dropdown-end mr-10">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar h-full"
						>
							<div className="rounded-full w-32">
								<img
									alt="Tailwind CSS Navbar component"
									src={user.profilePicture}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
						>
							<li>
								<Link to="/profile" className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a onClick={handleLogout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
