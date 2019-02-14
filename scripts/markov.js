class Markov{
	constructor(order = 1 , terminator = "_$_"){
		this.order = order;
		this.entryWords = [];
		this.endWords = {};
		this.dictionary = {};
		this.terminator = terminator;
	}

	parsePhrase(phrase){
		let listOfWords = phrase.split(/([\W])/);
		for(let i = 0; i < listOfWords.length; ++i){
			if(listOfWords[i] === " " || listOfWords[i] === ""){
				listOfWords.splice(i , 1);
				--i;
			}
		}
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
	// TODO : Solve cycles in text generation
	generateText(length){
		if(length < this.order)
			throw "Length too small for order " + this.order;
		let currentWordSequence = randomItem(this.entryWords);
		let constructedText = currentWordSequence;
		let nextWord = "";
		let key = "";
		currentWordSequence = currentWordSequence.split(" ");
		for(let i = length - this.order; i >= 0; --i){
			key = currentWordSequence.join(" ");
			let wordTransition = maxFromDictionary(this.dictionary[key]);
			if(this.dictionary[key][wordTransition] === this.dictionary[minFromDictionary(this.dictionary[key])]) {
				nextWord = randomItem(Object.keys(this.dictionary[key]));
			}
			else{
				nextWord = wordTransition; 
			}
			if(nextWord !== this.terminator){
				if(nextWord.length  > 1)
					constructedText = constructedText + " " + nextWord;
				else
					constructedText = constructedText + nextWord;
				this.cycleWordSequence(currentWordSequence , nextWord);
			}
			else{
				break;
			}
		}
		return constructedText;
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
