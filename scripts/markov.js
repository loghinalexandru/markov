class Markov{
	constructor(order = 1 , terminator = "_$_"){
		this.order = order;
		this.entryWords = [];
		this.dictionary = {};
		this.terminator = terminator;
	}

	parsePhrase(phrase){
		let listOfWords = phrase.split(" ");
		// Insert terminator for end of phrase
		listOfWords.push(this.terminator);
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
			if(!this.entryWords.includes(key))
				this.entryWords.push(key);
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
			this.cycleWordSequence(currentWordSequence , words[i]);

		}
	}

	cycleWordSequence(list , word){
		list.push(word);
		list.splice(0 , 1);
	}
	// TODO : Rewrite code cleaner in generateText()
	// Add a gamma factor for how random the next word should be
	generateText(){
		let currentWordSequence = randomItem(this.entryWords);
		let constructedText = currentWordSequence;
		let nextWord = "";
		let key = "";
		currentWordSequence = currentWordSequence.split(" ");
		while(nextWord !== this.terminator){
			key = currentWordSequence.join(" ");
			nextWord = randomItem(Object.keys(this.dictionary[key]));
			constructedText = constructedText + " " + nextWord;
			this.cycleWordSequence(currentWordSequence , nextWord);
		}
		return constructedText;
	}

	getText(minLenght = 1){
		let output = "";
		while(minLenght > 0){
			let phrase = this.generateText();
			output += phrase;
			minLenght -= phrase.split(" ").length;
		}
		return output;
	}
}

function randomItem(list){
	return list[Math.floor(Math.random() * list.length)];
}

function maxFromDictionary(dict){
	let maxValueKey = -1;
	let max = 0;
	for(let key in dict){
		if(dict[key] > max){
			max = dict[key];
			maxValueKey = key;
		}
	}
	return maxValueKey;
}

function minFromDictionary(dict){
	let minValueKey = -1;
	let min = Number.MAX_SAFE_INTEGER;
	for(let key in dict){
		if(dict[key] < min){
			min = dict[key];
			minValueKey = key;
		}
	}
	return minValueKey;
}
