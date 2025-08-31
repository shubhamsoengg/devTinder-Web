import { useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/premium-checkout/complete`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "accordion",
	};

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			{/* Page Heading */}
			<div className="max-w-5xl mx-auto text-center mb-10">
				<h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
				<p className="mt-2 text-gray-600">
					Complete your purchase securely below.
				</p>
			</div>
			<div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
				{/* LEFT SIDE: Order Info */}
				<div className="flex-1 bg-white rounded-xl shadow p-6">
					<h2 className="text-xl font-semibold mb-4">Your Order</h2>
					<ul className="space-y-2 text-gray-700">
						<li className="flex justify-between">
							<span>Premium Membership</span>
							<span>$29.99</span>
						</li>
						<li className="flex justify-between">
							<span>Discount</span>
							<span>- $5.00</span>
						</li>
						<li className="flex justify-between font-bold border-t pt-2">
							<span>Total</span>
							<span>$24.99</span>
						</li>
					</ul>
					<p className="mt-4 text-sm text-gray-500">
						You’ll get unlimited access to all premium features.
					</p>
				</div>
				<form
					id="payment-form"
					onSubmit={handleSubmit}
					className="w-full max-w-md mx-auto"
				>
					<PaymentElement
						id="payment-element"
						options={paymentElementOptions}
					/>
					<button
						disabled={isLoading || !stripe || !elements}
						id="submit"
						className="btn btn-primary w-full mt-4	"
					>
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								"Pay now"
							)}
						</span>
					</button>
					{/* Show any error or success messages */}
					{message && <div id="payment-message">{message}</div>}
				</form>
			</div>
		</div>
	);
}
