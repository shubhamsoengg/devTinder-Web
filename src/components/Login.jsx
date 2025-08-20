import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("shubham@gmail.com");
	const [password, setPassword] = useState("Shubham@1234");
	const [loginError, setLoginError] = useState(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isRegisteredUser, setIsRegisteredUser] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					email,
					password,
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

	const handleSignup = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/signup",
				{
					firstName,
					lastName,
					email,
					password,
				},
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			console.log(res.data.data);
			return navigate("/profile");
		} catch (error) {
			setLoginError(
				`${error?.response?.statusText}: ${error?.response?.data}`
			);
			console.log(err);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl shadow-xl bg-base-100 overflow-hidden">
				{/* Left Info Panel */}
				<div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-red-400 text-white p-10">
					{isRegisteredUser ? (
						<>
							<h1 className="text-3xl font-bold mb-4">
								Welcome to devTinder!
							</h1>
							<p className="text-lg opacity-90">
								{`Your connections are waiting — let’s keep building together!`}
							</p>
						</>
					) : (
						<>
							<h1 className="text-3xl font-bold mb-4">
								Welcome to devTinder!
							</h1>
							<p className="text-lg opacity-90">
								{`Looking for your next project partner? Start swiping… developer style!`}
							</p>
						</>
					)}
				</div>

				{/* Right Login/Signup Card */}
				<div className="p-8 flex items-center justify-center">
					<div className="card bg-base-100 w-96 rounded-xl shadow-lg">
						<div className="card-body">
							<h2 className="card-title">
								{isRegisteredUser
									? "Please Login to your Profile"
									: "Sign up"}
							</h2>

							{!isRegisteredUser && (
								<>
									<fieldset className="fieldset">
										<legend className="fieldset-legend">
											First Name
										</legend>
										<input
											type="text"
											className="input"
											placeholder="Enter your first name"
											value={firstName}
											onChange={(e) =>
												setFirstName(e.target.value)
											}
										/>
									</fieldset>
									<fieldset className="fieldset">
										<legend className="fieldset-legend">
											Last Name
										</legend>
										<input
											type="text"
											className="input"
											placeholder="Enter your last name"
											value={lastName}
											onChange={(e) =>
												setLastName(e.target.value)
											}
										/>
									</fieldset>
								</>
							)}

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Email Id
								</legend>
								<input
									type="text"
									className="input"
									placeholder="Enter your email id"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</fieldset>

							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Password
								</legend>
								<input
									type="password"
									className="input"
									placeholder="Enter your password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</fieldset>

							{loginError && (
								<div
									role="alert"
									className="alert alert-error alert-soft"
								>
									<span>{loginError}</span>
								</div>
							)}

							<div className="card-actions justify-center">
								<button
									className="btn w-full bg-orange-500 hover:bg-orange-600 text-white"
									onClick={() =>
										isRegisteredUser
											? handleLogin()
											: handleSignup()
									}
								>
									{isRegisteredUser ? "Login" : "Sign Up"}
								</button>
							</div>

							{isRegisteredUser ? (
								<a
									className="link link-secondary text-center mt-2"
									onClick={() => setIsRegisteredUser(false)}
								>
									Not a registered user? Sign up here!
								</a>
							) : (
								<a
									className="link link-secondary text-center mt-2"
									onClick={() => setIsRegisteredUser(true)}
								>
									Already registered? Login here!
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
