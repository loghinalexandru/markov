let model =  new Markov(3 , ".");

function addNewsTitles(domains){
	fetch("https://newsapi.org/v2/everything?pageSize=100&domains=" + domains + "&apiKey=37a072c5b2a94bbdac965b2f49a19ce8")
	.then(response => {
		return response.json()
	})
	.then(data => {
		for(let i = 0; i < data.articles.length; ++i){
			model.addToDictionary(data.articles[i].title);
		}
	});

}

window.onload = () =>{
	addNewsTitles("bbc.co.uk");
	addNewsTitles("wsj.com");
	addNewsTitles("nytimes.com");
	addNewsTitles("edition.cnn.com");
	addNewsTitles("foxnews.com");
	addNewsTitles("abcnews.go.com");
	addNewsTitles("aljazeera.com");
	addNewsTitles("ansa.it");
	addNewsTitles("arstechnica.com");
	setInterval(insertGeneratedText , 5000);
}

function insertGeneratedText(){
	let elem = document.getElementsByTagName("body")[0];
	elem.innerHTML += "<p>" + model.getText(10) + "</p>";
}


