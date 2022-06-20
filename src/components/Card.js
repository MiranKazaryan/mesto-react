import React from "react";

function Card({card, onCardClick}){
    function handleClick(){
        onCardClick(card);
    }
    return(
            <li className="card">
                <img className="card__image" src={card.link} alt="Изображение" onClick={handleClick}/>
                <button className="card__delete-button"></button>
                <div className="card__info">
                    <h2 className="card__title">{card.name} </h2>
                    <div className="card__like-area">
                        <button type="button" className="card__like-button" ></button>
                        <span className="card__like-count">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    )
}

export default Card; 