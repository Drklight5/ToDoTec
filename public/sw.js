self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pomodoro-timer-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/_next/static/chunks/main.js',
                '/_next/static/chunks/webpack.js',
                '/_next/static/css/styles.chunk.css',
            ])
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
})