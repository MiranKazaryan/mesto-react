import React from "react";
import {api} from "../utils/Api";
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){
    const [isEditPopupOpened, setEditPopupOpened] = React.useState(false);
    const [isAddPopupOpened, setAddPopupOpened] = React.useState(false);
    const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] = React.useState(false);




    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([res, cardList]) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
          setCards(cardList);
        })
        .catch((err) => {
          console.log(err);
      })
      },[]);
    return(
        <>
        <section className="profile">
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
                <button type="button" onClick={onEditAvatar} className="profile__edit-avatar"></button>
            </div>   
            <div className="profile__text-info"> 
                <div className="profile__name">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button> 
                </div>
                <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="photo-grid">
            <ul className="cards">
            {cards.map((card) => (
                

                    <Card onCardClick={onCardClick} card = {card} key = {card._id}/>
                    
                /*
                <Card 
                    card={card}
                    key={card._id}
                    //onCardClick={onCardClick}
                />*/
            ))}
            </ul>
        </section>
        </>
    );
}
export default Main;

/*<template id="initial-card">
<li class="card">
    <img class="card__image" src="#" alt="Изображение">
    <button class="card__delete-button"></button>
    <div class="card__info">
        <h2 class="card__title"> </h2>
        <div class="card__like-area">
            <button type="button" class="card__like-button" ></button>
            <span class="card__like-count">0</span>
        </div>
        
    </div>
</li>
</template>*/

/*<li class="card">
                    <img class="card__image" src={card.link} alt="Изображение"/>
                    <button class="card__delete-button"></button>
                    <div class="card__info">
                        <h2 class="card__title"> </h2>
                        <div class="card__like-area">
                            <button type="button" class="card__like-button" ></button>
                            <span class="card__like-count">0</span>
                        </div>
                    </div>
                </li>*/