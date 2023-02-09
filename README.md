# Thinkful Capstone Project- Project Flashcard-o-matic

## Description

The goal of this project was to create a SPA application, using React, that allows users to create flash card decks for studying. Users can either create their own deck or review previously created decks. The CSS framework Bootstrap was used to add some styling to the application.

## Project Features

On the homepage all the current decks are displayed. Users have the option of pressing the `View`, `Study`, `Delete`, or `Create` deck buttons.  
![Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.45.38%20PM.png)

When the `Create` button is selected users will be navigated to the create Deck form, which allows them to create a deck.
![Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.49.13%20PM.png)

After a deck is created users will be taken to the `View Deck` page. Alternatively, users can also click the `View Deck` button on the home page to navigate to this screen.
![Alt test](/Images/Screen%20Shot%202023-02-08%20at%206.45.45%20AM.png)

Selecting the `Add Card` button takes users to the cards form where users can create cards to add to the deck.
![Alt Test](/Images/Screen%20Shot%202023-02-07%20at%207.50.08%20PM.png)

From the `View Deck` screen users can also delete cards, study the deck, and edit the deck and its cards.
![!Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.46.18%20PM.png)

Selecting the `Delete Card` button causes a pop-up message to appear which will confirm whether or not the user wants to delete the card from the deck.
![!Alt test](/Images/Screen%20Shot%202023-02-08%20at%207.02.29%20AM.png)

Selecting the `Edit` button on a card takes you to the edit card form, which lets users make edits to the card. The form is prefilled with the current card data.
![Alt test](/Images/Screen%20Shot%202023-02-08%20at%207.21.54%20AM.png)

Selecting the `Study` button allows users to study the cards in a deck. A question in the deck will appear. when users select the `Flip` button the answer will be shown. The `Study` button can also be selected from the home page.
![!Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.47.30%20PM.png)

When a user reaches the end of a study deck a pop-message will appear. The user can select to restart the deck and study the cards again or be returned to the home screen.
![Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.48.27%20PM.png)

Selecting the `Edit` button navigates users to the edit deck form which allows users to edit the deck's name and description information. The `Edit` button can be selected from the home page screen or the `View Deck` page.
![Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.46.43%20PM.png)

Selecting the `Delete` button causes a pop-up message to appear, Which confirms if the user wants to delete the deck.
![Alt test](/Images/Screen%20Shot%202023-02-07%20at%207.45.55%20PM.png)

## Dependencies

- React
- Jest

# Installation

1. Fork this repository
2. run `npm install` to install project dependencies
3. run `npm start` to begin the application
