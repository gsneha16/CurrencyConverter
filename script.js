let BaseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let selects = document.querySelectorAll(".selects");
let btn = document.querySelector("button");
let amount = document.querySelector("form input");
let fromCurr= document.querySelector(".from select")
let toCurr= document.querySelector(".to select")
let msg = document.querySelector(".msg")
// console.log("Currency Code : Country Code")
// for (let code in countryList){
//    console.log(code, ":" ,countryList[code]);
// }
for ( let select of selects){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        // newOption.value = currCode;
        if (select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}
let updateFlag = (element) =>{
    let currCode = element.value ;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let Img = element.parentElement.querySelector("img")
    Img.src = newSrc;
}
let updateExachngeRate = async () =>{
    let amtVal = amount.value;
    if (amtVal==="" && amtVal < 0 ) {
        amtVal=1;
        amount.value = "1";
    }
    let Url = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let reponse = await fetch(Url);
    let data = await reponse.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExachngeRate();
});
window.addEventListener("load",()=>{
   updateExachngeRate();
} )