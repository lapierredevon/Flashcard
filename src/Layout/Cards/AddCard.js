import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";
import CardForm from "./CardForm";



export default function AddCard() {
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const { deckId } = useParams();


    //useEffect invokes the readDeck function, which uses the deckId to load the deck that matches the deckId in the database. Then the recalled deck information is set to the setDeck. 
    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadDeck() {
                const recallDeck = await readDeck(deckId, abortController.signal);
                setDeck(recallDeck);
        }
    
        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    //This function handles what happens when the form is submitted. Upon the forms submition the createCard function is invoked, which adds the new cards information to the deck database. Then the form is set to its initial value.
    
    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(front, back)
        createCard(deckId, {
            front: front,
            back: back,
        });
        setFront("");
        setBack("");
    }
    
    //jsx that is returned. The AddCard component uses the cardsForm component and passes down all of the usestates. 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <div className="card-info">
            <CardForm 
                front={front} 
                back={back} 
                deck={deck}
                setFront={setFront} 
                setBack={setBack} 
                handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

