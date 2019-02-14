let model =  new Markov(1);

function getNewsTitles(){
	fetch("https://newsapi.org/v2/everything?pageSize=1&domains=bbc.co.uk&apiKey=37a072c5b2a94bbdac965b2f49a19ce8")
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
	getNewsTitles()
}
