// console.log("Lets Play BlackJack!!")

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

	player1Bank : 100,

	player1Bet : 1,

	player1Wage : document.querySelector("#player1WageForm"),

	player2Hand : [],

	player2HandWorth : 0,

	player2Bank: 100,

	player2Bet : 1,

	player2Wage : document.querySelector("#player2WageForm"),

	dealerHand : [],

	player1HandWorth : 0,

	dealerBank : 200,

	betMultiplier : 2,

	deck : [],

	player1HandDivLoc : document.querySelector('#player1Cards'),

	player2HandDivLoc : document.querySelector('#player2Cards'),

	dealerHandDivLoc : document.querySelector('#dealerCards'),

	player1HitButton : document.querySelector("#hit1"),
	
	player1StayButton : document.querySelector("#stay1"),

	player2HitButton : document.querySelector("#hit2"),

	player2StayButton : document.querySelector("#stay2"),

	player1Message : document.querySelector("#p1Message"),

	player2Message : document.querySelector("#p2Message"),

	nextRoundButton : document.querySelector('#nextRoundButton'),

	player2ChipsLeft :document.querySelector("#player2ChipsLeft"),

	player1ChipsLeft :document.querySelector("#player1ChipsLeft"),

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
		let dealToArray = [[game.player2Hand,game.player2HandDivLoc],[game.player1Hand,game.player1HandDivLoc],[game.dealerHand,game.dealerHandDivLoc]]
		dealToArray.forEach(element => {
			game.addRandomCardToHand(element[0],element[1])
			game.addRandomCardToHand(element[0],element[1])
		})
	
		game.player2Turn()
		
	},

	hideP1HitStayBttns : () => {
		game.player1HitButton.style.visibility ='hidden'
		game.player1StayButton.style.visibility ='hidden'		
	}, 

	showP1HitStayBttns : () => {
		game.player1HitButton.style.visibility ='visible'
		game.player1StayButton.style.visibility ='visible'		
	},

	hideP2HitStayBttns : () => {
		game.player2HitButton.style.visibility ='hidden'
		game.player2StayButton.style.visibility ='hidden'		
	}, 

	showP2HitStayBttns : () => {
		game.player2HitButton.style.visibility ='visible'
		game.player2StayButton.style.visibility ='visible'		
	},	

	player2Turn : () => {

		game.hideP1HitStayBttns()
		game.showP2HitStayBttns()
	},

	player1Turn : () => {

		game.hideP2HitStayBttns()

		game.showP1HitStayBttns()
	}, 

	dealerTurn: () => {

		game.hideP1HitStayBttns()

		game.dealerChoice()

		game.endRound()
	}, 

	dealerChoice : () => {

		let dealerHandTotal = game.checkHandWorth(game.dealerHand)

		if(dealerHandTotal >= 17){
			
			let randomNum = Math.floor( Math.random()*10 )
			if(randomNum === 6){
				game.addRandomCardToHand(game.dealerHand,game.dealerHandDivLoc)
			} 
		}

		if(dealerHandTotal > 12 && dealerHandTotal < 17){
			let randomNum = Math.floor( Math.random()*100 )
			if(randomNum %3 === 0 ){
				game.addRandomCardToHand(game.dealerHand,game.dealerHandDivLoc)
			} 
			// game.addRandomCardToHand(game.dealerHand,game.dealerHandDivLoc)
			game.dealerChoice()
		}

		if(dealerHandTotal <= 12){
			game.addRandomCardToHand(game.dealerHand,game.dealerHandDivLoc)
			game.dealerChoice()
		}
	},

	endRound : () => {

		game.compareHands(game.player1ChipsLeft,game.player1Message,game.checkHandWorth(game.player1Hand),game.checkHandWorth(game.dealerHand),game.player1Bet,game.player1Bank)
		
		console.log("p1BankAFTER",game.player1Bank)
		console.log('dealerBankAFTER', game.dealerBank)

		game.compareHands(game.player2ChipsLeft,game.player2Message,game.checkHandWorth(game.player2Hand),game.checkHandWorth(game.dealerHand),game.player2Bet,game.player2Bank)
		
		console.log("p2BankAFTER",game.player2Bank)
		console.log('dealerBankAFTER', game.dealerBank)



	}, 

	startNextRound : () => {

		game.player1Bet = 1
		game.player2Bet = 1

		game.removeChildren()

		game.removePlayerMsgs()

		game.player1Hand = []
		game.player2Hand = []
		game.dealerHand = []
		game.start()


	}, 

	removeChildren : () => {
		
		let arr = [game.player1HandDivLoc,game.player2HandDivLoc,game.dealerHandDivLoc]
		arr.forEach( (element)=>{
			while (element.firstChild) {
	    		element.removeChild(element.lastChild);
	  		}
		} )  	
	}, 

	removePlayerMsgs : () => {

		let arr = [game.player1Message,game.player2Message]
		arr.forEach( (element)=>{
			element.innerHTML = ''
		} )  	
	}, 

	compareHands : (playerChipsLeftOnDiv,playerMsg,playersHand,dealerHand,playersBet,playersBank) => {

		console.log('bet ratio',game.betMultiplier)
		console.log('psBet',playersBet)
		console.log('psBank',playersBank)

		let gambledAmount = game.betMultiplier * playersBet 
		
		if( (playersHand < 22) && (dealerHand > 21) ) {
			playerMsg.innerHTML = playerMsg.innerHTML + ` Your hand Wins.`
			playersBank += (game.betMultiplier*playersBet)
			game.dealerBank -= gambledAmount
			console.log("0","gamble:",gambledAmount,playersBank)
			console.log("0","gamble:",gambledAmount,"db",game.dealerBank)
		} 

		else if( (playersHand > dealerHand) && (playersHand < 22) ){
			
			playerMsg.innerHTML = playerMsg.innerHTML + ` Your hand Wins.`
			playersBank += gambledAmount
			game.dealerBank -= gambledAmount
			console.log("1","gamble:",gambledAmount,playersBank)
			console.log("1","gamble:",gambledAmount,"db",game.dealerBank)
		}

		else if( playersHand === dealerHand){
			playerMsg.innerHTML = playerMsg.innerHTML +  ' Both hands tied.'
			console.log("2", "gamble:",gambledAmount,playersBank)
			console.log("2","gamble:",gambledAmount,"db",game.dealerBank)
		}

		else if(playersHand > 21 && dealerHand > 21){
			playerMsg.innerHTML = playerMsg.innerHTML +  ' Both hands tied.'
			console.log("3","gamble:",gambledAmount,playersBank)
			console.log("3","gamble:",gambledAmount,"db",game.dealerBank)
		}
		else {
			playerMsg.innerHTML += ` Dealer's hand Wins.`
			playersBank = playersBank - gambledAmount
			game.dealerBank += gambledAmount
			console.log("4","gamble:",gambledAmount,"db",game.dealerBank)
			console.log("4","gamble:",gambledAmount,playersBank)
			console.log("4","gamble:",gambledAmount,"p1b",game.player1Bank)
			console.log("4","gamble:",gambledAmount,"p2B",game.player2Bank)

		}
		
	}, 

	createDivCard : (obj,whereToGo) => {
		const card = document.createElement('div')
		card.classList.add('cards')
		card.style.width = '125px'
		card.style.height = '175px'
		card.style.backgroundColor = 'white'
		card.style.border = 'solid black 1px'
		

		card.style.backgroundImage = `url(pics/${obj.suit.toLowerCase()}.png)`
		card.style.backgroundSize = '115px'
		card.style.backgroundRepeat = 'no-repeat';
		card.style.position = 'relative'
  		card.style.backgroundPosition = 'center';
		
		const cardNameTopLeft = document.createElement('p')
		cardNameTopLeft.innerHTML = `${obj.numFace}`
		cardNameTopLeft.style.backgroundColor = 'none'
		cardNameTopLeft.style.position = 'absolute'
		cardNameTopLeft.style.top = '-10%'
		cardNameTopLeft.style.left = '5%'
		cardNameTopLeft.style.fontSize = '150%'
		card.appendChild(cardNameTopLeft)
		
		const cardNameBottomRight = document.createElement('p')
		cardNameBottomRight.innerHTML = `${obj.numFace}`
		cardNameBottomRight.style.backgroundColor = 'none'
		cardNameBottomRight.style.position = 'absolute'
		cardNameBottomRight.style.bottom = '-10%'
		cardNameBottomRight.style.right = '5%'
		cardNameBottomRight.style.fontSize = '150%'
		card.appendChild(cardNameBottomRight)

		whereToGo.appendChild(card)


	},  

	randomCardIdx : () => {
		let randomIndex = Math.floor( Math.random()*game.deck.length );
		let randomCard = game.deck[randomIndex]

		return randomIndex
	}, 

	addRandomCardToHand : (whoseHand,whoseDiv) => {
		
		if(game.checkHandWorth(whoseHand) < 21){
		
			let index = game.randomCardIdx()
			let card = game.deck.splice(index,1)
			whoseHand.push(card[0])

			
			let lastCardInHandArr = whoseHand[whoseHand.length-1]
			game.createDivCard(lastCardInHandArr,whoseDiv)

		}
		
		if(game.checkHandWorth(whoseHand) > 21){
			
			if(whoseDiv.id === "player2Cards"){
				
				game.player2Message.innerHTML = "* * Bust, over 21!"
				game.player1Turn()
			}

			if(whoseDiv.id === "player1Cards"){
			
				game.player1Message.innerHTML = "* * Bust, over 21!"
				game.dealerTurn()
			}
		}


		game.checkHandWorth(whoseHand) 
	}, 

	checkHandWorth: (whoseHand) => {

		let total = 0

		let indicesOfAces = []
		
		for(let i = 0; i < whoseHand.length; i++){
	
			let curCardValue = whoseHand[i].value

			total += curCardValue

			if(curCardValue === 11){
				
				let index = i
				indicesOfAces.push(i)
			}
		}

		if(total < 22){
			
			return total
		}

		if(indicesOfAces.length > 0){
			
			whoseHand[indicesOfAces[0]].value = 1
			
			return game.checkHandWorth(whoseHand)
		}

		return total

	},



}

game.start()


//Listeners below


game.player1HitButton.addEventListener('click', (event) => {

	game.addRandomCardToHand(game.player1Hand,game.player1HandDivLoc)
}) 

game.player2HitButton.addEventListener('click', (event) => {
	
	game.addRandomCardToHand(game.player2Hand,game.player2HandDivLoc)
})

game.player1StayButton.addEventListener('click', (event) => {

	game.dealerTurn()
})

game.player2StayButton.addEventListener('click', (event) => {
	
	game.player1Turn()
})


game.player1Wage.addEventListener('submit', (event) => {
	
	event.preventDefault();
	
	const betInput = document.querySelector("#player1Wage")
	
	game.player1Bet = Number(betInput.value);
} )

game.player2Wage.addEventListener('submit', (event) => {
	
	event.preventDefault();
	
	const betInput = document.querySelector("#player2Wage")
	
	game.player2Bet = Number(betInput.value);
} )

game.nextRoundButton.addEventListener('click', (event) => {

	game.startNextRound()
} )



