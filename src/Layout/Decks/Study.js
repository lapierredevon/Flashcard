import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api/index";
import { useParams } from "react-router-dom";
import CardList from "../Cards/CardList"
import { Link } from "react-router-dom";


export default function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardCount, setCardCount] = useState(0);
    const { deckId } = useParams();

    //useEffect invokes the readDeck function and uses deckId as an argument. ReadDeck uses deckId to load the exixsting deck in the database and stores the decks infomation and the decks cards information to decks and cards. 
    useEffect(() => {
        const abortController = new AbortController();

        async function showCard() {
                const cardList = await readDeck(deckId, abortController.signal);
                setDeck(cardList);
                setCardCount(cardList.cards.length)
                setCards(cardList.cards)            
        }

        showCard();
        return () => abortController.abort();
    }, [deckId])

    
    //jsx returned on the study screen. It uses the cardlist component to list all of the existing cards. and passes deck, cardCount, and cards tp the cardlist compononet.  
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
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h3>{deck.name}: Study</h3>
            <div> <CardList deck={deck} cardCount={cardCount} cards={cards}/> </div>
        </div>
    )
}

