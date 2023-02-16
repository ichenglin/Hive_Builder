/** @type {import("next").NextConfig} */
const nextConfig = {
	//reactStrictMode: true,
	productionBrowserSourceMaps: true,
	experimental: {
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
	poweredByHeader: false
};

module.exports = nextConfig;
