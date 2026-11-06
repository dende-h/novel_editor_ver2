// サービス終了につき、どのURLにアクセスしても終了告知ページ（/）を表示する
/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	async rewrites() {
		return {
			// public/ や pages/ に存在しないパスはすべて / に書き換える（旧ページ・旧APIを含む）
			fallback: [{ source: '/:path*', destination: '/' }]
		};
	},
	async headers() {
		return [
			{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
			{ source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }] }
		];
	}
};
