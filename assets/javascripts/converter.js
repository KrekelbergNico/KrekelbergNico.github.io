/**
 * Created by nicokrekelberg on 2/03/18.
 */

let currencyFull = ["AUD = Australian Dollar", "BGN = Bulgarian Lev", "BRL = Brazilian Real", "CAD = Canadian Dollar",
    "CHF = Swiss Franc","CNY = Renminbi (Chinese) Yuan","CZK = Czech Koruna","DKK = Danish Krone","EUR = Euro",
    "GBP = Pound Sterling","HKD = Hong Kong Dollar","HRK = Croatian Kuna","HUF = Hungarian Forint",
    "IDR = Indonesian Rupiah","ILS = Israeli New Shekel","INR = Indian Rupee","ISK = Icelandic Krona",
    "JPY = Japanese Yen","KRW = South Korean Won","MXN = Mexican Peso","MYR = Malaysian Ringgit","NOK = Norwegian Krone",
    "NZD = New Zealand Dollar","PHP = Philippine Piso","PLN = Polish Zloty","RON = Romanian Leu","RUB = Russian Ruble",
    "SEK = Swedish Krona","SGD = Singapore Dollar","THB = Thai Baht","TRY = Turkish Lira","USD = United States Dollar",
    "ZAR = South African Rand"];

function stateList(){
    let html = "";
    currencyFull.forEach(function(currency){
        html += "<p>currency</p>"
    });
    $("#listcountries").html(html).show();
}


function convert() {
    let from = $("#fromCurrency").val();
    let to = $("#toCurrency").val();
    let amount = $('#fromAmount').val();

    fetch("https://api.fixer.io/latest?base="+from).then(response =>
    response.json()
    ).then(res => {
        if (from === to) {
            $('#toAmount').val(amount * 1);
        } else {
            $('#toAmount').val(amount * res.rates[to]);
        }
    }).catch(error => console.error(error));

}



function fillInCountries() {
    currencies.forEach(function (element) {
        $("#fromCurrency").append("<option value=" + element + ">" + element + "</option>");
        $("#toCurrency").append("<option value=" + element + ">" + element + "</option>");
    });
    convert()
}

function checkConnection(){
    let online = navigator.onLine;
    if(!online){
        $("#offline").html("You need connection to use this converter");
    } else {
        $("#offline").html("");
    }
}

$(document).ready(function () {
    fillInCountries();
    checkConnection();
    $("#fromCurrency").on('change', convert);
    $("#toCurrency").on('change', convert);
    $("#fromAmount").on('keyup', convert);
    $(".countryList").on('click', stateList)
});