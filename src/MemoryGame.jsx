import React, { useEffect, useState } from "react";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import game from "./game/game";

export default function MemoryGame() {
    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCardsFromCharacters());
    }, []);

    function restart() {
        game.clearCards();
        setCards(game.createCardsFromCharacters());
        setGameOver(false);
    }

    function handleFlip(card) {
        game.flipCard(
            card.id,
            () => {
                //gameOverCallBack
                setGameOver(true);
            },
            () => {
                //noMatchCallBack
                setCards([...game.cards]);
            }
        );
        setCards([...game.cards]);
    }

    return (
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    );
}
