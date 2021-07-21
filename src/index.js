function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let openBrackets = 0;
    let closeBrackets = 0;

    if (expr.includes("/ 0")) {
        throw "TypeError: Division by zero."
    }

    if (expr.includes('(') || expr.includes(')')) {
        let i = 0;
        while (i < expr.length) {
            if (expr[i] === '(') {
                openBrackets++
            } else if (expr[i] === ')') {
                closeBrackets++
            }
            i++
        }
    }

    if (expr.split(' ').join('').split('').length === expr.length) {
        expr = expr.split(' ').join('').split('')
    } else {
        expr = expr.trim().split(' ').filter(el => el.length > 0);
    }

    function bracketsOperations(expr) {
        while (expr.includes('(')) {
            let arrayPiece = expr.slice(expr.lastIndexOf('('))
            let bracketsPiece = arrayPiece.slice(arrayPiece.indexOf('('), arrayPiece.indexOf(')') + 1)
            expr.splice(expr.lastIndexOf('('), bracketsPiece.length, String(mixedOperations(bracketsPiece)))
        }
        return mixedOperations(expr)
    }

    function mixedOperations(expr) {
        let division = (expr) => {
            result = +expr[expr.indexOf('/') - 1] / +expr[expr.indexOf('/') + 1];
            return expr.splice((expr.indexOf('/') - 1), 3, String(result))
        }
        let multiplication = (expr) => {
            result = +expr[expr.indexOf('*') - 1] * +expr[expr.indexOf('*') + 1];
            return expr.splice((expr.indexOf('*') - 1), 3, String(result))
        }
        let addition = (expr) => {
            result = +expr[expr.indexOf('+') - 1] + +expr[expr.indexOf('+') + 1];
            return expr.splice((expr.indexOf('+') - 1), 3, String(result))
        }
        let subtraction = (expr) => {
            result = +expr[expr.indexOf('-') - 1] - +expr[expr.indexOf('-') + 1];
            return expr.splice((expr.indexOf('-') - 1), 3, String(result))
        }

        while (expr.includes('/') || expr.includes('*') || expr.includes('-') || expr.includes('+')) {
            if (expr.includes('/') && expr.includes('*')) {
                if (expr.indexOf('/') < expr.indexOf('*')) {
                    division(expr)
                } else {
                    multiplication(expr)
                }
            } else if (expr.includes('/')) {
                division(expr)
            } else if (expr.includes('*')) {
                multiplication(expr)
            } else if (expr.includes('+') && expr.includes('-')) {
                if (expr.indexOf('+') < expr.indexOf('-')) {
                    addition(expr)
                } else {
                    subtraction(expr)
                }
            } else if (expr.includes('+')) {
                addition(expr)
            } else {
                subtraction(expr)
            }
        }
        if (expr.includes('(')) {
            return +expr[1]
        }
        return +expr[0]
    }

    if (openBrackets !== closeBrackets) {
        throw "ExpressionError: Brackets must be paired";
    } else if (openBrackets === closeBrackets) {
        return bracketsOperations(expr)
    } else {
        return mixedOperations(expr);
    }
}

module.exports = {
    expressionCalculator
}