
$(function () {

    let deckOfCards = {
        baseUrl: 'https://deckofcardsapi.com/api/deck/',
        newDeck: function () {
            return $.getJSON(this.baseUrl + 'new/shuffle/')
                .done(function (newDeck) {
                    deckOfCards.deckId = newDeck.deck_id;
                });
        },
        drawCard: function () {
            return $.getJSON(this.baseUrl + deckOfCards.deckId + '/draw/');
        }
    };


    let game = {
        /** @type {{playerCard:string, computerCard: string, paused: boolean, computerTimeoutHandle:number, timerIntervalHandle: number, elapsedMs:number, score: number, over: boolean }} */
        state: {
            paused: false
        },

        selectors: {},

        minDelay: 2000,
        timerDelay: 250,

        new: function (config) {
            game.state.elapsedMs = 0;
            game.state.playerCard = undefined;
            game.state.computerCard = undefined;
            game.state.score = 0;
            game.state.over = false;
            game.selectors.timerSelector = config.timerSelector;
            game.selectors.scoreSelector = config.scoreSelector;
            game.maxDelay = config.maxDelay < game.minDelay ? game.minDelay : config.maxDelay;

            game.updateScore();

            deckOfCards.newDeck().done(function () {
                game.startTimer();
                game.drawPlayerCard();
                game.drawComputerCard();
                game.startComputerDelay();
            });
        },

        startTimer: function () {
            game.killTimer();
            game.state.timerIntervalHandle = setInterval(function () {
                //this is only an approximate timer... :)
                game.state.elapsedMs += game.timerDelay;
                game.updateTimer();
            }, game.timerDelay);
        },

        updateTimer: function () {
            $(game.selectors.timerSelector).text(Math.floor(game.state.elapsedMs / 1000) + ' seconds');
        },

        killTimer: function () {
            if (game.state.timerIntervalHandle !== undefined) {
                clearTimeout(game.state.timerIntervalHandle);
                game.state.timerIntervalHandle = undefined;
            }
        },

        drawPlayerCard: function () {
            deckOfCards.drawCard().done(function (drawData) {
                if (drawData.success) {
                    game.state.playerCard = drawData.cards[0].code;
                    $('#player img.card').attr('src', drawData.cards[0].image);
                }
                else game.over();
            });
        },

        startComputerDelay: function () {
            game.state.computerTimeoutHandle = setTimeout(function () {
                game.drawComputerCard();
                game.startComputerDelay();
            }, game.minDelay + (Math.random() * (game.maxDelay - game.minDelay)));
        },

        drawComputerCard: function () {
            deckOfCards.drawCard().done(function (drawData) {
                if (drawData.success) {
                    game.state.computerCard = drawData.cards[0].code;
                    $('#computer img.card').attr('src', drawData.cards[0].image);
                }
                else game.over();
            });
        },

        killComputerDelay: function () {
            if (game.state.computerTimeoutHandle !== undefined) {
                clearTimeout(game.state.computerTimeoutHandle);
                game.state.computerTimeoutHandle = undefined;
            }
        },

        togglePause: function () {
            game.state.paused = !game.state.paused;
            if (game.state.paused) {
                game.killComputerDelay();
                game.killTimer();
            }
            else {
                game.doComputerDelay();
            }
        },

        usePlayerCard: function () {
            if (!game.state.over && game.state.playerCard !== undefined) {
                game.killComputerDelay();
                game.scoreCards();
                game.drawComputerCard();
                game.startComputerDelay();
                game.drawPlayerCard();
            }
        },

        scoreCards: function () {
            let points = -1;
            if (game.state.playerCard !== undefined &&
                game.state.computerCard !== undefined) {
                if (game.state.playerCard.charAt(0) === game.state.computerCard.charAt(0)
                    ||
                    game.state.playerCard.charAt(1) === game.state.computerCard.charAt(1)) {
                    points = 1;
                }
            }
            game.state.score += points;
            this.updateScore();
        },

        updateScore: function () {
            $(game.selectors.scoreSelector).text(game.state.score);
        },

        over: function () {
            if (!game.state.over) {
                game.state.over = true;
                game.killComputerDelay();
                game.killTimer();
                alert('Game Over! Your score: ' + game.state.score + ' points in ' + Math.floor(game.state.elapsedMs / 1000) + ' seconds');
            }
        }
    };


    $('#newGame').click(function () {
        game.new({
            maxDelay: 2500,
            scoreSelector: '#score',
            timerSelector: '#timer'
        });
    });

    $('#pauseGame').click(function () {
        game.togglePause();
    });

    $('#player').click(function () {
        game.usePlayerCard();
    });
});
