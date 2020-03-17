console.log("Lets Play BlackJack!!")


//make a constructor for Cards
class Card {
	constructor(suit,numFace){
		this.suit = suit
		this.numFace = numFace
		this.name = `${numFace} of ${suit}`
	}
}


const game = {

	player1Hand : [],

	player1Bank : 10,

	player1Bet : 0,

	player2Hand : [],

	player2Bank: 10,

	player2Bet : 0,

	dealerHand : [],

	dealerBank : 20,

	betMultiplier : 2,

	deck : [],

	discardPile : [],

	generateDeck : () => {
		console.log('generating')
		
		let numFaces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
		let suits = ['CLUBS',"SPADES",'HEARTS','DIAMONDS']
		
		
		for(let i = 0; i < suits.length; i++){
			
			let curSuit = suits[i]
		
			for(j = 0; j < numFaces.length; j++){

				let curNumFace = numFaces[j]
				game.deck.push(new Card(curSuit,curNumFace))
			}
		}
	}, 

	start : ()=>{
		game.generateDeck()
		let dealToArray = [game.player1Hand,game.player1Hand,game.player2Hand,game.player2Hand,game.dealerHand]
		dealToArray.forEach(element => game.addRandomCardToHand(element))
		
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
		whoseHand.push(card)
	}, 



}


//Listeners below