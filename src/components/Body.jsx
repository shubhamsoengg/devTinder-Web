import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user);
	const fetchUser = async () => {
		if (userData) return;
		try {
			const res = await axios.get(BASE_URL + "/profile/view", {
				withCredentials: true,
			});
			const userData = res.data;
			dispatch(addUser(userData));
		} catch (error) {
			if (error.status == 401) {
				navigate("/login");
			}
		}
	};

	useEffect(() => {
		if (!userData) {
			fetchUser();
		}
	}, []);

	return (
		<div className="app-body flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-1 container mx-auto p-4">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Body;
