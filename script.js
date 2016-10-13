/**
 * Created by Kevin Chau on 10/11/16.
 */
//Global Variables
var myNumberObj = {
     type: undefined,
    value: [''],
};
var place = 0;
$(document).ready(clickHandlers);

function clickHandlers(){
    //console.log("Handler ready!");
    $("button").click(getClicked);
}

function getClicked(){
    //console.log("In getClicked");
    var val = $(this).text();
    console.log("button clicked: ", val);
    switch(val){
        case 'C':
            console.log("All clearing!");
            allClear();
            break;
        case 'CE':
            console.log("Clearing Entry!");
            clear();
            break;
        default:
            addItem(val);
    }
}

function displayStuff(){
    console.log("Displaying goods.");
    // if(type === "itemAdded"){
    //     $("#numDisplayArea").text(value);
    // }else if(type === "calculated"){
    //     $("#operatorDisplayArea").text("="+value);
    // }else if(type === "error"){
    //     $("#display").text(value);
    // }else if(type === 'AC'){
    //     $("#numDisplayArea").text("");
    //     $("#operatorDisplayArea").text("");
    // }
    switch(myNumberObj.type){
        case 'C':
            $("#numDisplayArea, #calculatedDisplayArea").text("");
            break;
        case 'number':
        case 'operator':
            $("#numDisplayArea").text(myNumberObj.value[place]);
            console.log(myNumberObj);
            break;
        case 'calculated':
            $("#calculatedDisplayArea").text("=" + myNumberObj.value[place]);
            break;
    }
}

function addItem(stringVal){
    console.log("in addItem. Value passed: ", stringVal, typeof stringVal);
    if(isNaN(parseFloat(stringVal)) && stringVal !== '.'){
        console.log("Operator or Equal sign entered");
        operatorOrEqualSign(stringVal);
    }else{
        console.log("It's a number/first decimal!");
        if(stringVal === '.' &&  (myNumberObj.value[place].indexOf('.') !== -1)){//decimal already present
           console.log("I've had it with these **** decimals in this **** number!");
            return;
        }
        myNumberObj.type = 'number';
        myNumberObj.value[place] += stringVal;
        displayStuff();
    }
}

function operatorOrEqualSign(stringVal){
    if(stringVal !== '='){
        console.log("It's not '='!");
        myNumberObj.value[++place] = stringVal;
        displayStuff();
        myNumberObj.type = 'operator';
        myNumberObj.value[++place] = '';
    }else{//stringVal is '='
        console.log("Preparing to do math");
        doMath();
    }
}

function doMath(){
    console.log("Math Hamsters are at work");
    //TODO Do math
}

function allClear(){
    console.log("In all clear function");
}

function clear(){
    console.log("In Clear function. Remove last item");
    myNumberObj.value.pop();
    myNumberObj.value[place] = '';
    displayStuff()
}