//kommentarera


let variable = 'Hello!';

console.log('Hello?');


function CreateDeck() {
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
}

let deck = CreateDeck();
console.log(deck);

function Deal(theDeck) {
    let playerCards = [];
    let computerCards = [];

    for (var i = 0; i < theDeck.length; i++) {
        if (i % 2 === 0) {
            playerCards.push(theDeck[i]);
        }
        else {
            computerCards.push(theDeck[i]);
        }
    }

    return {
        playerCards: playerCards,
        computerCards: computerCards
    };
}

let dealtCards = Deal(deck);
console.log(dealtCards);


let theGame = {
    score: 0,
    currentComputerCard: undefined,
    ComputerDrawsCard: function (allComputerCards, cardDrawnFunction) {
        setTimeout(function () {

            let theCard = allComputerCards.pop();

            cardDrawnFunction(theCard);

        }, 1500);
    }
};

function PlayerDrawsCard(allPlayerCards, playerDrawFunction) {
    setTimeout(function () {
        let playerCard = allPlayerCards.pop();
        playerDrawFunction(playerCard);
    }, 2500);
}

theGame.ComputerDrawsCard(
    dealtCards.computerCards,
    function (theCard) {
        console.log('this is where the computer card shows up!!! ' + theCard);
        theGame.currentComputerCard = theCard;
    });

PlayerDrawsCard(
    dealtCards.playerCards,
    function (theCard) {
        console.log('this is where the player card shows up!!! ' + theCard);
        theGame.score += ScoreCards(theCard, gameState.currentComputerCard);
        console.log(gameState.score);
    });



function ScoreCards(card1, card2) {
    let value1 = card1.charAt(0);
    let suit1 = card1.charAt(1);

    let value2 = card2.charAt(0);
    let suit2 = card2.charAt(1);

    if (value1 === value2 || suit1 === suit2) return 1;
    else return -1;
}




/*
let thePlayerCard = PlayerDrawsCard(dealtCards.playerCards);


console.log(theComputerCard);
console.log(thePlayerCard);

console.log(dealtCards);



function ScoreCards(card1, card2) {
    let value1 = card1.charAt(0);
    let suit1 = card1.charAt(1);

    let value2 = card2.charAt(0);
    let suit2 = card2.charAt(1);

    if (value1 === value2 || suit1 === suit2) return 1;
    else return -1;
}

let score = 0;

for (var i = 0; i < 4; i++) {

    theComputerCard = ComputerDrawsCard(dealtCards.computerCards);
    thePlayerCard = PlayerDrawsCard(dealtCards.playerCards);

    let scoreDelta = ScoreCards(thePlayerCard, theComputerCard);

    score += scoreDelta;

    console.log(scoreDelta);
    console.log('Total Score ' + score);
}



*/