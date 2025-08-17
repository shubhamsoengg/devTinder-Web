import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
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
