import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import DeckDelete from "../Delete/DeckDelete";
import CardDelete from "../Delete/CardDelete";

export default function Deck() {
    //stores the deck information that is loaded using useEffect
    const [deck, setDeck] = useState([]);
    //stores the card information that is loaded using useEffect
    const [card, setCard] = useState([]);
    //the param for the deck that will be loaded. 
    const { deckId } = useParams();
    const history = useHistory();

    //useEffect invokes the read deck function and uses the deckId to load a specific deck in the database. the loaded decks card information is stored in the card useState and and deck information is stored in the deck useState. 
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
                const recallDeck = await readDeck(deckId, abortController.signal);
                setDeck(recallDeck);
                setCard(recallDeck.cards)  
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    let listCards;
    
    //if card has a value map through the cards and add jsx to the cards in ther array.  if there are no cards deck scree will display loading.
    if(card) {
        listCards = card.map((card) => {
            return (
                <div className="cards border rounded m-1" key={card.id}>
                    <div className="m-1">
                        <p className="font-weight-bold">Front</p>
                        <p>{card.front}</p>
                    </div>

                    <div className="m-1">
                        <p className="font-weight-bold">Back</p>
                        <p>{card.back}</p>
                    </div>
                    <div>
                    <button 
                        className="btn btn-secondary m-1"
                        onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}
                        >
                        <span className="oi oi-pencil ml-1 float-right"></span>
                        Edit
                    </button>
                        <CardDelete cardId={card.id} deckId={deck.id} />
                    </div>
                </div>
            )
        })
    }
    else {
        listCards = "Loading";
    }

    //jsx that will be returned for decks component
    return (
        <div className="deck">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div className="header">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
            </div>
            <div className="buttons ">

                <button 
                className="btn btn-secondary mx-1"
                onClick={() => history.push(`/decks/${deck.id}/edit`)}>
                    <span className="oi oi-pencil mr-1"></span>
                    Edit
                </button>

                <button 
                    className="btn btn-primary mx-1" 
                    onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        <span className="oi oi-book mr-1"></span>
                        Study
                </button>

                <button 
                    className="btn btn-primary mx-1"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                        <span className="oi oi-plus mr-1"></span>
                        Add Cards
                </button>

                <DeckDelete deckId={deck.id} />

            </div>
            <h3 className="my-2">Cards</h3>
            <div>{listCards}</div>
        </div>
    )
}

