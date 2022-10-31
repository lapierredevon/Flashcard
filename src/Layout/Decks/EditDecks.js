import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";


export default function EditDeck() {
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { deckId } = useParams();
    
    //this function handles what happens when something is typed into the name inbox
    const handleNameChange = ({target}) => setName(target.value);
    
    //this function handles what happens when something is typed into the description text area
    const handleDescriptionChange = ({target}) => setDescription(target.value);

        //uses deckId to load the deck with the matching id in the database. Stores the returned deck data to deck, name and description. 
        useEffect(() => {
            const abortController = new AbortController();
    
            async function loadDeck() {
                    const recallDeck = await readDeck(deckId, abortController.signal);
                    setDeck(recallDeck);
                    setName(recallDeck.name);
                    setDescription(recallDeck.description);
                
    
            }
    
            loadDeck();
            return () => abortController.abort();  
        }, [deckId])

    //this function invokes the update deck function, which updates the deck in the database. 
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck({
            ...deck,
            name: name,
            description: description,
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
    }

    //returns jsx for the edit forms page. It has a navigation on the page and the edit deck forms. it also prepopulates the form with the existing deck name and description
    return (
        <div className="edit-deck">
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h3>Edit: {deck.name}</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                required
                onChange={handleNameChange} 
                value={name}
                 />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                className="form-control" 
                id="description" 
                rows="3" 
                required
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
            </div>
            <br />
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Submit
            </button>
        </form>
        </div>
    )

}