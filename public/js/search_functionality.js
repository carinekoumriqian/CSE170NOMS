//responsible for a search bar that takes user input
'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("Javascript connected!");
	$('#searchform').submit(handleSearch);
	$('#foryou').click(handleForYou);
}

function handleForYou(e){
	e.preventDefault();
	var input = localStorage.getItem("diet")
	console.log(input)

	//get the json of all recipes
	var url = "/json/"
  	$.get(url, function(result) {
		//console.log(JSON.stringify(result));
  		var matches = getMatches(input, result);

  		//add any recipes that match the user's keyword
 		displayList(matches)

  	});

}

//change displayed recipes to match search results
function handleSearch(e) {
	e.preventDefault();
	var input = $('input#searchbox').val();
	//case insensitive
	input = input.toLowerCase();
	//console.log(input)

	//get the json of all recipes
	var url = "/json/"
  	$.get(url, function(result) {
		//console.log(JSON.stringify(result));
  		var matches = getMatches(input, result);

  		//add any recipes that match the user's keyword
 		displayList(matches)

  	});
}

//find recipes that match user's input. Input json to search thru.
function getMatches(input, json) {
	var recipes = json;
	var matches = [];
	var i;
	for(i = 0; i < recipes.length; i++) {
		var strName = JSON.stringify(recipes[i].name).toLowerCase();
		//check name and tags
		if(strName.includes(input) || recipes[i].tags.includes(input)){
			matches.push(recipes[i])
		}
	}
	return matches;
}

//display a given array of recipes matching category
function displayList(matches){
	 		if(matches.length == 0){
  			var html = "<div>Sorry, no matches found.</div>";
  			$("#available-recipes").html(html);
  		} else {
  			var i;
	  		//render matching results
	  		for(i = 0; i < matches.length; i++){
	  			//$("ul.ingredients").html("<li>"+matches[i].ingredient+"</li>");
	  			var match = matches[i];
	  			var html = '<div id='+match.id+' class="recipe-list">'+
					'<div class="recipe">'+
						'<a class="recipe-link" id='+match.id+'href="recipe/'+match.id+'">'+
						'<h3>'+match.name+'</h3>'+
						'<img src='+match.imageURL+' class="img-responsive">'+
						'<p>Difficulty: '+match.difficulty+'</p>'+
						'<p>Time: '+match.time+'</p> </a> <hr> </div> </div>'

				//first item needs to replace existing html
	  			if(i == 0) {
	  				$("#available-recipes").html(html);
	  			} else {
	  				$("#available-recipes").append(html);
	  			}
	  		}
  		}
}

/*
<div id={{id}} class="recipe-list">
				<div class="recipe">
					<a class="recipe-link" id={{id}} href="recipe/{{id}}">
					<h3>{{name}}</h3>
					<img src={{imageURL}} class="img-responsive">
					<p>Difficulty: {{difficulty}}</p>
					<p>Time: {{time}}</p>
					</a>
					<hr>
				</div>
			</div>
*/