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

	// TODO: Kat'z BackOff 
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
		// Creating entry for every gram up to n-gram where n is the markov order
		for(let i = this.order; i < words.length; ++i){
			for(let j = 0; j < this.order; ++j){
				key = currentWordSequence.slice(j).join(" ");
				if(!(key in this.dictionary))
					this.dictionary[key] = {};
				if(words[i] in this.dictionary[key])
					this.dictionary[key][words[i]] += 1;
				else
					this.dictionary[key][words[i]] = 1;
			}
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
	// Adding Kat'z BackOff to generator
	generateText(){
		let currentWordSequence = randomItem(this.entryWords);
		let constructedText = currentWordSequence;
		let nextWord = "";
		let key = currentWordSequence;
		currentWordSequence = currentWordSequence.split(" ");
		while(nextWord !== this.terminator){
			// BackOff strategy
			let diff = Object.keys(this.dictionary[key]).length - this.order;
			if(diff < 0 && currentWordSequence.length - 1 > 1){
				currentWordSequence = currentWordSequence.slice(Math.abs(diff));
			}
			//Construct n+1 gram if good-turing estimation is found
			key = currentWordSequence.join(" ");
			nextWord = randomItem(Object.keys(this.dictionary[key]));
			currentWordSequence.push(nextWord);
			constructedText = constructedText + " " + nextWord;
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
