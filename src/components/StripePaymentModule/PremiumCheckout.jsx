import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../config/constants";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PremiumCheckout() {
	const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

	const storeClientSecret = useSelector((store) => store.clientSecret);
	const sessionClientSecret = sessionStorage.getItem("clientSecret");
	const clientSecret = storeClientSecret || sessionClientSecret;
	return (
		clientSecret && (
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret,
					appearance: {
						theme: "none", // strip away Stripe's defaults
						variables: {
							// Tailwind base tokens
							colorPrimary: "#3B82F6", // blue-500
							colorBackground: "#ffffff",
							colorText: "#111827", // gray-900
							colorDanger: "#DC2626", // red-600
							fontFamily:
								"Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
							fontSizeBase: "16px",
							borderRadius: "0.5rem", // rounded-lg
						},
					},
				}}
			>
				<Outlet />
			</Elements>
		)
	);
}
