/* Calculator object */
const calculator = {
    display: '0',
    operand: null,
    firstVal: '0',
    lastOp: true,
    err: false
};

/* Memory object. */
const memory = {
    value: '0'
};

/* Maximum amount of numbers that the display can display. */
const displayLength = 14;

/* Handles memory functionality */
function updateMemory(mem) {
    if (mem == 'MR') {
        calculator.display = memory.value;
    } else if (mem == 'MS') {
        memory.value = calculator.display;
    } else {
        memory.value = '0';
    }
    updateDisplay();
}

/* Handles operators and stores display value if necessary. */
function updateCalc(operator) {
    calculator.operand = operator;

    if (calculator.lastOp == false) {
        calculator.firstVal = calculator.display;
    }
    calculator.display = operator;
    calculator.lastOp = true;
    updateDisplay();
}

/* Updates value from input and stores it accordingly. */
function updateValue(newVal) {
    if (calculator.display === '0' || calculator.lastOp || calculator.err) {
        calculator.display = newVal;
        calculator.err = false;
        calculator.lastOp = false;
    } else {
        if (calculator.display.toString().length > displayLength) {
            return;
        }
        calculator.display = calculator.display + newVal;
    }
    updateDisplay();
}

/* Clears all stored variables in the calculator object. */
function updateClear() {
    calculator.display = '0';
    calculator.firstVal = '0';
    calculator.operand = null;
    calculator.lastOp = true;
    updateDisplay();
}

/* Updates the display on the calculator. */
function updateDisplay() {
    document.getElementById("screen").innerHTML = calculator.display;
}

/* Calculates the output for the first value, the operator and the second value. */
function calculate() {
    if (!calculator.operand) {
        return;
    }

    let res = {
        '+': function (x, y) { return x + y },
        '-': function (x, y) { return x - y },
        '*': function (x, y) { return x * y },
        '/': function (x, y) { return x / y },
        'sin(x)': function (x, y) { return Math.sin(y * Math.PI / 180) },
        'cos(x)': function (x, y) { return Math.cos(y * Math.PI / 180) },
        'tan(x)': function (x, y) { return Math.tan(y * Math.PI / 180) }
    }
    /* Gets result from the values and operator and rounds the answer if necessary. */
    calculator.display = res[calculator.operand](parseFloat(calculator.firstVal), parseFloat(calculator.display));
    calculator.display = +(Math.round(calculator.display + "e+2")  + "e-2");
    calculator.firstVal = calculator.display;

    if (calculator.display.toString().length > displayLength) {
        calculator.display = "NaN";
        calculator.err = true;
    }
    updateDisplay();
}

/* Evenlistener for buttons on the calculator */
const keys = document.querySelector('.keys');

keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('mem')) {
        updateMemory(target.value);
    }

    if (target.classList.contains('operator')) {
        updateCalc(target.value);
        return;
    }

    if (target.classList.contains('num')) {
        updateValue(target.value);
        return;
    }

    if (target.classList.contains('clear')) {
        updateClear();
        return;
    }

    if (target.classList.contains('equal')) {
        calculate();
        return;
    }
});
