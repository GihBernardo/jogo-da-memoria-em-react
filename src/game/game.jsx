let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    characters: [
        "cyborgBall_1",
        "cyborgBall_2",
        "cyborgBall_3",
        "cyborgBall_4",
        "magicStar_1",
        "magicStar_2",
        "magicStar_3",
        "magicStar_4",
        "squareGeneral_1",
        "squareGeneral_2",
        "squareGeneral_3",
        "squareGeneral_4",
        "sniperTriangle_1",
        "sniperTriangle_2",
        "sniperTriangle_3",
        "sniperTriangle_4",
    ],

    cards: null,

    setCard: function (id) {
        let card = this.cards.filter((card) => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {
        return this.cards.filter((card) => !card.flipped).length === 0;
    },

    createCardsFromCharacters: function () {
        this.cards = [];

        this.characters.forEach((character) => {
            this.cards.push(this.createPairFromCharacter(character));
        });
        this.cards = this.cards.flatMap((pair) => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromCharacter: function (character) {
        return [
            {
                id: this.createIdWithCharacter(character),
                icon: character,
                flipped: false,
            },
            {
                id: this.createIdWithCharacter(character),
                icon: character,
                flipped: false,
            },
        ];
    },

    createIdWithCharacter: function (character) {
        return character + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [
                this.cards[currentIndex],
                this.cards[randomIndex],
            ];
        }
    },

    flipCard: function (cardId, gameOverCallBack, noMatchCallBack) {
        if (this.setCard(cardId)) {
            if (this.secondCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    if (this.checkGameOver()) {
                        //Game Over
                        gameOverCallBack();
                    }
                } else {
                    setTimeout(() => {
                        //No Match
                        this.unflipCards();
                        noMatchCallBack();
                    }, 1000);
                }
            }
        }
    },
};
export default game;
