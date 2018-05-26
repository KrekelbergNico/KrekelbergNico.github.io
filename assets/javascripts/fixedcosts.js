/*<div id="cost">
    <p class="categorybox" style="background-color: pink"></p><p class="title">Huur huis</p><p class="price">$600/month</p>
    </div>
*/
//TODO: TOTAL PRICE

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
            html += "<div id='cost'><p class='categorybox' style='background-color:" + record.color + "'></p><p class='title'>" + record.name + "</p><p class='price'>€" + record.price + "/" + record.frequency + " <i class='fas fa-trash' data-id="+record.id+" onclick='deleteCost(this)'></i></p></div>";
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
    console.log("deleting cost");
    let trans = db.transaction("costs", "readwrite");
    let os = trans.objectStore("costs");
    os.delete(parseInt(id)).onsuccess = function (e){
        retrieveCosts();
    }
};

let deleteCost = function(identifier){
    let id = identifier.getAttribute("data-id");
    deleteActualCost(id);
};




/* REGION NEW COST */
function fillInColors() {
    colors.forEach(function (color) {
        $("#colornewcost").append("<option value=" + color + ">" + color + "</option>");
    })
}

function processCost() {
    //als fields leeg zijn, doe er dan niks mee

    //indexdb, get list, and push this one to it.
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
}


function switchToNewField() {
    $("#allthecosts").hide();
    $("#newfixedcost").show();
}


$(document).ready(function () {
    fillInColors();
    $("#createnewcost").on('click', switchToNewField);
    $("div.savecost").on('click', processCost);
});