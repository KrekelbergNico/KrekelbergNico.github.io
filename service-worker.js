let cacheName = 'v3';
let cacheFiles = [
    './',
    './assets/javascripts/jquery-3.1.1.min.js',
    './assets/stylesheets/reset.css',
    './assets/stylesheets/style.css',
    './assets/web-fonts-with-css/css/fontawesome-all.min.css',
    './assets/web-fonts-with-css/webfonts/fa-solid-900.woff2',
    './assets/web-fonts-with-css/webfonts/fa-solid-900.woff',
    './assets/web-fonts-with-css/webfonts/fa-solid-900.ttf',
    './assets/web-fonts-with-css/webfonts/fa-regular-400.woff2',
    './assets/web-fonts-with-css/webfonts/fa-regular-400.woff',
    './assets/web-fonts-with-css/webfonts/fa-regular-400.ttf',
    './fixedcosts.html',
    './index.html',
    './convert.html',
    './manifest.json',
    './assets/javascripts/main.js',
    './assets/javascripts/converter.js',
    './assets/javascripts/fixedcosts.js',
    './assets/images/icons/icon-72x72.png',
    './assets/images/icons/icon-96x96.png',
    './assets/images/icons/icon-128x128.png',
    './assets/images/icons/icon-144x144.png',
    './assets/images/icons/icon-152x152.png',
    './assets/images/icons/icon-192x192.png',
    './assets/images/icons/icon-384x384.png',
    './assets/images/icons/icon-512x512.png',
    './assets/images/icons/apple-touch-icon-57x57.png',
    './assets/images/icons/apple-touch-icon-72x72.png',
    './assets/images/icons/apple-touch-icon-76x76.png',
    './assets/images/icons/apple-touch-icon-114x114.png',
    './assets/images/icons/apple-touch-icon-120x120.png',
    './assets/images/icons/apple-touch-icon-144x144.png',
    './assets/images/icons/apple-touch-icon-152x152.png',
    './assets/images/icons/apple-touch-icon-180x180.png',
    './assets/images/splash/apple-320x480.png',
    './assets/images/splash/apple-640x960.png',
    './assets/images/splash/apple-750x1334.png',
    './assets/images/splash/apple-768x1024.png',
    './assets/images/splash/apple-1242x2208.png',
    './assets/images/splash/apple-1536x2008.png',
    './assets/images/splash/apple-1536x2048.png',
];


function converterResults(){
    currencies.forEach(function(currency){
        cacheFiles.push("https://api.fixer.io/latest?base="+currency);
    })
}


let currencies = ["AUD", "BGN", "BRL", "CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK",
    "JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"];



self.addEventListener('install', function(e){
    converterResults();
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(cacheFiles);
        })
    )
});


self.addEventListener('activate', function(e){
    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response){
                return response;
            }

        })
    )
});