let theGame = {
    score: 0,
    currentComputerCard: {},
    playerHand: [],
    computerHand: [],
    computerDelay: 2500,
    playerDelay: 3000
};

let gameFunctions = {
    computerDrawsCard: function (allComputerCards, cardDrawnFunction) {
        setTimeout(function () {

            let theCard = allComputerCards.pop();

            cardDrawnFunction(theCard);

        }, Math.random()*theGame.computerDelay);
    },
    playerDrawsCard: function(allPlayerCards, playerDrawFunction) {
        setTimeout(function () {
            let playerCard = allPlayerCards.pop();
            playerDrawFunction(playerCard);
        }, Math.random()*theGame.playerDelay);
    },
    createDeck: function () {
        let cardValues = ["A", 2, 3, 4, 5, 6];
        let suitValues = ["H", "C"];

        let deck = [];

        cardValues.forEach(
            function (value) {

                for (var i = 0; i < suitValues.length; i++) {
                    let theSuit = suitValues[i];

                    let card = value + theSuit;

                    deck.push(card);
                }

            }
        );

        return deck;
    },
    deal: function(aDeck) {
        let playerCards = [];
        let computerCards = [];

        for (var i = 0; i < aDeck.length; i++) {
            if (i % 2 === 0) {
                playerCards.push(aDeck[i]);
            }
            else {
                computerCards.push(aDeck[i]);
            }
        }

        return {
            playerCards: playerCards,
            computerCards: computerCards
        };
    },
    scoreCards: function (card1, card2) {
        if (card1 === undefined || card2 === undefined) return 0;

        let value1 = card1.charAt(0);
        let suit1 = card1.charAt(1);

        let value2 = card2.charAt(0);
        let suit2 = card2.charAt(1);

        if (value1 === value2 || suit1 === suit2) return 1;
        else return -1;
    }
};


//set up the game...
let deck = gameFunctions.createDeck();
console.log(deck);

let dealtCards = gameFunctions.deal(deck);
console.log(dealtCards);

theGame.playerHand = dealtCards.playerCards;
theGame.computerHand = dealtCards.computerCards;

//prep for automated playing...
let computerCardCallback = function (theCard) {
    console.log('this is where the computer card shows up!!! ' + theCard);
    theGame.currentComputerCard = theCard;
    //draw a new card if we got a card...
    if(theCard !== undefined)
        gameFunctions.computerDrawsCard(
            dealtCards.computerCards, computerCardCallback
        );
};

let playerCardCallback = function (theCard) {
    console.log('this is where the player card shows up!!! ' + theCard);
    theGame.score += gameFunctions.scoreCards(theCard, theGame.currentComputerCard);
    console.log(theGame.score);
    if (theCard !== undefined)
        gameFunctions.playerDrawsCard(
            dealtCards.playerCards, playerCardCallback);
};

//start playing...
gameFunctions.computerDrawsCard(
    dealtCards.computerCards, computerCardCallback
    );

gameFunctions.playerDrawsCard(
    dealtCards.playerCards, playerCardCallback);
