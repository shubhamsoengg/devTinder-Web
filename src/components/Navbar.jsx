import React from "react";
import logo from "../../assets/devTinder_logo_1.png";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

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
					<p>Hello, {user.firstName}!</p>
					<div className="dropdown dropdown-end mx-10">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
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
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
