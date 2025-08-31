import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Connections from "./components/Connections";
import PremiumMembership from "./components/PremiumMembership";
import PremiumCheckout from "./components/StripePaymentModule/PremiumCheckout";
import CompletePage from "./components/StripePaymentModule/CompletePage";
import CheckoutForm from "./components/StripePaymentModule/CheckoutForm";

function App() {
	return (
		<>
			<Provider store={appStore}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Body />}>
							<Route path="/" element={<Home />} />
							<Route path="/feed" element={<Feed />} />
							<Route path="/login" element={<Login />} />
							<Route
								path="/connections"
								element={<Connections />}
							/>
							<Route path="/profile" element={<Profile />} />
							<Route
								path="/premium"
								element={<PremiumMembership />}
							/>
						</Route>
						<Route
							path="/premium-checkout"
							element={<PremiumCheckout />}
						>
							<Route path="checkout" element={<CheckoutForm />} />
							<Route path="complete" element={<CompletePage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
