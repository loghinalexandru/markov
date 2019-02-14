class Markov{
	constructor(order = 1){
		this.order = order;
		this.entryWords = new Set();
		this.endWords = {};
		this.dictionary = {};
	}

	parsePhrase(phrase){
		let listOfWords = phrase.split(/([\W])/);
		for(let i = 0; i < listOfWords.length; ++i){
			if(listOfWords[i] === " " || listOfWords[i] === ""){
				listOfWords.splice(i , 1);
				--i;
			}
		}
		return listOfWords;
	}

	setDictionary(listOfText){
		for(let i = 0; i < listOfText.length; ++i){
			parsePhrase(listOfText[i]);
		}
	}

	addToDictionary(string){
		let words = this.parsePhrase(string);
		let currentWordSequence= "";
		let key = "";
		if(words.length > this.order){
			currentWordSequence = words.slice(0,this.order);
			key = currentWordSequence.join(" ");
			this.entryWords.add(key);
		}
		else{
			throw "Too small phrase for order " + this.order;
			return;
		}
		for(let i = this.order; i < words.length; ++i){
			key = currentWordSequence.join(" ");

			if(!(key in this.dictionary))
				this.dictionary[key] = {};
			if(words[i] in this.dictionary[key])
				this.dictionary[key][words[i]] += 1;
			else
				this.dictionary[key][words[i]] = 1;

			// Move entry one word further
			currentWordSequence.push(words[i]);
			currentWordSequence.splice(0 , 1);

		}
		console.log(words , this.dictionary);
	}

	generateText(length){
		if(length < this.order)
			throw "Length too small for order " + this.order;
		let currentWordSequence = randomItem(this.entryWords).split(" ");
		let key = currentWordSequence.join(" ");
		for(let i = length - this.order; i >= 0; --i){

		}
	}

}


function randomItem(list){
	return list[Math.floor(Math.random * list.length)];
}
