// 旧バージョンで登録された Service Worker を解除するためのファイル。
// ブラウザが sw.js の更新を検知するとこのワーカーに置き換わり、キャッシュを全削除して自身を登録解除する。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.map((key) => caches.delete(key)));
			await self.registration.unregister();
			const clients = await self.clients.matchAll({ type: 'window' });
			clients.forEach((client) => client.navigate(client.url));
		})()
	);
});
