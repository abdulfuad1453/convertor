let fromData = "RUB",
    toData = "USD",
    amount;
let allCurrenciesBox = Array.from(
    document.querySelectorAll("[class*='each-currency-']")
);
let selectBox = document.getElementById("convert-from-area");
let fromMuted = document.getElementById("count-of-money-from");
let toMuted = document.getElementById("count-of-money-to");
let selectBox2 = document.getElementById("convert-to-area")
eventListeners();


function eventListeners() {
    allCurrenciesBox.forEach((div) =>
        div.addEventListener("click", changeCurrencyBoxController)
    );

    selectBox.addEventListener("change", converterController);
    selectBox.addEventListener("input", handleInputIn);
    selectBox2.addEventListener("change", converterController);
    selectBox2.addEventListener("input", handleInputOut);
    selectBox.addEventListener("keyup", clearInput);
    selectBox2.addEventListener("keyup", clearInput);
}

function clearInput(){

    if(selectBox.value===""){
        selectBox2.value=""
    }


    if(selectBox2.value===""){
        selectBox.value=""
    }
}


function activator(paramsBoxData, paramsThis) {
    paramsBoxData.forEach((div) => {
        if (div === paramsThis) {
            div.setAttribute("style", "background-color:#833AE0; color:white;");
        } else {
            div.hasAttribute("style") ? div.removeAttribute("style") : null;
        }
    });
}

function changeCurrencyBoxController(e) {
    let fromBoxes, toBoxes;
    fromBoxes = allCurrenciesBox.filter(
        (div) => div.className === "each-currency-from"
    );
    toBoxes = allCurrenciesBox.filter(
        (div) => div.className === "each-currency-to"
    );

    if (this.className === "each-currency-from") {
        activator(fromBoxes, this);
        fromData = this.textContent.trim();
        handleInputOut();
    } else {
        activator(toBoxes, this);
        toData = this.textContent.trim();
        handleInputIn();
    }

}

function converterController(e) {
    if (e.target.id == "convert-from-area") {
        handleInputIn();
    } else {
        handleInputOut();
    }
}

function handleInputIn() {
    if (fromData && toData && selectBox.value) {
        let api = new Api(fromData, toData);
        if (selectBox.value == '') {
            selectBox2.value = "";
        }
        if (selectBox.value[0] == "0" && selectBox.value.length == 2) {
            selectBox.value = selectBox.value[1];
        }
        api.getRemote(toData).then(res => {
            selectBox2.value = +(
                res * selectBox.value.replaceAll(" ", "")
            ).toFixed(2).substring(0, 13);
            selectBox2.value = commify(selectBox2.value)
            fromMuted.textContent = `1${fromData} = ${res} ${toData}`;

        })

        new Api(toData, fromData).getRemote(fromData).then(res => {
            toMuted.textContent = `1${toData} = ${res} ${fromData}`;
        })
    }
}

function handleInputOut() {
    if (fromData && toData && selectBox2.value) {
        let api = new Api(toData, fromData);
        api.getRemote(fromData).then((res) => {
            selectBox.value = +(
                res * selectBox2.value.replaceAll(" ", "")
            ).toFixed(2).substring(0, 13);
            selectBox.value = commify(selectBox.value)
            toMuted.textContent = `1${toData} = ${res} ${fromData}`;
        });
        if (selectBox2.value == '') {
            selectBox.value = "";
        }
        if (selectBox2.value[0] == "0" && selectBox2.value.length == 2) {
            selectBox2.value = selectBox2.value[1];
        }
        new Api(fromData, toData).getRemote(toData).then((res) => {
            fromMuted.textContent = `1${fromData} = ${res} ${toData}`;
        });
    }
}