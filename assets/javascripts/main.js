
// Detects if device is on iOS
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
};
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', {scope: './'})
        .then(function (registration) {
            console.log("SW Registered");
        })
        .catch(function (err) {
            console.log('SW Failed to register', err);
        });
}

function getConverterResults(){
    currencies.forEach(function(currency){
        cache.add("https://api.fixer.io/latest?base="+currency);
    })
}

let currencies = ["AUD", "BGN", "BRL", "CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK",
    "JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"];

let colors = ["Red","Blue","Green","Yellow","Pink","Purple","Beige","White","Black","Brown","Orange","Grey","Gold","Lime"
    ,"Magenta","Turquoise","Violet","DarkRed","DarkBlue","DarkGreen","DarkOrange","DarkGrey","DarkGoldenRod"
    ,"LightBlue","LightGreen","LightYellow","LightPink","LightGrey","LightGoldenRodYellow"];