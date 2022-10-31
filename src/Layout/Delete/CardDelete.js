import React from "react";
import { deleteCard } from "../../utils/api/index";

export default function CardDelete({cardId}) {

    //this function handles the deletion of a card when the delete card button is selected.
    function handleCardDelete() {
        const doYouWantToDeleteCard = window.confirm("Are you sure you want to delete this Card? You will be unable to recover it.") //

    if(doYouWantToDeleteCard) {
        deleteCard(cardId)
        .then(window.location.reload()) //reloads page to show that the card was deleted.
    }
}

    //returns the delete card button jsx
    return (
        <button className="btn btn-danger float-right" onClick={handleCardDelete}>
            Delete Card
        </button>
    )
}

