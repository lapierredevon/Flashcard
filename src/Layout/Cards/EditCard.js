import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

export default function EditCard() {
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [card, setCard] = useState({});
    const { deckId } = useParams();
    const { cardId } = useParams();
    const history = useHistory();

    //useEffects invokes the readDeck function and uses the deckId as an argument, which stores deck returned from the database in the deckState.
    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadDeck() {
                const pullDeck = await readDeck(deckId, abortController.signal);
                setDeck(pullDeck);
                
            
        }
    
        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    //useEffect invokes the readCard function and stores the returned information from the database to card, front, and back
    useEffect(() => {
        const abortController = new AbortController();

        async function recallCard() {
            
                const cards = await readCard(cardId, abortController.signal);
                setCard(cards);
                setFront(cards.front);
                setBack(cards.back);
            
            
            return () => {
                abortController.abort();
            }
    }

    recallCard();
    }, [cardId])


    //when the form is submitted, the updateCard function is called, and the cards infomation is updated and saved in the database. Then the user is taked to the decks page.
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard({
            ...card,
            front: front,
            back: back,
        })
        .then((update) => history.push(`/decks/${deck.id}`))

    }

    // jsx that is returned. The AddCard component uses the cardsForm component and passes down all of the usestates. 
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
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

