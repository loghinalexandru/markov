let model =  new Markov(2);

function addNewsTitles(domains){
	fetch("https://newsapi.org/v2/everything?pageSize=100&domains=" + domains + "&apiKey=37a072c5b2a94bbdac965b2f49a19ce8")
	.then(response => {
		return response.json()
	})
	.then(data => {
		for(let i = 0; i < data.articles.length; ++i){
			model.addToDictionary(data.articles[i].content);
		}
	});

}

window.onload = () =>{
	addNewsTitles("bbc.co.uk");
	addNewsTitles("wsj.com");
	addNewsTitles("nytimes.com");
	addNewsTitles("edition.cnn.com");
	addNewsTitles("foxnews.com");
	setInterval(insertGeneratedText , 10000);
}

function insertGeneratedText(){
	let elem = document.getElementsByTagName("body")[0];
	elem.innerHTML = model.generateText(1000);
}


