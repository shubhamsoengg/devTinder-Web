import React from "react";

const Home = () => {
	return (
		<div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center py-20 px-6">
				<h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
					DevTinder 🔥
				</h1>
				<p className="text-lg md:text-xl max-w-2xl mb-8">
					Swipe. Match. Collaborate. The fastest way for developers to
					find teammates, mentors, and projects.
				</p>
				<div className="flex gap-4">
					<button className="btn bg-white text-red-600 border-0 hover:bg-gray-100">
						Get Started
					</button>
					<button className="btn btn-outline text-white hover:bg-red-600">
						Learn More
					</button>
				</div>
			</section>

			{/* Features */}
			<section className="py-16 px-6 bg-white text-gray-800">
				<h2 className="text-3xl font-bold text-center mb-12">
					Why DevTinder?
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					<div className="card bg-orange-100 shadow-lg rounded-2xl">
						<div className="card-body items-center text-center">
							<span className="text-4xl">🤝</span>
							<h3 className="text-xl font-semibold">Connect</h3>
							<p>
								Find developers near you who share your passion.
							</p>
						</div>
					</div>
					<div className="card bg-red-100 shadow-lg rounded-2xl">
						<div className="card-body items-center text-center">
							<span className="text-4xl">⚡</span>
							<h3 className="text-xl font-semibold">Match</h3>
							<p>
								Swipe through profiles and match instantly with
								like-minded devs.
							</p>
						</div>
					</div>
					<div className="card bg-pink-100 shadow-lg rounded-2xl">
						<div className="card-body items-center text-center">
							<span className="text-4xl">🚀</span>
							<h3 className="text-xl font-semibold">
								Collaborate
							</h3>
							<p>
								Start building the next big idea together today.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Sample Profile Preview */}
			<section className="py-20 px-6 flex flex-col items-center">
				<h2 className="text-3xl font-bold mb-8">Preview Profiles</h2>
				<div className="card w-80 bg-white text-gray-800 shadow-2xl">
					<figure className="h-60">
						<img
							src="https://placekitten.com/400/300"
							alt="Profile"
							className="object-cover w-full h-full rounded-t-2xl"
						/>
					</figure>
					<div className="card-body">
						<h3 className="card-title">
							Alex Johnson{" "}
							<div className="badge bg-red-500 text-white">
								NEW
							</div>
						</h3>
						<p>Fullstack Developer • React • Node.js • Cloud</p>
						<div className="card-actions justify-center mt-4">
							<button className="btn bg-orange-500 border-0 hover:bg-orange-600">
								Send Interest
							</button>
							<button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
								Ignore
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-center">
				<h2 className="text-3xl font-bold mb-6">
					Ready to find your next dev partner?
				</h2>
				<button className="btn bg-white text-red-600 border-0 hover:bg-gray-100">
					Join DevTinder Now
				</button>
			</section>
		</div>
	);
};

export default Home;
