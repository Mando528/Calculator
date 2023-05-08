const screen = document.querySelector(".display");
let calcButton = document.querySelector(".calc-buttons");

let runningResult = 0 ;
let buffer = "0";
let currentOperator;

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            runningResult = 0;
            buffer = "0";
            break;
        case '=':
            if(currentOperator === null){
                return;
            }
            let intBuffer = Number(buffer);
            flushOperation(intBuffer);
            currentOperator = null;
            buffer = runningResult;
            runningResult = 0;
            break;

        case '←':    
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        
        case '.':    
            if(buffer.includes(".")){
                buffer = buffer;
            }else{
                buffer +=".";
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol){
    if(buffer === "0"){
        return;
    }

    let intBuffer = Number(buffer);
    if(runningResult === 0){
        runningResult = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    currentOperator = symbol;
    buffer = '0';
}


function flushOperation(intBuffer){
    if(currentOperator === '+'){
        runningResult += intBuffer;
    }
    else if(currentOperator === '-'){
        runningResult -= intBuffer;
    }
    else if(currentOperator === '×'){
        runningResult *= intBuffer;
    }
    else if(currentOperator === '÷'){
        runningResult /= intBuffer;
    }
}

function handleNumber(number){
    if (buffer === '0'){
        buffer = number;
    }
    else{
        buffer +=number;
    }
}

function inIt(){
    calcButton.addEventListener("click", function (e){
        buttonClick(e.target.innerText);
    })
}

inIt();


