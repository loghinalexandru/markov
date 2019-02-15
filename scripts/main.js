let model =  new Markov(3, "." , 0.3);

function addNewsTitles(domains){
	fetch("https://newsapi.org/v2/everything?q=apple&domains=" + domains + "&pageSize=100&apiKey=37a072c5b2a94bbdac965b2f49a19ce8")
	.then(response => {
		return response.json()
	})
	.then(data => {
		for(let i = 0; i < data.articles.length; ++i){
			model.addToDictionary(data.articles[i].title);
		}
	});

}

/*
window.onload = () =>{
	addNewsTitles("bbc.co.uk");
	addNewsTitles("wsj.com");
	addNewsTitles("nytimes.com");
	addNewsTitles("edition.cnn.com");
	addNewsTitles("foxnews.com");
	addNewsTitles("abcnews.go.com");
	addNewsTitles("aljazeera.com");
	addNewsTitles("arstechnica.com");
	setInterval(insertGeneratedText , 5000);
}
*/
function readFromFile(){
	var file = document.getElementById("input").files[0];
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = (e) =>{
		let text = e.target.result;
		text = text.split("\n");
		for(let i = 0; i < text.length - 1; ++i){
			model.addToDictionary(text[i]);
		}
		setInterval(insertGeneratedText , 3000);
	} 
}

function insertGeneratedText(){
	let elem = document.getElementsByTagName("body")[0];
	elem.innerHTML += "<p>" + model.getText(1) + "</p>";
}


