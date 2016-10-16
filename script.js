/**
 * Created by Kevin Chau on 10/11/16.
 */
//Global Variables
var myNumberArray = [{
    type: undefined,
    value: '',
}];
var place = 0;

$(document).ready(clickHandlers);

function clickHandlers(){
    //console.log("Handler ready!");
    $("button").click(getClicked);
}

function getClicked(){
    //console.log("In getClicked");
    var val = $(this).text();
    //console.log("button clicked: ", val);
    switch(val){
        case 'C':
            console.log("All clearing!");
            allClear();
            break;
        case 'CE':
            console.log("Clearing Entry!");
            clearEntry();
            break;
        default:
            addItem(val);
    }
}

function displayStuff(obj){
    switch(obj.type){
        case 'C':
            $("#numDisplayArea, #calculatedDisplayArea").text("");
            break;
        case 'number':
        case 'operator':
            console.log("Displaying goods.");
            $("#numDisplayArea").text(obj.value);
            break;
        case 'calculated':
            $("#calculatedDisplayArea").text("= " + obj.value);
            break;
    }
}

function addItem(stringVal){
    //console.log("in addItem. Value passed: ", stringVal, typeof stringVal);
    if(isNaN(parseFloat(stringVal)) && stringVal !== '.'){
        //console.log("Operator or Equal sign entered");
        operatorOrEqualSign(stringVal);
    }else{
        //console.log("It's a number/first decimal!");
        if(stringVal === '.' &&  (myNumberArray[place].value.indexOf('.') !== -1)){//decimal already present
            //console.log("I've had it with these **** decimals in this **** number!");
            return;
        }
        myNumberArray[place].type = 'number';
        myNumberArray[place].value += stringVal;
        displayStuff(myNumberArray[place]);
    }
}

function operatorOrEqualSign(stringVal){
    if(myNumberArray[place].type === 'number'){//current index is number or number was last inputted
        console.log("Make way for operator/equal sign");
        place++;//move to next index to add operator or equal sign;
        prepNewObj();
        myNumberArray[place].value = stringVal;
        if(stringVal !== '='){//operator has been received.
            //console.log("It's not '='!");
            myNumberArray[place].type = 'operator';
            displayStuff(myNumberArray[place]);
            //operator entered. increment index and prep for next number
            place++;
            prepNewObj();
        }else{//stringVal is '='
            myNumberArray[place].type = 'equalSign';
            console.log("Preparing to do math", myNumberArray);
            displayStuff(orderOfOperation(stringToFloat(myNumberArray)));
        }
    }else if(myNumberArray[(place-1)].type = 'operator' && stringVal !== '=') {//last input operator
        console.log("changing the operator");
        myNumberArray[place - 1].value = stringVal;//replace operator with new operator
    }
}



//Walks through given array parsing for '*' and '/', followed by '+' and '-'
//calls doMath and receiving the result
//calls displayStuff to display total when done.
function orderOfOperation(array){
    var result = null;
    //do multiplication and division first
    for(var i = 0; i < array.length; i++){
        //look for operators in the array
        //console.log('Array before checking operators: ', array[i], i);
        if(array[i].type == 'operator'){
            //Look for multiplication and division
            if(array[i].value == 'x' || array[i].value == '/'){
                //grab value starting one index before operator though value one index after operator
                result = doMath(
                    array[i-1].value, //first num
                    array[i+1].value, //second num
                    array[i].value // '*' or '/' operator
                );
                //overwrite value with new ones to maintain length
                array[i-1].value = 0;
                array[i].value = '+';
                array[i+1].value = result;
            }
        }
    }

    console.log("Multiplication/Division done. ", array);
    for(var j = 0; j < array.length-2; j++){
        if(array[j].type === 'operator'){
            result = doMath(
                array[j-1].value, //first num
                array[j+1].value, //second num
                array[j].value // '+' or '-' operator
            );
            array[j-1].value = 0;
            array[j].value = '+';
            array[j+1].value = result;
        }
    }
    console.log('Math done: ', array);
    array[place].value = array[j].value;
    array[place].type = 'calculated';
    return array[place];
}

//take 3 parameters: 2 numbers and 1 operator
//return result of operation
function doMath(num1, num2, operator){
    console.log("Math Hamsters are at work");
    //convert string to floats
    var result = null;
    switch(operator){
        case 'x':
            result = num1 * num2;
            return result;
        case '/':
            if(num2 == 0){
                return 'error';
            }else{
                result = num1 / num2;
            }
            return result;
        case '+':
            result = num1 + num2;
            return result;
        case '-':
            result = num1 - num2;
            return result;
    }
}

//reset all globals and prep obj
function allClear(){
    console.log("In all clear function");
    var clearAllFlag = {type: 'C'};
    myNumberArray = [];
    place = 0;
    prepNewObj();
    displayStuff(clearAllFlag);
}

function clearEntry(){
    console.log("In clear entry. Remove current number");
    if(myNumberArray[place].type === 'number'){//clear out current number entered
        myNumberArray[place].value = '';
        displayStuff(myNumberArray[place]);
    }
}

//creates new obj in the current array index
//prep value property with empty for concatenating number
function prepNewObj(){
    myNumberArray[place] = {};
    myNumberArray[place].value = '';
}

//Loops through array of objects looking for type 'number' and converting to floats
function stringToFloat(array){
    for(var i = 0; i < array.length; i++){
        if(array[i].type === 'number'){
            array[i].value = parseFloat(array[i].value);
        }
    }
    console.log('String to Float: ', array);
    return array;
}