import {
	UserIcon,
	CameraIcon,
	PencilSquareIcon,
	InformationCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [age, setAge] = useState(user.age || "");
	const [skills, setSkills] = useState(user.skills || []);
	const [gender, setGender] = useState(user.gender || "Other");
	const [about, setAbout] = useState(user.about || "");
	const [profilePicture, setProfilePicture] = useState(
		user.profilePicture || ""
	);

	const dispatch = useDispatch();
	const handleSave = async () => {
		try {
			const res = await axios.patch(
				`${BASE_URL}/profile/edit`,
				{
					firstName,
					lastName,
					age,
					skills,
					gender,
					about,
				},
				{
					withCredentials: true,
				}
			);
			const userData = res?.data?.data;
			dispatch(addUser(userData));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center flex-1 bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-8">
			<div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-lg">
				<div className="flex flex-col items-center md:items-start gap-8 md:w-1/3 bg-gradient-to-br from-orange-400 via-red-400 to-red-500 p-8">
					<div className="text-center md:text-left">
						<h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2 flex items-center gap-2">
							<UserIcon className="h-8 w-8 text-white inline-block mr-2" />
							Hi, {firstName}!
						</h2>
						<p className="text-white/90 text-base mb-2">
							Your profile is your digital handshake. Keep it
							fresh to connect with devs and unlock new
							opportunities!
						</p>
						<p className="text-white/80 italic text-sm flex items-center gap-1">
							<InformationCircleIcon className="h-4 w-4 text-white/80 inline-block" />
							Tip: Click any field to edit your details.
						</p>
					</div>
					<div className="flex flex-col items-center self-center gap-4 mt-4">
						<div className="relative group">
							<img
								src={profilePicture}
								alt="Profile"
								className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
							/>
							<label className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 cursor-pointer shadow-lg hover:bg-white flex items-center">
								<input
									type="file"
									className="hidden"
									onChange={(e) => {
										if (
											e.target.files &&
											e.target.files[0]
										) {
											setProfilePicture(
												URL.createObjectURL(
													e.target.files[0]
												)
											);
										}
									}}
								/>
								<CameraIcon className="h-6 w-6 text-red-500" />
							</label>
						</div>
					</div>
				</div>

				{/* Right: Editable Fields */}
				<div className="flex-1 flex flex-col gap-6 p-8 bg-white/90 rounded-3xl">
					{/* Name, Age, Gender */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="label flex items-center gap-1">
								<span className="label-text font-semibold text-sm text-gray-600">
									First Name
								</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-gray-600"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<label className="label flex items-center gap-1">
								<span className="label-text font-semibold text-sm text-gray-600">
									Last Name
								</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-gray-600 "
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="label flex items-center gap-1">
								<span className="label-text font-semibold text-sm text-gray-600">
									Age
								</span>
							</label>
							<input
								type="number"
								className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-gray-600"
								value={age}
								onChange={(e) => setAge(Number(e.target.value))}
							/>
						</div>
						<div>
							<label className="label flex items-center gap-1">
								<span className="label-text font-semibold text-sm text-gray-600">
									Gender
								</span>
							</label>
							<select
								className="select select-bordered w-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-gray-600"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							>
								<option>Male</option>
								<option>Female</option>
								<option>Other</option>
							</select>
						</div>
					</div>

					{/* About */}
					<div>
						<label className="label flex items-center gap-1">
							<span className="label-text font-semibold text-sm text-gray-600">
								About
							</span>
						</label>
						<textarea
							className="textarea textarea-bordered w-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-gray-600"
							rows={4}
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							placeholder="Tell us about yourself, your passions, or your favorite tech stack!"
						/>
					</div>

					{/* Skills */}
					<div>
						<label className="label flex items-center gap-1">
							<span className="label-text font-semibold text-sm text-gray-600">
								Skills
							</span>
						</label>
						<div className="flex flex-wrap gap-2 mb-2">
							{skills.map((skill, idx) => (
								<span
									key={idx}
									className="badge badge-outline bg-red-100 text-orange-600 px-3 py-2 rounded-full shadow cursor-pointer hover:bg-orange-200 transition flex items-center gap-1"
									onClick={() =>
										setSkills(
											skills.filter((s) => s !== skill)
										)
									}
									title="Remove skill"
								>
									{skill}
									<XMarkIcon className="h-4 w-4 ml-1 text-orange-600" />
								</span>
							))}
						</div>
						<input
							type="text"
							placeholder="Add a skill and press Enter"
							className="input input-bordered w-full focus:outline-none focus:ring-1 focus:border-orange-400 text-gray-800 focus:ring-orange-200"
							onKeyDown={(e) => {
								if (
									e.key === "Enter" &&
									e.currentTarget.value.trim() !== ""
								) {
									setSkills([
										...skills,
										e.currentTarget.value.trim(),
									]);
									e.currentTarget.value = "";
								}
							}}
						/>
					</div>

					{/* Save Button */}
					<div className="mt-6">
						<button
							className="btn w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:scale-101 transition-transform shadow-lg py-3 text-lg rounded-xl flex items-center justify-center gap-2"
							onClick={handleSave}
						>
							<PencilSquareIcon className="h-6 w-6 text-white" />
							Save Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
