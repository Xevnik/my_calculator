/**
 * Created by Kevin Chau on 10/11/16.
 */

//Global Variables
var my_calculator = new calculator(displayStuff);
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
            my_calculator.allClear();
            break;
        case 'CE':
            console.log("Clearing Entry!");
            my_calculator.clear();
            break;
        default:
            my_calculator.addItem(val);
    }
}

function displayStuff(type, value, item){
    console.log("In Display stuff. Type: ",type," value: ",value);
    // if(type === "itemAdded"){
    //     $("#numDisplayArea").text(value);
    // }else if(type === "calculated"){
    //     $("#operatorDisplayArea").text("="+value);
    // }else if(type === "error"){
    //     $("#display").text(value);
    // }else{
    //     $("#numDisplayArea").text("");
    //     $("#operatorDisplayArea").text("");
    // }
    //TODO testing switch statments
    switch(type){
        case 'C':
            $("#numDisplayArea, #calculatedDisplayArea").text("");
            break;
        case 'itemAdded':
            $("#numDisplayArea").text(value);
            break;
        case 'calculated':
            $("#calculatedDisplayArea").text("=" + value);
            break;
    }
}