import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

//this component allows users to create new study decks when the createDeck button is selected. 
export default function CreateDeck() {
    const history = useHistory();
    //this useState stores the name information that users input into the name input box.
    const [name, setName] = useState("");

    //this useState stores the description information that users input into the description textarea box.
    const [description, setDescription] = useState("");

    //this function handles what happens when the user types into the name input box. Name is set to the value of what was typed into the box. this function handles 
    const handleNameChange = ({target}) => setName(target.value);

    //this function handles what happens when the user types into the deck description text area box. Description is set to the value that was typed into the description textarea.
    const handleDescriptionChange = ({target}) => setDescription(target.value);

    //this function handles what happens when the form is submitted. Upon submition of the form the createDeck function is invoked and creates a new deck using the name and description currently stored in state. then the newDeck's id is used to send users to the deck screen.
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck({
            name: name,
            description: description,
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
        
    }
    //jsx for the CreateDeck's page. 
    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Deck Name"
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
                placeholder="Brief description of the deck"
                required
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
            </div>
            <br />
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/`)}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Submit
            </button>
        </form>
        </div>
    )

}

