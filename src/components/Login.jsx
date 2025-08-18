import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [emailId, setEmailId] = useState("shubham@gmail.com");
	const [password, setPassword] = useState("Shubham@1234");
	const [loginError, setLoginError] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					email: emailId,
					password: password,
				},
				{ withCredentials: true }
			);
			dispatch(addUser(res.data));
			setLoginError(null);
			return navigate("/");
		} catch (error) {
			setLoginError(
				`${error?.response?.statusText}: ${error?.response?.data}`
			);
			console.log(err);
		}
	};

	return (
		<div className="card card-border bg-base-100 w-96">
			<div className="card-body">
				<h2 className="card-title">Login</h2>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">Email Id</legend>
					<input
						type="text"
						className="input"
						placeholder="Enter your email id here"
						value={emailId}
						onChange={(e) => setEmailId(e.target.value)}
					/>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">Password</legend>
					<input
						type="password"
						className="input"
						placeholder="Enter your password here"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</fieldset>

				{loginError && (
					<div role="alert" className="alert alert-error alert-soft">
						<span>{loginError}</span>
					</div>
				)}

				<div className="card-actions justify-center">
					<button
						className="btn btn-primary"
						onClick={(e) => handleLogin()}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
