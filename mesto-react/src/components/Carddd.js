import React from "react";

function Card({card, onCardClick}){
    function handleClick(){
        onCardClick(card);
    }
    return(

        <li class="card">
        <img class="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <button class="card__delete-button"></button>
        <div class="card__info">
            <h2 class="card__title"> {card.name} </h2>
            <div class="card__like-area">
                <button type="button" class="card__like-button" >{card.likes.length}</button>
                <span class="card__like-count">0</span>
            </div>
        </div>
</li>
    );
}

export default Card;

