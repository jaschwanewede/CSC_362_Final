/**
 * Load data from JSON file asynchronously and render force directed graph
 */
d3.json('data/ssbu_with_neighbor_counts.json').then(data => {
    const forceDirectedGraph = new ForceDirectedGraph({ parentElement: '#force-directed-graph'}, data);
  
  
  //working on dropdown filtering

  //code taken from Lab 2

  dataFiltering(data);
  
  })
  .catch(error => console.error(error));



function dataFiltering(data) {
	var games = data;

	/* **************************************************
	 *
	 * ADD YOUR CODE HERE (ARRAY/DATA MANIPULATION)
	 *
	 * CALL THE FOLLOWING FUNCTION TO RENDER THE BAR-CHART:
	 *
	 * renderBarChart(data)
	 *
	 * - 'data' must be an array of JSON objects
	 * - the max. length of 'data' is 5
	 *
	 * **************************************************/


	
  
	var currentArray = dataManipulation(); //returns current selected box value

  var currentAttr = currentArray[0];
  var currentSort = currentArray[1];


  if (currentSort === "ascend") {
    games.sort( function(a, b){
		
    if(currentAttr === "copies")
		  return games.size.ascending; 
  	
    else if (currentAttr === "crossover") {
      return games.neighborCount.ascending;

    }

    else if (currentAttr === "alphabetical") {

      return games.id.ascending;
    }
  });

  } else if (currentSort === "descend") {
    
    if(currentAttr === "copies")
		  return games.size.descending; 
  	
    else if (currentAttr === "crossover") {
      return games.neighborCount.descending;

    }

    else if (currentAttr === "alphabetical") {

      return games.id.descending;
    }

  }
  //we want to sort
  

  //not filtering, but can use framework
	/** 
  var top5;
	if (currentSelected != "all") {
		top5 = attractions.filter( function(attraction, i) {
			console.log("Filtered by category");
			return (attraction.Category == currentSelected);
			 }); 

		top5 = top5.filter( function(index, i) {
				console.log("Filtered to top5");
				return (i < 5);
				 }); 
	
	} else {
		
		top5 = attractions.filter( function(index, i) {
		console.log("Filtered");
		return (i < 5);
		 });
	
	}
	renderBarChart(top5);
	console.log("rendered");
  */
}

function dataManipulation() {
	var attribute = document.getElementById("attr");
	var selectedAttr = attribute.options[attribute.selectedIndex].value;

  var sorting = document.getElementById("sort");
  var selectedSort = sorting.options[attribute.selectedIndex].value;

	console.log(selectedAttr, selectedSort)

	return [selectedAttr, selectedSort];
}