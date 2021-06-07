const cells = document.querySelectorAll(".cell");
const label = document.querySelector(".label");
const btn = document.querySelector(".btn");
let xturn = true;
let x = "X";
let o = "O";
let oplaces = [];
let xplaces = [];
let inGame = true;

let winningConditions =
[[1,2,3],
[4,5,6],
[7,8,9],
[1,5,9],
[3,5,7],
[1,4,7],
[2,5,8],
[3,6,9]];

btn.addEventListener('click', function () {
    // cells.forEach(cell => {
    //     cell.innerHTML = '';
    // })
    // inGame = true;
    // console.log("restarted");
    location.reload();
})

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
})

function handleClick(e) {
    if (!inGame) {
        console.log("not in game");
        return;
    }
    let cell = e.target;
    // if (cell.innerHTML != '') return;
    const turn = xturn ? x : o;
    cell.innerHTML = turn;
    
    let node = cell.previousSibling;
    for (var i=1; (node=node.previousSibling);i++);
    j = ((i -1)/2) + 1;
    if (xturn) {
        xplaces.push(j);
    } else {
        oplaces.push(j);
    }
    //check if won
    xturn = !xturn;
    label.innerHTML = (xturn) ? x : o;
    label.innerHTML += "'s turn";
    if (isWon(turn)) {
        label.innerHTML = turn + " won!";
        console.log("finished");
        inGame = false;
    } else if (isDraw()) {
        label.innerHTML = "A draw!";
        inGame = false;
    }
}

function isWon(turn) {
    let choice = (turn==x) ? xplaces : oplaces;
    console.log(choice);

    for(let i=0;i<winningConditions.length;i++) {
        if (winningConditions[i].every(elem => choice.includes(elem))) return turn;
    }
    return false;
}

function isDraw() {
    let sum = 0;
    for (let i=0;i<5;i++) {
        if (xplaces[i]) sum += xplaces[i];
        if (oplaces[i]) sum += oplaces[i];
    }
    console.log(sum);
    return (sum == 45);

}