import React from "react";
import {api} from "../utils/Api";
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){
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
            ))}
            </ul>
        </section>
        </>
    );
}
export default Main;