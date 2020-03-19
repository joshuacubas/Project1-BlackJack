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

	player1Bank : 10,

	player1Bet : 0,

	player2Hand : [],

	player2HandWorth : 0,

	player2Bank: 10,

	player2Bet : 0,

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



// checkHandWorth: (whoseHand) => {

// 		let total = 0
		
// 		for(let i = 0; i < whoseHand.length; i++){
			
// 			total += whoseHand[i].value
// 		}

// 		if(total > 21){
			
// 			//if total was over 21 check for aces,change ace value to 1
// 			let total = 0
// 			console.log("at 1")
// 			for(let j = 0; j < whoseHand.length; j++){
				
// 				let curCardvalue = whoseHand[j].value
// 				console.log("at 2")
// 				if(curCardvalue === 11){
// 					//if current card value is  11/ace,  then change value to 1
// 					curCardvalue  = 1
// 					//then check the total again, if under 21 return total
// 					//otherwise keep checking for more aces
// 					let total = 0
// 					console.log("at 3")
// 					for(let k = 0; k < whoseHand.length; k++){
// 						total += whoseHand[k].value
// 						console.log("at 4")
// 					}
// 					console.log("total before is", total)
					
// 					if(total <= 21){
// 						console.log("at 5")
// 						console.log('nested Total', total)
// 						return total
// 					} 
// 				}
// 			}
// 		} 
		
// 		else{

// 			console.log("total", total)
// 			return total
// 		}

// 	},





