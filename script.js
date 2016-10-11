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
    my_calculator.addItem(val);
}

function displayStuff(type, value, item){
    console.log("In Display stuff");
    if(type === "itemAdded"){
        $("#display").text(value);
    }else if(type === "calculated"){
        $("#display").text(value);
    }else if(type === "error"){
        $("#display").text(value);
    }else{
        debugger;
    }
}