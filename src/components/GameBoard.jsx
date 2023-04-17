import React from "react";
import CardElemnt from "./CardElement";

export default function GameBoard(props) {
    return (
        <div id="gameBoard">
            {props.cards.map((card, index) => (
                <CardElemnt
                    handleFlip={props.handleFlip}
                    key={index}
                    card={card}
                ></CardElemnt>
            ))}
        </div>
    );
}
