import React from "react";
import { useHistory } from "react-router-dom";

export default function CardForm({front, back, setFront, setBack, handleSubmit, deck}) {
    const history = useHistory();

    //this function handles what happens when the front input on the form changes.
    const handleFrontChange = ({target}) => setFront(target.value);

    //this function handles what happens when the back input on the form changes. it uses the states passed down from add card or edit card as props.
    const handleBackChange = ({target}) => setBack(target.value);


    return (
        <form onSubmit={handleSubmit}> 
            <div className="form-group">
            <label htmlFor="front">Front</label>
                <textarea 
                className="form-control" 
                id="front" 
                rows="3" 
                placeholder="Front side of card"
                required
                onChange={handleFrontChange}
                value={front}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea 
                className="form-control" 
                id="back" 
                rows="3" 
                placeholder="Back side of card"
                required
                onChange={handleBackChange}
                value={back}
                ></textarea>
            </div>
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                Done
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Save
            </button>
        </form>
    )
}

