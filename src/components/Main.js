import React from "react";
import {api} from "../utils/Api";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import {CardContext} from '../contexts/CardContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}){
    
 
    const currentUser = React.useContext(CurrentUserContext);



      
    return(
        <>
        <section className="profile">
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                <button type="button" onClick={onEditAvatar} className="profile__edit-avatar"></button>
            </div>   
            <div className="profile__text-info"> 
                <div className="profile__name">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button> 
                </div>
                <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="photo-grid">
            <ul className="cards">
            {cards.map((card) => (
                <CardContext.Provider value={card} key = {card._id}>
                    <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete
                    }/>
                </CardContext.Provider>
            ))}
            </ul>
        </section>
        </>
    );
}
export default Main;