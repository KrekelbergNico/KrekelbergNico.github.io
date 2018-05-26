/**
 * Created by nicokrekelberg on 2/03/18.
 */

function stateList(){
    if($(".countryList").text() === "Show Currency Name List"){
        $(".countryList").text("Hide Currency Name List");
    } else {
        $(".countryList").text("Show Currency Name List");
    }
    $("#listcountries").toggle();
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