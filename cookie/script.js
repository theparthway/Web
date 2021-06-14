
// basic
const cookies = document.querySelector(".cookies");
const image = document.querySelector(".cookieimg");
const perSecond = document.querySelector(".perSecond");


const quantities = document.querySelectorAll(".qty");
const buttons = document.querySelectorAll(".buysell");
const costs = document.querySelectorAll(".Cost");
const rowsQty = document.getElementsByTagName("table")[0].rows;
const rowsStore = document.getElementsByTagName("table")[1].rows;

const items = ["Cursor", "Grandma", "Farm", "Mine", "Factory", "Bank", "Temple", "Wizardtower", "Shipment", "Alchemylab", "Portal"];
const cps = [0.1, 1, 47, 260, 1400, 7800, 44000];

var cookiesNumber = 0;
var perSecondNumber = 0;
var costNumber = [15, 100, 1100, 12000, 130000, 1400000, 20000000, 330000000, 5100000000, 75000000000, 1000000000000];
var qtyNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var clickValue = 1;
var hiddenItem = 1;

function bought (btn) {
    var index = items.findIndex(item => item == btn.dataset.item);
    console.log(index);
    cookiesNumber -= costNumber[index];
    costs[index].textContent = Math.floor(costNumber[index] + 1);
    perSecondNumber += cps[index];
    costNumber[index] *= 1.15;
    costs[index].textContent = Math.floor(costNumber[index] + 1);
    qtyNumber[index] += 1;
    quantities[index].textContent = qtyNumber[index];
    console.log("quantity of " + index + " is " + qtyNumber[index]);
    console.log(qtyNumber[index]);
    
    costs.forEach(function (cost) {
        var index1 = items.findIndex(item => item == cost.dataset.item);
        var btn = buttons[index1];
        if (btn) {
            if (cookiesNumber >= costNumber[index1]) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        }
    })

    assign();
}

function assign () {
    cookies.textContent = Math.floor(cookiesNumber);
    if (cookiesNumber >= 1) document.title = (Math.floor(cookiesNumber) + " cookies");
    perSecond.textContent = Math.floor(perSecondNumber);
}

image.addEventListener('click', function () {
    if (perSecondNumber >= 4) {
        clickValue = (perSecondNumber / 4);
    }
    cookiesNumber += clickValue;
    assign();
})

buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        bought(btn);
    })
})

setInterval (function () {
    cookiesNumber += perSecondNumber;
    costs.forEach(function (cost) {
        var index = items.findIndex(item => item == cost.dataset.item);
        var btn = buttons[index];
        if (btn) {
            if (cookiesNumber >= costNumber[index]) {
                btn.disabled = false;
            } else {
                btn.disabled = true;
            }
        }
    })

    if (cookiesNumber >= (0.7 * costNumber[hiddenItem])) {
        rowsQty[hiddenItem+1].style.visibility = "visible";
        rowsStore[hiddenItem+1].style.visibility = "visible";
        console.log("visible");
        hiddenItem += 1;
    }

    assign();
}, 1000);