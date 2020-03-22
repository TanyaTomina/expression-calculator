function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let reg = /\([^()]+\)/;
    let divZero = /\/0/;

    if (expr) {
        expr = expr.replace(/\s/g, '');
    } else {
        throw Error();
    }
    let braketsStart = expr.match(/\(/g);
    let braketsEnd = expr.match(/\)/g);


    if (braketsStart === null || braketsEnd === null) {
        if (!(braketsStart === null && braketsEnd === null)) {
            throw Error('ExpressionError: Brackets must be paired');
        }
    } else if (braketsStart.length !== braketsEnd.length) {
        throw Error('ExpressionError: Brackets must be paired');
    }





    if (divZero.test(expr)) {
        throw Error('TypeError: Division by zero.');
    }


    let result = expr.match(reg);
    if (result) {
        let currentResult = calc(result[0].slice(1, -1));
        expr = expr.replace(reg, currentResult);
        return parseFloat(expressionCalculator(expr), 10);
    } else {
        return parseFloat(calc(expr), 10);
    }
}

function calc(str) {
    let reg = /([\-+]?\d+\.?\d*(?:e-)?\d*)([*\/])([\-+]?\d+\.?\d*(?:e-)?\d*)/;
    let regSimple = /([\-+]?\d+\.?\d*(?:e-)?\d*)([+\-])([\-+]?\d+\.?\d*(?:e-)?\d*)/;
    let resultSimple = str.match(regSimple);
    let result = str.match(reg);
    let resultReturn;
    if (result) {
        let currentResult = simpleCalc(result[0]);
        if (currentResult >= 0) {
            currentResult = '+' + currentResult;
        }
        str = str.replace(reg, currentResult);
        resultReturn = calc(str);
    } else if (resultSimple){
        let currentResult = simpleCalc(resultSimple[0]);
        if (currentResult >= 0) {
            currentResult = '+' + currentResult;
        }
        str = str.replace(regSimple,currentResult);
        resultReturn = calc(str);
    } else {
        resultReturn = parseFloat(str, 10);
    }

    return resultReturn;
}

function simpleCalc(str) {
    let match = str.match(/^([\-+]?\d+\.?\d*(?:e-)?\d*)([*\/+\-])([\-+]?\d+\.?\d*(?:e-)?\d*)$/);

    if (match) {
        let a = parseFloat(match[1], 10);
        let b = parseFloat(match[3], 10);
        let operator = match[2];

        if (operator === '*') {
            return a*b;
        } else if (operator === '/') {
            return str = a / b;
        } else if (operator === '+') {
            return str = a + b;
        } else if (operator === '-') {
            return str = a - b;
        }
    } else {
        return parseFloat(str, 10);
    }
}

module.exports = {
    expressionCalculator
}