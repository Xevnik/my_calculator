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
    console.log("button clicked: ", val);
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

function displayStuff(){
    switch(myNumberArray[place].type){
        case 'C':
            $("#numDisplayArea, #calculatedDisplayArea").text("");
            break;
        case 'number':
        case 'operator':
            console.log("Displaying goods.");
            $("#numDisplayArea").text(myNumberArray[place].value);
            console.log(myNumberArray);
            break;
        case 'calculated':
            $("#calculatedDisplayArea").text("=" + myNumberArray[place].value);
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
        if(stringVal === '.' &&  (myNumberArray[place].value.indexOf('.') !== -1)){//decimal already present
            console.log("I've had it with these **** decimals in this **** number!");
            return;
        }
        myNumberArray[place].type = 'number';
        myNumberArray[place].value += stringVal;
        displayStuff();
    }
}

function operatorOrEqualSign(stringVal){
    //create new object in next index slot
    myNumberArray[++place] = {};
    myNumberArray[place].value = stringVal;
    if(stringVal !== '='){//operator has been received.
        console.log("It's not '='!");
        myNumberArray[place].type = 'operator';
        displayStuff();
        //operator entered. increment index and prep for next number
        place++;
        prepNewObj();
    }else{//stringVal is '='
        myNumberArray[place].type = 'equalSign';
        console.log("Preparing to do math", myNumberArray);
        doMath();
    }
}

function doMath(){
    console.log("Math Hamsters are at work");
    //TODO Do math
}

//reset all globals and prep obj
function allClear(){
    console.log("In all clear function");
    myNumberArray = [];
    place = 0;
    prepNewObj();
    //todo AllClear needs to display blank display
    displayStuff();
}

function clearEntry(){
    console.log("In Clear function. Remove last item");
    myNumberArray.pop();
    prepNewObj();
    //todo Clear current entry and display last entry
    displayStuff()
}

//creates new obj in the current array index
//prep value property with empty for concatenating number
function prepNewObj(){
    myNumberArray[place] = {};
    myNumberArray[place].value = '';
}