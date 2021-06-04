const tb = document.querySelector('input[type="text"]');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.list');

btn.addEventListener('click', function () {
    let li = document.createElement('li');
    let b = document.createElement('button');
    li.textContent = tb.value;
    b.textContent = "x";
    ul.appendChild(li);
    li.appendChild(b);
    tb.value = "";
    tb.focus();
    b.addEventListener('click', function () {
        li.remove();
    })
})

tb.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        btn.click();
    }
})