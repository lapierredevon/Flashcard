import React from "react";
import DeckList from "../Home/DeckList"
import { useHistory} from "react-router-dom";

//This componenet creates the home page 
//The DeckList is imported and used to list all the current decks in the database
//useHistory is imported to be used with the button jsx. when the button is clicked history.push is used to send users to the CreateDeck page.

export default function Home() {
    const history = useHistory();
    return (
    <div>
            <button 
            className="btn btn-secondary" 
            type="button" 
            onClick={() => history.push("/decks/new")}>
                <span className="oi oi-plus mr-1"></span>
                 Create Deck 
                 </button>
        
        <DeckList/>
    </div>
    )
}