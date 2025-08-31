import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setClientSecret } from "../utils/clientSecretSlice";

const membershipPlans = [
	{
		id: 1,
		name: "Free",
		price: "$0/month",
		benefits: [
			"Limited Likes per day",
			"Basic Profile Visibility",
			"Standard Filters",
		],
	},
	{
		id: 2,
		name: "Premium",
		price: "$19.99/month",
		benefits: [
			"Unlimited Likes",
			"Profile Boost & Spotlight",
			"Advanced Filters",
			"Priority Support",
		],
	},
];

const PremiumMembership = () => {
	const [selectedPlan, setSelectedPlan] = useState(membershipPlans[0]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSelect = (plan) => {
		setSelectedPlan(plan);
	};

	const handleSelectPremium = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/payment/createIntent",
				{},
				{ withCredentials: true }
			);
			const clientSecret = res?.data?.data?.clientSecret;
			dispatch(setClientSecret(clientSecret));
			sessionStorage.setItem("clientSecret", clientSecret);
		} catch (error) {
			console.error("Error creating payment intent:", error);
		}
		navigate("/premium-checkout/checkout");
	};

	return (
		<section className="py-12 bg-gray-50 flex flex-col items-center">
			<h2 className="text-3xl font-bold mb-8 text-center">
				Choose Your Plan
			</h2>
			<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 w-full max-w-4xl px-4">
				{membershipPlans.map((plan) => (
					<div
						key={plan.id}
						className={`card w-full shadow-lg border-2 transition-transform transform hover:scale-105 cursor-pointer ${
							selectedPlan?.id === plan.id
								? "border-primary bg-primary/10"
								: "border-transparent"
						}`}
						onClick={() => handleSelect(plan)}
					>
						<div className="card-body flex flex-col justify-between">
							<h3 className="card-title text-xl font-semibold">
								{plan.name}
							</h3>
							<p className="text-2xl font-bold my-2">
								{plan.price}
							</p>
							<ul className="mb-4 space-y-1 text-gray-700">
								{plan.benefits.map((b, idx) => (
									<li key={idx} className="flex items-center">
										<span className="text-green-500 mr-2">
											✔
										</span>
										{b}
									</li>
								))}
							</ul>
							<button
								className={`btn w-full ${
									selectedPlan?.id === plan.id
										? "btn-primary"
										: "btn-outline"
								}`}
								onClick={() => handleSelectPremium(plan)}
							>
								{selectedPlan?.id === plan.id
									? "Selected"
									: "Select"}
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default PremiumMembership;
