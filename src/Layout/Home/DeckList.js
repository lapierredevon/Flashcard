import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import  { listDecks } from "../../utils/api/index"
import DeckDelete from "../Delete/DeckDelete"


//The DeckList function is exported into the Home componenet
export default function DeckList() {
    //decks useState is used to store the decks that are loaded from the listDecks function that is used in the useEffect
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    //useEffect loads all the current decks in the database
    useEffect(() => {
        const abortController =  new AbortController();

        async function loadDecks() {
            
                const recallDecks = await listDecks(abortController.signal);
                setDecks(recallDecks);           
        }

        loadDecks();
        return () => abortController.abort();
    }, [])

    //this function maps over the decks in state and adds jsx to all the decks so that they will be displayed on the homepage
    //the DeckDelete is imported and used to delete decks on the homepage.
    const decksListed = decks.map((deck) => {
        
        return (
            <div className="border rounded p-2 my-2" key={deck.id}>
                <div>
                    <h3>{deck.name}
                    <small className="float-right">{deck.cards.length} cards</small></h3>
                </div>
                <div>
                    <p>{deck.description}</p>
                </div>
                <div>
                    <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                        <span className="oi oi-eye mx-1"></span>
                        View
                    </button>
                    <button className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        <span className="oi oi-book mx-1"></span>
                        Study
                    </button>
                        <DeckDelete deckId={deck.id} />
                </div>
            </div>
        )
    })

    return (
        <div className="decks">
            {decksListed}
        </div>
    )
}

