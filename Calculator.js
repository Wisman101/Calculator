let variables = {
    current: '0',  //stores the current value being taken
    operand: 0,    //stores the operand input
    memory: '0',   //stores the previous value
    decimal: 0,    //activated if a decimal point has been used to avoid double usage
    eq: 0,         //Activated after an '=' operation
    neg: 0,        //activated when "neg" button is pressed, helps to realize a double negation
    result: 0,     //stores the result of the operation
    d: 0,          //activated if the last input is a decimal
    ops:'',
    input: '',
    ans:''
}

//function to take users input from the keyboard
document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
    }
    button(e.key);
})


function renderAns(){
    document.getElementById('ans').value = variables.ans;
}

function renderOperand(){

    document.getElementById('operand').value = variables.ops;
}

function renderInput(){
    document.getElementById('input').value = variables.input;
}

function render(field){
    console.log(variables);
    
    switch (field) {
        case 'ans':
            renderAns();
            break;

        case 'operand':
            renderOperand();
            break;
    
        case 'input':
            renderInput();
            break;
        case 'all':
            renderOperand();
            renderAns();
            renderInput();

    }
}

//checks the input value and calls the respective function
function button(value) {
    let digit = /[0-9]/i;
    let test = digit.test(value);
    if(test === true){
        number(value);
    }
    else if(value === '*' || value === '='|| value === 'Enter' || value === '/' || value === '-' || value === '+'){
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
            //render()
            render('operand');
    }

    variables.eq = 0;
    if (variables.current === '0'){
        variables.current = num;
    }
    else{
        variables.current += num;
    }
    //update
    variables.ans = variables.current;
    //render

    render('ans');
}

//function for checking the operation and updating the operand variable.
function operation(operation) {
    let ops = operation;
    let ans='';
    let input = '';

    if(ops === 'Enter'){
        ops = '=';
    }

    //update ops
    variables.ops = ops;

    // //render ops
    // render('operand');

    if (variables.operand === 0) {
        if (variables.d === 1) {
            variables.current = variables.current.slice(0,-1);
        }
        if(variables.current === '-' || variables.current === '-0'){
            variables.current = '0';
        }
        variables.memory = variables.current;
        variables.current = '0';

        //update
        variables.input = variables.memory;
        variables.ans = variables.current;


        variables.decimal = 0;
    }else if(variables.operand !== 0 && variables.current !== '0'){
        equal();
    }


    if (variables.eq === 1) {
        variables.memory = variables.result;
        variables.current = '0';
        
        //update
        variables.input = variables.memory;
        variables.ans = variables.current;


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

        //update
        variables.input = '';
        variables.ans = "error! Division by zero";


            variables.result = 0;
        }else{
            variables.memory = '0';
            variables.current = '0';
  
            //update
            variables.input = '';
            variables.ans =variables.result;
        }

    }
    variables.neg = 0;

    //will render here once
    render('all');
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

    }else if (variables.decimal === 0){
        variables.current += '.';
        variables.d = 1;
        variables.decimal = 1;

    }


    //update
    variables.ans = variables.current;


    //render()
    render('ans');
}

//function to negate
function negate() {
    variables.eq = 0;
    if(variables.neg === 0){
        if(variables.current === '0'){
            variables.current = '-';
            variables.neg = 1;

        }else{
            variables.current = '-' + variables.current;
            variables.neg = 1;

        }
    }else{
        let y = variables.current.length;
        variables.current = variables.current.slice(1,y);
        variables.neg = 0;

    }

    //update
    variables.ans = variables.current;

    render('ans')
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

           

        //update
    variables.ans = variables.current;
    variables.input = '';
    variables.operand = '';

    }else if(x === 'd' || x === 'Backspace'){
        let v = variables.current.length;
        let m = variables.current.slice(v-1);
        if( m === '.'){
            variables.decimal = 0;
            variables.d = 0;
        }

        if (variables.eq === 0){
            variables.current = variables.current.slice(0,-1);

        }else{
            
            
            variables.current = variables.result.toString();
            variables.current = variables.current.slice(0,-1);
            variables.eq = 0;
            

             //update
            variables.ans = variables.current;
            variables.operand = '';
        }
        
    }

    //render()
    render('all');

}