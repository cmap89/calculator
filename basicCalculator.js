class Calculator {
    constructor(prevOpTxt, currOpTxt) {
        this.prevOpTxt = prevOpTxt;
        this.currOpTxt = currOpTxt;
        this.clear();
    };

    clear() {
        this.currOp = "";
        this.prevOp = "";
        this.operation = undefined;
        this.updateDisp();
    };

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1);
    };

    appendNum(num) {
        if (num === '.' && this.currOp.includes('.')) return;
        this.currOp = this.currOp.toString() + num.toString();
    };

    chooseOperation(operation) {
        if (this.currOp === '') return;
        if (this.prev !== '') {
            this.compute();
        };
        this.operation = operation;
        this.prevOp = this.currOp;
        this.currOp = '';
    };

    compute() {
        let res;
        const prev = parseFloat(this.prevOp);
        const curr = parseFloat(this.currOp);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                res = prev + curr;
                break
            case '-':
                res = prev - curr
                break
            case '*':
                res = prev * curr
                break
            case '÷':
                res = prev / curr
                break
            default:
                return
        };
        this.currOp = res;
        this.operation = undefined;
        this.prevOp = '';
    };

    getDispNum(num) {
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split('.')[0]);
        const decDigits = strNum.split('.')[1];
        let intDisp;
        if (isNaN(intDigits)) {
            intDisp = '';
        } else {
            intDisp = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decDigits != null) {
            return `${intDisp}.${decDigits}`
        } else {
            return intDisp;
        }
    };

    updateDisp() {
        this.currOpTxt.innerText = this.getDispNum(this.currOp);
        if (this.operation != null) {
            this.prevOpTxt.innerText = `${this.getDispNum(this.prevOp)} ${this.operation}`;
        } else {
            this.prevOpTxt.innerText = this.getDispNum(this.prevOp);
        }
    };
};

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpTxt = document.querySelector('[data-prev-operand]');
const currOpTxt = document.querySelector('[data-curr-operand]');

const calc = new Calculator(prevOpTxt, currOpTxt);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText);
        calc.updateDisp();
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisp();
    });
});

equalButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisp();
});

allClearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisp();
});

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisp();
});