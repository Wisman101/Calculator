let variables = {
    current: '0',  //stores the current value being taken
    operand: 0,    //stores the operand input
    memory: '0',   //stores the previous value
    decimal: 0,    //activated if a decimal point has been used to avoid double usage
    eq: 0,         //Activated after an '=' operation
    neg: 0,        //activated when "neg" button is pressed, helps to realize a double negation
    result: 0,     //stores the result of the operation
    d: 0,          //activated if the last input is a decimal
}

//function to take users input from the keyboard
document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
    }
    button(e.key);
})

//checks the input value and calls the respective function
function button(value) {
    let digit = /[0-9]/i;
    let test = digit.test(value);
    if(test === true){
        number(value);
    }
    else if(value === '*' || value === '='|| value === 'Enter' || value === '/' || value === '-' || value === '+'){
        if(value === 'Enter'){
            document.getElementById('operand').value = '=';
        }else{
            document.getElementById('operand').value = value;
        }
        operation(value);
    }
    else if(value === '.'){
        decimalPoint();
    }
    else if(value === 'neg'){
       negate();
    }
    else if(value === 'c' || value === 'd' || value === 'Backspace'){
        clear(value);
    }
}

//function for number inputs
function number(num) {
    variables.d = 0;
    if(variables.eq === 1){
        document.getElementById('operand').value = '';
    }
    variables.eq = 0;
    if (variables.current === '0'){
        document.getElementById('ans').value = num;
        variables.current = num;
    }
    else{
        variables.current += num;
        document.getElementById('ans').value = variables.current;
    }
}

//function for checking the operation and updating the operand variable.
function operation(ops) {

    if (variables.operand === 0) {
        if (variables.d === 1) {
            variables.current = variables.current.slice(0,-1);
        }
        if(variables.current === '-' || variables.current === '-0'){
            variables.current = '0';
        }
        variables.memory = variables.current;
        variables.current = '0';
        document.getElementById('input').value = variables.memory;
        document.getElementById('ans').value = variables.current;
        variables.decimal = 0;
    }else if(variables.operand !== 0 && variables.current !== '0'){
        equal();
    }
    if (variables.eq === 1) {
        variables.memory = variables.result;
        variables.current = '0';
        document.getElementById('input').value = variables.memory;
        document.getElementById('ans').value = variables.current;
        variables.eq = 0;
    }
    if (ops === '+') {
        variables.operand = 1;
    } else if (ops === '-') {
        variables.operand = 2;
    } else if (ops === '*') {
        variables.operand = 3;
    } else if (ops === '/') {
        variables.operand = 4;
    }
    else if(ops === '=' || ops === 'Enter'){
        equal();
        if(variables.result === 'err'){
            document.getElementById('ans').value = "error! Division by zero";
            document.getElementById('input').value = '';
            variables.result = 0;
        }else{
            document.getElementById('ans').value = variables.result;
            variables.memory = '0';
            variables.current = '0';
            document.getElementById('input').value = '';
        }

    }
    variables.neg = 0;
}

//function for performing the entered operation
function equal() {
    let firstValue = parseFloat(variables.memory);
    let secondValue = parseFloat(variables.current);
    switch (variables.operand) {
        case 1: {
            variables.result = firstValue + secondValue;
            break;
        }
        case 2: {
            variables.result = firstValue - secondValue;
            break;
        }
        case 3: {
            variables.result = firstValue * secondValue;
            break;
        }
        case 4: {
            if(secondValue === 0){
                variables.result = "err";
            }else{
                variables.result = firstValue / secondValue;
            }
            break;
        }
        default : {
            variables.result = variables.memory;
        }
    }
    variables.eq = 1;
    variables.operand = 0;
    variables.decimal = 0;
    variables.d = 0;
    variables.neg = 0;
}

//function to add decimal point
function decimalPoint() {
    variables.eq = 0;
    let v = variables.current.length;
    let m = variables.current.slice(v-1);
    if(m === '-'){
        variables.current += '0.';
        variables.d = 1;
        variables.decimal = 1;
        document.getElementById('ans').value = variables.current;
    }else if (variables.decimal === 0){
        variables.current += '.';
        variables.d = 1;
        variables.decimal = 1;
        document.getElementById('ans').value = variables.current;
    }
}

//function to negate
function negate() {
    variables.eq = 0;
    if(variables.neg === 0){
        if(variables.current === '0'){
            variables.current = '-';
            document.getElementById('ans').value = variables.current;
            variables.neg = 1;
        }else{
            variables.current = '-' + variables.current;
            document.getElementById('ans').value = variables.current;
            variables.neg = 1;
        }
    }else{
        let y = variables.current.length;
        variables.current = variables.current.slice(1,y);
        document.getElementById('ans').value = variables.current;
        variables.neg = 0;
    }

}

//function to delete ans clear all
function clear(x) {
    if(x === 'c'){
        variables.current = '0';
        variables.operand = 0;
        variables.memory = '0';
        variables.decimal = 0;
        variables.eq = 0;
        variables.neg = 0;
        variables.result = 0;
        variables.d = 0;
        document.getElementById('ans').value = variables.current;
        document.getElementById('input').value = ''
        document.getElementById('operand').value = '';
    }else if(x === 'd' || x === 'Backspace'){
        let v = variables.current.length;
        let m = variables.current.slice(v-1);
        if( m === '.'){
            variables.decimal = 0;
            variables.d = 0;
        }
        if (variables.eq === 0){
            variables.current = variables.current.slice(0,-1);
            document.getElementById('ans').value = variables.current;
        }else{
            document.getElementById('operand').value = '';
            variables.current = variables.result.toString();
            variables.current = variables.current.slice(0,-1);
            document.getElementById('ans').value = variables.current;
            variables.eq = 0;
        }


    }
}