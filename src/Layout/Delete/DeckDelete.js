import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";

//This function allows users to delete a deck when the delete button is selected. 
export default function DeckDelete({deckId}) {
    const history = useHistory();

    function handleDeckDelete() {
    const deckDelete = window.confirm("Are you sure you want to delete this deck? You will be unable to recover it.")
//if the users confirms that they want to delete a deck, the deleteDeck function is called. the user is pushed back to the home page and then the homepage is reloaded
    if(deckDelete) {
        deleteDeck(deckId)
        .then((history.push(`/`)))
        .then(window.location.reload()) //this reloads the page to show that the deck has been deleted.

    }
}
//returns the delete button jsx.
    return (
        <button className="btn btn-danger float-right" onClick={handleDeckDelete}>
            Delete
        </button>
    )
}

