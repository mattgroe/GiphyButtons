$( document ).ready(function(){

var gif = $('#gif');
var theme = "rick+and+morty+";
var search = '';
var newtemp = '';
var oldtemp = '';


//when the user presses enter within the input box
$(document).on("keyup", "#gif", function (e) {
    if (e.keyCode == 13) {
        buttonAdder(gif.val());
        $('#gif').val('');
    }
});

//when the user clicks the search button
$(document).on("click", "#Search", function (){
    	buttonAdder(gif.val());
    	$('#gif').val('');
});

//when a specific button is clicked
$(document).on('click', '.searches', function() {
		giphySearch($(this).data('search'));
		temp = $(this);
		temp.css('background-color', '#76c325');
		temp.css('border', '#76c325');
		temp.css('color', '#26ebe4');
})

//on click function to pause and play gifs
$(document).on('click', '.smallGif', function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
});

//removes unspecified characters from the string when adding as a button
function removeChars(input){
	//saves input to search variable for api use
	search = input.toLowerCase();
	search = search.replace(" ", "+");
}

//button adder
function buttonAdder(input){
	console.log(input);
	//removes unspecified characters from the string
	removeChars(input);
	var btn = $("<button>");
	btn.addClass("searches");
	btn.attr("data-search", search);
	btn.text(input);
	$('#buttonSection').append(btn);
}

function giphySearch(search){
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5mVbVlAQRUwBA6vlQfQatVZE2uxYVf1u&rating=g&q=" + theme + search;
	console.log(queryURL);
	//hits the giphy api and returns its findings
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		//returns an array of the gifs available and the number of gifs in the array
		console.log(response.data, response.pagination.count);
		populateGifs(response.data, response.pagination.count);
	})
}

//populates gifs in the column
function populateGifs(arr, n){
	//empties gif populated col
	$('#popGifs').empty();
	//loop throught arr using n to append gifs in html col
	for(var i = 0; i < n; i++){
		var row = $("#popGifs");
		var img = $("<img>");
		img.addClass("smallGif");
		img.attr("src", arr[i].images.fixed_height_still.url);
		img.attr("title", arr[i].title);
		img.attr("gif", arr[i].images.original.url);
		row.append(img);
	}
}


});



