
var buttonArray = ["Rabit", "Monkey", "Horse", "Lion", "Wolf", "Tiger", "Bird"];

function addButton(){
	$("#button-panel").empty();
	$("#input-btn").val('');
	for(var i=0; i<buttonArray.length; i++){
	var button = $("<button>");
	button.addClass("btn btn-default giphy-btn");
	button.attr("id", "item-"+i);
	button.attr("name", buttonArray[i]);
	button.css({"background-color": "#006666", "color": "#fff", "margin":"5px"});
	button.text(buttonArray[i]);
	$("#button-panel").append(button);
	}
}
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
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		$('#image-display').empty();
		console.log(response);
		for(var i = 0; i< response.data.length; i++){
			var span = $("<span>");
			span.css({"float":"left", "margin": "10px"});
			// span.attr('id', 'item-'+i)
			var p = $("<p>");
			p.text("Rating: "+response.data[i].rating);
			span.append(p);
			var img = $("<img>");
			var status = img.attr("data-state", "still");
			img.addClass("img");
			img.attr("name", name)
			static[i] = response.data[i].images.fixed_height_still.url;
			animate[i] = response.data[i].images.fixed_height.url;
			// staticIMG[i] = img.attr('id', 'item-'+i);
			// console.log(staticIMG[i]);
			// animateIMG[i] = img.attr('id', 'item-'+i);
			img.attr("src", static[i]);
			span.append(img);
			$("#image-display").append(span);
			
			
		}
	});
}
$(document).on("click", ".giphy-btn", function(){
	var name = $(this).attr("name");
	console.log(name);
	display(name);
});


$(document).on("click", "img",function(){
	
	var name = $(this).attr("name");
	console.log(name);
	dataState = $(this).attr("data-state");
	console.log(dataState);
	// var idIMG = $(this).attr('id');
	
	var index1 = $('span').index($(this).parent());
	console.log("index is "+index1);
	
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
