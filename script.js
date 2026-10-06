let Base_URL = "https://api.frankfurter.dev/v2/rate";

let dropDown = document.querySelectorAll(".container select");

let btn = document.querySelector("#calculate");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let result = document.querySelector(".msg p");

for (let select of dropDown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;


        if (select.name === "from" && currCode === "NPR") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "CAD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

window.addEventListener("load", ()=>{
    updateExchange();
})


let updateFlag = (element) => {
    let currCode = element.value;

    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();

    updateExchange();
});


let updateExchange = async () => {
    let amount = document.querySelector("#money");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amountVal.value = "1";
    }


    let URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;

    let response = await fetch(URL);

    let data = await response.json();

    let rate = data.rate;

    let finalVal = rate * amountVal;

    result.innerText = `${amountVal}\t${fromCurr.value} = ${finalVal.toFixed(2)}\t${toCurr.value}`;
}