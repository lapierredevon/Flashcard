import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//this component is used by the study screen. 
export default function CardList({deck, cardCount, cards}){
    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState(true);
    const history = useHistory();

    //if the cardCount passed down from the Study component is less than 3 return the following jsx
    if (cardCount < 3) {
        return (
            <div>
                <h4> Not Enough Cards</h4>
                <p> You need at least 3 cards to study. There are {cardCount} cards in this deck</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                    <span className="oi oi-plus mr-1"></span>
                    Add Cards
                </button>
            </div>
        )
    }

    //this function flips the card between the front
    function flipCard() {
        setFlip(!flip);
    }

    //This function goes through the entire deck. When the deck is completed the user will be asked restart the deck or return to the homepage. 
    function next() {
        if (index < (cardCount-1)) {
            setIndex(index + 1);
            setFlip(true);
        }
        else {
            const restart = window.confirm("Do you want to restart the deck? Clicking cancel will return you to the homepage.");

            //if restart prompt returns true, reset the deck to its intial state
            if (restart) {
                setIndex(0);
                setFlip(true);
            }
            //else return home
            else history.push("/");
            
        }
    }

    //jsx that is returned to the study component.
    return (
        <div className="card-body border rounded p-2 my-2">
            <div className="card-title">
                <h4>Card {index + 1} of {cardCount}</h4>
                <p>{flip ? cards[index]?.front : cards[index]?.back}</p>
            </div>
            <div className="buttons">
                <button className="btn btn-secondary mx-1" onClick={flipCard}>Flip</button>
                {!flip && (<button className="btn btn-primary" onClick={next}>Next</button>)}
            </div>
        </div>
    )

}

