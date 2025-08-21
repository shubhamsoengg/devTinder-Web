import { useState } from "react";
import {
	UserIcon,
	Cog6ToothIcon,
	LockClosedIcon,
	CreditCardIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import MatchedConnections from "./MatchedConnections";
import PendingRequests from "./PendingRequests";

const Connections = () => {
	const [activeTab, setActiveTab] = useState("connections");

	const tabs = [
		{
			id: "connections",
			label: "My Connections",
			content: <MatchedConnections />,
		},
		{
			id: "requests",
			label: "Pending Requests",
			content: <PendingRequests />,
		},
	];

	return (
		<div className="flex w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-xl shadow-xl overflow-hidden border border-base-300 min-h-128">
			{/* Left Side Tabs */}
			<div className="w-1/4 bg-base-100/60 backdrop-blur-md">
				<ul className="space-y-2 relative">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return (
							<li key={tab.id}>
								<button
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-3 w-full px-4 py-3 text-gray-600 transition-all duration-300  ${
										isActive
											? "border-l-4 border-orange-500 bg-base-200"
											: "hover:bg-base-200"
									}`}
								>
									<span className="font-medium">
										{tab.label}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Right Side Content (blended, no border) */}
			<div className="flex-1 p-10 bg-base-200/80 backdrop-blur-md">
				{tabs.map(
					(tab) =>
						activeTab === tab.id && (
							<div key={tab.id} className="animate-fadeIn">
								<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
									{tab.label}
								</h2>
								<div className="text-lg opacity-80 leading-relaxed">
									{tab.content}
								</div>
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default Connections;
