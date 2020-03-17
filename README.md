# BlackJack 
#
#
#
#### Project 1
#
#### Creator : Joshua Cubas
#### Type: Javascript Game
#
#
[Imgur](https://i.imgur.com/igNdJ4a.jpg)
# Basic Idea

  - The main Objective is to get your cards total score to equal or be as close to 21 as possible.
  - There will be two human players and the computer shall be the card dealer.
  - Two cards will be randomly dealt to each player, including the dealer, from a 52 card deck. 
  - Human players will be given the choice to place bets and will be allowed to 'hit' or 'stand'. The dealer's turn to play cards will start once the human players have finished playing their turns and ended their hands.



### Cards

 - There will be 52 cards in the deck
 - each card will be given one of the following four suits; hearts, clubs, diamonds, or spades.
 - The cards will also have a number (2-9) or an Ace , Jack , Queen , or King value. 
 - Jack, Queen, and King all are worth ten
 - An Ace can be worth 1 'or' 11,  which ever is more in the players favor of winning.

### Winning

- BlackJacks are an automatic win. To have a BlackJack, th eplayer must initially be dealt an ace and any 10-point card. Unless the dealer also has a BlackJack, the player automatically wins.
- Having the closest cards to sum up to 21, wins

### Draw

- If no hand is higher than another or all hands respectively total over 21, there is no winner.

### Losing

- If a hand's total score is worth over 21, you automatically lose
- if another hand is worth more
#
#
# Gameplay
#
1. The games starts by randomizing 52 cards in a deck.
2. User(s) is prompted with a choice of having one or two players. This allows for one or two users to play against the dealer(computer).
3. Each player start off with ten tokens, and chooses to places their bets.
4. Each player is dealt two cards face up, dealer is dealt one card face up one card face down.
5. Player one chooses "stand" and end turn, "hit" and accept another card and repeat card choice, "double down" and place an additional bet up to the value of the first bet and end turn.
6. Player ones total hand score is added up and displayed after each card choice. If score ever goes over 21, player One loses and the player 2 if playing , or if not, dealer plays next
7. If player 2 is playing, player 2 has the same route to play through.
8. Dealer's turn begins. Dealers second card is revealed. if dealers hand is under 12, dealer draws an additional card, if dealers hand is between 12 and 17 Dealer will randomly choose to "hit" or "stand". If dealers hand is worth 18 or higher, dealer will choose to "stand". The dealers choice will cycle until breaking over 21 or having chosen to "stand"
9. If either player player has a BlackJack, and the dealer does not, player(s) beat the dealer and win.
10. Winning bets are doubled and added to winners banks, and deducted from losers banks
11. When player/dealer runs out of tokens to bet, the game is over and no more hands can be played.
#
#
# Coding

- A card class will be made. With properties of faceup(boolean), worth [number,number], suit (string), face (String),
- the main game will be contained in the 'game' object
- listeners will be placed at the bottom below the "game" object
- game will have a current total hand card score key-value pair for each player and dealer 
- game will have a deckOfCards property with an array of 52 objects representing cards
- game will have a discardPile array property
- game will have a player1Hand and player2Hand properties each with an empty array value to start
- game will have a player1Bank, player2Bank, and dealerBank properties, each starting off equal to 10,10,20
- game will have a betting method to give players choices to bet
- game will have a function to dsiplay cards in play
- game will have a function to display currentBets
- game will have a function to display everyones money left to bet
- game will have a function to add up each hands worth. if an ace is in the hand total will be the maximum worth under 22, 
- when dealers turn ends, a comparsion function is called to compare each players hand to the dealers hand, bets/earnings are calculated with winning results and distributed accordingly
- game will have a func to display after players and dealer have played their hands. winning results and new bank amounts will be shown to users
- game will have a function to return cards from the discarPile back to the deckOfCards 
- game will call a call back function to start a new round.




