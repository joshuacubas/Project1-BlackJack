console.log("Lets Play BlackJack!!")


//make a constructor for Cards
class Card {
	constructor(suit,numFace,value){
		this.suit = suit
		this.numFace = numFace
		this.name = `${numFace} of ${suit}`
		this.value = value
	}
}


const game = {

	player1Hand : [],

	player1HandWorth : 0,

	player1Bank : 9,

	player1Bet : 1,

	player2Hand : [],

	player2HandWorth : 0,

	player2Bank: 9,

	player2Bet : 1,

	dealerHand : [],

	player1HandWorth : 0,

	dealerBank : 20,

	betMultiplier : 2,

	deck : [],

	discardPile : [],

	generateDeck : () => {
		
		let numFaces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
		let suits = ['CLUBS',"SPADES",'HEARTS','DIAMONDS']
		let values = [2,3,4,5,6,7,8,9,10,10,10,10,11]
		
		
		for(let i = 0; i < suits.length; i++){
			
			let curSuit = suits[i]
		
			for(j = 0; j < numFaces.length; j++){

				let curNumFace = numFaces[j]
				let curValue = values[j]
				game.deck.push(new Card(curSuit,curNumFace,curValue))
			}
		}
	}, 

	start : ()=>{
		game.deck = []
		game.generateDeck()
		let dealToArray = [game.player2Hand,game.player2Hand,game.player1Hand,game.player1Hand,game.dealerHand,game.dealerHand]
		dealToArray.forEach(element => game.addRandomCardToHand(element))
		//make cards visible player 2 to 1 to dealer, if time hand motion or card motion

		//player 2 turn
		game.player2Turn()
		//player 1 turn
		game.player1Turn()
		//dealer turn
		game.dealerTurn()
		//compare evaluate

			//if blackjack occurs player wins 

		
	},

	player2Turn : () => {
	//show div buttons to make choices

	},


	player1Turn : () => {
	//show div buttons to make choices
	}, 

	dealerTurn : () => {

		let dealerHandTotal = game.checkHandWorth(game.dealerHand)

		//make the dealer add cards to it's own hand
		if(dealerHandTotal < 12){
			game.addRandomCardToHand(game.dealerHand)
		}

		if(dealerHandTotal > 12 && dealerHandTotal < 17){
			game.addRandomCardToHand(game.dealerHand)
		}

		if(dealerHandTotal > 17){
			// ********************************************** stay****
		}


		game.compareHands(game.checkHandWorth(game.player1Hand),game.checkHandWorth(game.dealerHand))
		game.compareHands(game.checkHandWorth(game.player2Hand),game.checkHandWorth(game.dealerHand))
	},

	compareHands : (playersH,dealerH) => {

		//function to check if playersH is 1 || 2
		//call func when player wins

		if( (playersH > 21) && (dealerH < 22) ) {
			console.log("dealer wins")
		}

		if( (playersH < 22) && (dealerH > 21) ) {
			console.log("player wins")
		}

		if(playersH > dealerH){
			if(playerH < 22){
				console.log("player wins")
			}
		}

		if(playersH < dealerH){
			if(dealerH < 22){
				console.log("dealer wins")
			}
		}





	}, 

	placeBets : () => {},

	randomCardIdx : () => {
		let randomIndex = Math.floor( Math.random()*game.deck.length );
		let randomCard = game.deck[randomIndex]

		return randomIndex
	}, 

	addRandomCardToHand : (whoseHand) => {

		let index = game.randomCardIdx()
		let card = game.deck.splice(index,1)
		whoseHand.push(card[0])
		//check hand total
		game.checkHandWorth(whoseHand) 
	}, 

	checkHandWorth: (whoseHand) => {

		let total = 0

		let indicesOfAces = []
		
		for(let i = 0; i < whoseHand.length; i++){
	
			let curCardValue = whoseHand[i].value

			total += curCardValue

			if(curCardValue === 11){
				//find aces/cards with value of 11
				let index = i
				console.log("index", index)
				indicesOfAces.push(i)
				console.log("index added",i) //confirmed
				console.log("index of aces array",indicesOfAces) // arr is empty **NEED TO FIX**
				// above is not confirmed working so far
			}
		}

		if(total < 22){
			console.log("worth was under 22")
			return total
		}

		if(indicesOfAces.length > 0){
			//change the first ace value to 1
			whoseHand[indicesOfAces[0]].value = 1
			//call back this function, now that an ace value has been changed
			return game.checkHandWorth(whoseHand)
		}

		console.log("returned total should be over 21, check to see if ace values are 1")
		return total

	},



}

game.start()


//Listeners below
const player1HitButton = document.querySelector("#hit1")
const player1StayButton = document.querySelector("#stay1")
const player2HitButton = document.querySelector("#hit2")
const player2StayButton = document.querySelector("#stay2")


//for each below, if buttons are set to visible, its their turn to go, so allow it
//can make more dry and use one listener for button class
player1HitButton.addEventListener('click', (event) => {
	//add card to player1Hand
	// addRandomCardToHand(game.player1Hand)

	game.addRandomCardToHand(game.player1Hand)
}) 

player2HitButton.addEventListener('click', (event) => {

	//add card to player2Hand
	// addRandomCardToHand(game.player2Hand)

	game.addRandomCardToHand(game.player2Hand)
})

player1StayButton.addEventListener('click', (event) => {
	//end player1 turn

	game.dealerTurn()
})

player2StayButton.addEventListener('click', (event) => {
	//end player2 turn

	//hide player 2 buttons / message box etc

	game.player1Turn()
})







