let firstNumber = null;
let operator = null;
let isExponentiation = false;
let isRoot = false;

function fill_info(message, result) {
    const info = document.getElementById('info');
    let additionalInfo = "";
    
    if (typeof result === 'number') {
        if (result < 100) {
            additionalInfo = "Info: The result is less than 100.";
        } else if (result >= 100 && result <= 200) {
            additionalInfo = "Info: The result is between 100 and 200.";
        } else {
            additionalInfo = "Info: The result is greater than 200.";
        }
    }
    info.innerHTML = message + "<br>" + additionalInfo;
}

function clearInputOnFocus(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener('focus', function () {
        this.value = "";
    });
}

function validateNumber(input) {
    if (isNaN(input) || input.trim() === '') {
        fill_info("Error: Please enter a valid number.", null);
        return false;
    }
    document.getElementById('errorMsg').textContent = "";
    return true;
}

function validateCSV(input) {
    let numbers = input.split(',').map(num => num.trim());
    if (numbers.some(num => isNaN(num) || num === '')) {
        fill_info("Error: Please enter a valid CSV format (numbers separated by commas).", null);
        return false;
    }
    document.getElementById('errorMsg').textContent = "";
    return true;
}

function mod() {
    let input = document.getElementById('numberInput').value;
    if (validateNumber(input)) {
        let result = input >= 0 ? input : -input;
        fill_info(`Operation: Modulus of ${input}. Result is: ${result}.`, result);
        document.getElementById('numberInput').value = result;
        document.getElementById('numberInput').focus();
    }
}

function fact() {
    let input = document.getElementById('numberInput').value;
    if (validateNumber(input)) {
        let number = parseInt(input);
        if (number < 0) {
            fill_info("Error: Negative number for factorial.", null);
            return;
        }
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        fill_info(`Operation: Factorial of ${number}. Result is: ${result}.`, result);
        document.getElementById('numberInput').value = result;
        document.getElementById('numberInput').focus();
    }
}

function showExponentField() {
    document.getElementById('exponentInput').style.display = "inline-block";
    isExponentiation = true;
}

function showRootField() {
    document.getElementById('rootInput').style.display = "inline-block";
    isRoot = true;
}

function store(op) {
    let input = document.getElementById('numberInput').value;
    if (validateNumber(input)) {
        firstNumber = parseFloat(input);
        operator = op;
        document.getElementById('numberInput').value = "";
        document.getElementById('numberInput').focus();
    }
}

function eq() {
    let secondNumber = document.getElementById('numberInput').value;

    if (isExponentiation) {
        let exponent = document.getElementById('exponentInput').value;
        if (validateNumber(secondNumber) && validateNumber(exponent)) {
            let result = Math.pow(parseFloat(secondNumber), parseFloat(exponent));
            fill_info(`Operation: ${secondNumber} raised to the power of ${exponent}. Result is: ${result}.`, result);
            document.getElementById('numberInput').value = result;
            isExponentiation = false;
            document.getElementById('exponentInput').style.display = "none";
            document.getElementById('exponentInput').value = "";
            document.getElementById('numberInput').focus();
            return;
        }
    }

    if (isRoot) {
        let rootValue = document.getElementById('rootInput').value;
        if (validateNumber(secondNumber) && validateNumber(rootValue)) {
            let result = Math.pow(parseFloat(secondNumber), 1 / parseFloat(rootValue));
            fill_info(`Operation: ${rootValue} root of ${secondNumber}. Result is: ${result}.`, result);
            document.getElementById('numberInput').value = result;
            isRoot = false;
            document.getElementById('rootInput').style.display = "none";
            document.getElementById('rootInput').value = "";
            document.getElementById('numberInput').focus();
            return;
        }
    }

    if (validateNumber(secondNumber)) {
        secondNumber = parseFloat(secondNumber);
        let result;
        if (operator === '+') {
            result = firstNumber + secondNumber;
        } else if (operator === '*') {
            result = firstNumber * secondNumber;
        }
        fill_info(`Operation: ${firstNumber} ${operator} ${secondNumber}. Result is: ${result}.`, result);
        document.getElementById('numberInput').value = result;
        operator = null;
        document.getElementById('numberInput').focus();
    }
}

function sumCSV() {
    let input = document.getElementById('csvInput').value;
    if (validateCSV(input)) {
        let numbers = input.split(',').map(Number);
        let result = numbers.reduce((a, b) => a + b, 0);
        fill_info(`Operation: Sum of [${numbers.join(', ')}]. Result is: ${result}.`, result);
        document.getElementById('csvInput').focus();
    }
}

function averageCSV() {
    let input = document.getElementById('csvInput').value;
    if (validateCSV(input)) {
        let numbers = input.split(',').map(Number);
        let result = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        fill_info(`Operation: Average of [${numbers.join(', ')}]. Result is: ${result}.`, result);
        document.getElementById('csvInput').focus();
    }
}

function sortCSV() {
    let input = document.getElementById('csvInput').value;
    if (validateCSV(input)) {
        let numbers = input.split(',').map(Number);
        numbers.sort((a, b) => a - b);
        fill_info(`Operation: Sort of [${numbers.join(', ')}].`, null);
        document.getElementById('csvInput').value = numbers.join(', ');
        document.getElementById('csvInput').focus();
    }
}

function reverseCSV() {
    let input = document.getElementById('csvInput').value;
    if (validateCSV(input)) {
        let numbers = input.split(',').map(Number);
        numbers.reverse();
        fill_info(`Operation: Reverse of [${numbers.join(', ')}].`, null);
        document.getElementById('csvInput').value = numbers.join(', ');
        document.getElementById('csvInput').focus();
    }
}

function removeElement() {
    let input = document.getElementById('csvInput').value;
    let elementToRemove = prompt("Enter the number to remove from the CSV list:");
    
    if (validateCSV(input) && validateNumber(elementToRemove)) {
        let numbers = input.split(',').map(Number);
        let index = numbers.indexOf(parseFloat(elementToRemove));

        if (index !== -1) {
            numbers.splice(index, 1);
            fill_info(`Operation: Remove ${elementToRemove} from [${numbers.join(', ')}].`, null);
        } else {
            fill_info(`Error: Element ${elementToRemove} not found in CSV list.`, null);
        }
        document.getElementById('csvInput').value = numbers.join(', ');
        document.getElementById('csvInput').focus();
    }
}

clearInputOnFocus('numberInput');
clearInputOnFocus('csvInput');
