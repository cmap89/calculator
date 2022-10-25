function add(x, y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    return x / y;
};

function operate(symbol, x, y) {

    if (symbol === "+") {
        return add(x, y);
    } else if (symbol === '-') {
        return subtract(x, y);
    } else if (symbol === '*') {
        return multiply(x, y);
    } else if (symbol === '/') {
        return divide(x, y);
    };
};

const calcScreen = document.getElementById('screen');
const buttons = document.querySelectorAll('#btn');

buttons.forEach(button => button.addEventListener('click', () => {
    console.log(button.innerHTML);
}));