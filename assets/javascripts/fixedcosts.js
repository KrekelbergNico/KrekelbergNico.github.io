/* REGION INDEXEDDB */
let request = window.indexedDB.open("costDatabase", 1);
let db = null;

request.onerror = function (e) {
    alert("Sorry, something went wrong here!");
};

request.onupgradeneeded = function (e) {
    db = e.target.result;
    let os = db.createObjectStore("costs", {keyPath: "id", autoIncrement: true});
};

request.onsucces = function (e) {
    db = e.target.result;
};

request.onsucces = function (e) {
    db = e.target.result;
    saveCost();
};

request.onsuccess = function (e) {
    db = e.target.result;
    retrieveCosts();
};

request.onsucces = function (e) {
    db = e.target.result;
    deleteActualCost();
};

let saveCost = function (name, color, price, frequency) {
    let cost = {
        name: name, color: color, price: price, frequency: frequency
    };

    let trans = db.transaction("costs", "readwrite");
    let os = trans.objectStore("costs");
    os.add(cost).onsuccess = function (e) {
        retrieveCosts();
    };
};

let retrieveCosts = function () {
    let trans = db.transaction("costs");
    let os = trans.objectStore("costs");
    os.getAll().onsuccess = function (e) {
        let html = "";
        let weektotal = 0;
        let monthtotal = 0;
        let yeartotal = 0;
        e.target.result.forEach(function(record){
            weektotal += transferToWeek(record);
            monthtotal += transferToMonth(record);
            yeartotal += transferToYear(record);
            html += "<div id='cost'><p class='categorybox' style='background-color:" + record.color + "'></p><p class='title'>" + record.name + "</p><p class='price'>€" + record.price + "/" + record.frequency + " <a href='#' id='"+record.id+"'><i class='fas fa-trash'></i></a></p></div>";
        });
        $("#totalcosts").html("€"+Math.round(weektotal * 100) / 100+"/w   €"+Math.round(monthtotal * 100) / 100+"/m   €"+Math.round(yeartotal * 100) / 100+"/y");
        $("#costs").html(html);
        switchToCostsField();
    };
};

function transferToWeek(record){
    if(record.frequency === "w"){
        return parseInt(record.price);
    } else if (record.frequency === "m"){
        return parseInt(record.price /4);
    } else {
        return parseInt(record.price / 52);
    }
}

function transferToMonth(record){
    if(record.frequency === "m"){
        return parseInt(record.price);
    } else if (record.frequency === "w"){
        return parseInt(record.price * 4);
    } else {
        return parseInt(record.price / 12);
    }
}

function transferToYear(record){
    if(record.frequency === "y"){
        return parseInt(record.price);
    } else if (record.frequency === "w"){
        return parseInt(record.price * 52);
    } else {
        return parseInt(record.price * 12);
    }
}

let deleteActualCost = function (id) {
    let trans = db.transaction("costs", "readwrite");
    let os = trans.objectStore("costs");
    os.delete(parseInt(id)).onsuccess = function (e){
        retrieveCosts();
    }
};

let deleteCost = function(e){
    e.preventDefault();
    let id = e.target.id;
    //console.log(identifier);
    //let id = identifier.getAttribute("data-id");
    deleteActualCost(id);
};




/* REGION NEW COST */
function fillInColors() {
    colors.forEach(function (color) {
        $("#colornewcost").append("<option value=" + color + ">" + color + "</option>");
    })
}

function processCost() {
    let namecost = $("#namecost").val().toLowerCase();
    let colornewcost = $("#colornewcost").val();
    let pricenewcost = $("#pricenewcost").val();
    let frequencycost = $("#timenewcost").val().charAt(0);

    if(namecost === "" || pricenewcost === "" || colornewcost === "" || frequencycost === "" || namecost.length > 7 || pricenewcost.length > 7){
        $("#errors").html("name length max. 7 ; price length max. 7 ; fill everything in")
    } else {
        saveCost(namecost, colornewcost, pricenewcost, frequencycost);
    }
}

/* REGION MAIN */
function switchToCostsField() {
    $("#newfixedcost").hide();
    $("#allthecosts").show();
    $("#namecost").val("");
    $("#pricenewcost").val("");
    $("#errors").html("");
    $("i.fa-plus").show();
    $("i.fa-home").show();
    $("i.fa-times").hide();
    $("i.fa-save").hide();
}


function switchToNewField() {
    $("#allthecosts").hide();
    $("#newfixedcost").show();
    $("i.fa-plus").hide();
    $("i.fa-home").hide();
    $("i.fa-times").show();
    $("i.fa-save").show();
}




$(document).ready(function () {
    fillInColors();
    $("i.fa-plus").on('click', switchToNewField);
    $("i.fa-save").on('click', processCost);
    $("#cost").on('click', 'a', deleteCost);
});