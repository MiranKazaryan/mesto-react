import React from "react";
import {CardContext} from '../contexts/CardContext';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({onCardClick, onCardLike, onCardDelete}){
    const card = React.useContext(CardContext);
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = (card.owner._id === currentUser._id);

    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? '': 'card__delete-button_hidden'}`
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active': ''}`;
    function handleClick(){
        onCardClick(card);
    }
    function handleLikeClick(){
        onCardLike(card);
    }
    function handleDeleteClick(){
        onCardDelete(card);
    }
    return(
            <li className="card">
                <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
                <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                <div className="card__info">
                    <h2 className="card__title">{card.name} </h2>
                    <div className="card__like-area">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <span className="card__like-count">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    )
}

export default Card; 