// predefined array of animals for buttons
var buttonArray = ["Rabit", "Monkey", "Horse", "Lion", "Wolf", "Tiger", "Bird"];
// whenever this function is called it will take the input from the user and
//will create the button and will add it to the DOM 
function addButton(){
	// make button-panel and input empty first in order to avoid duplicates
	$("#button-panel").empty();
	$("#input-btn").val('');
	//this will go through array and create buttons for each item in the array
	for(var i=0; i<buttonArray.length; i++){
	var button = $("<button>");
	button.addClass("btn btn-default giphy-btn");
	//button.attr("id", "item-"+i);
	button.attr("name", buttonArray[i]);
	//style for the button
	button.css({"background-color": "#006666", "color": "#fff", "margin":"5px"});
	button.text(buttonArray[i]);
	$("#button-panel").append(button); //add to button panel
	}
}
//calling function to show buttons when the page loads
addButton();


// reads the value of input and push it to the array for adding button and calls the add Button Function
$("#add-button").on("click", function(){
	var inputVal = $("#input-btn").val().trim();
	if(inputVal){
		buttonArray.push(inputVal);
		addButton();
	}
});

var animate=[];
var static= [];
var staticIMG= [];
var animateIMG = [];
// display images
function display(name){	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+name+"&api_key=dc6zaTOxFJmzC&limit=10";
	//calling ajax to send a query to the API and GET the response
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){    //when data is fetched from the API do the following
		$('#image-display').empty();
		console.log(response);
		//go through response and display each image
		for(var i = 0; i< response.data.length; i++){
			var span = $("<span>");
			span.css({"float":"left", "margin": "10px"});
			var p = $("<p>");
			p.text("Rating: "+response.data[i].rating);
			span.append(p);
			var img = $("<img>");
			var status = img.attr("data-state", "still");
			img.addClass("img");
			img.attr("name", name);
			//saving each url in an array of animate and static for using in animating or stoping image
			static[i] = response.data[i].images.fixed_height_still.url;
			animate[i] = response.data[i].images.fixed_height.url;
			img.attr("src", static[i]);
			span.append(img);
			$("#image-display").append(span);
		}
	});
}
//when the user clicks on any of the button of animals it will take it and send the data to display()
$(document).on("click", ".giphy-btn", function(){
	var name = $(this).attr("name");
	console.log(name);
	display(name);
});

//when any image on the screen is clicked it will change from still to animate and vise versa
$(document).on("click", "img",function(){
	
	var name = $(this).attr("name");
	console.log(name);
	dataState = $(this).attr("data-state");
	console.log(dataState);
	//find the index of span to replace its static image with animated	
	var index1 = $('span').index($(this).parent());
	console.log("index is "+index1);
	//if state of img is still change it to animate, else change it to still
	if(dataState === "still"){
		console.log(static);
		$(this).attr("data-state", "animate");
		$(this).attr("src", animate[index1-1]);
		$('span').eq(index1).append($(this));

	}else{

		$(this).attr("data-state", "still");
		$(this).attr("src", static[index1-1]);
		$('span').eq(index1).append($(this));
	}

});
