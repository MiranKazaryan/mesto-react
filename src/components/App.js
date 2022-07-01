import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {api} from "../utils/Api";

//импорт объекта
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';


function App() {
    const [isEditPopupOpened, setEditPopupOpened] = React.useState(false);
    const [isAddPopupOpened, setAddPopupOpened] = React.useState(false);
    const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    //11 ПР
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards,setCards] = React.useState([]);
    

        //Постановка лайка
        function handleCardLike(card) {
            // Снова проверяем, есть ли уже лайк на этой карточке
            const isLiked = card.likes.some(i => i._id === currentUser._id);
            
            // Отправляем запрос в API и получаем обновлённые данные карточки
            if(isLiked){
                api.deleteLike(card._id).then((newCard) =>{
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
            }
            else{
                api.addLike(card._id).then((newCard) =>{
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                }) 
            }
        }
        // удаление карточки
        function handleCardDelete(card){
            api.deleteCard(card._id).then((newCard)=>{
                setCards((state) => state.filter((c)=> c._id !== card._id ))
            }); 
        }
    
          React.useEffect(() => {
            Promise.all([api.getInitialCards(),api.getProfile()])
            .then(([cardList,res]) => {
                setCurrentUser(res);
                setCards(cardList);
            })
            .catch((err) => {
              console.log(err);
          })
          },[]);

    function handleEditAvatarClick(){
        setEditAvatarPopupOpened(true);
    }
    function handleEditProfileClick(){
        setEditPopupOpened(true);
    }
    function handleAddPlaceClick(){
        setAddPopupOpened(true);
    }


    function handleCardClick(card){
        setSelectedCard(card);
    }

    function closeAllPopups(){
        setAddPopupOpened(false);
        setEditAvatarPopupOpened(false);
        setEditPopupOpened(false);

        setSelectedCard({});
    }

    function handleUpdateUser(userInfo){
        api.editProfile({name:userInfo.name, about: userInfo.about})
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
      })
    }

    function handleUpdateAvatar(avatar){
        console.log(avatar);
        api.editAvatar(avatar).then((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdatePlace({name, link}){
        console.log('name:',name,'  link:',link)
        api.addCard(name,link).then((newCard)=>{
            setCards([newCard, ...cards])
            closeAllPopups();
        })
    }

  return (
<div className="page">
    <Header/>
    <CurrentUserContext.Provider value={currentUser}>
            <Main
            onEditProfile =  {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
            />

    </CurrentUserContext.Provider>
    
    <Footer/>

    <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup isOpen={isEditPopupOpened}
        onClose={closeAllPopups} onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>
    </CurrentUserContext.Provider>

    <CurrentUserContext.Provider value={currentUser}>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpened} 
    onClose={closeAllPopups} 
    onUpdateAvatar={handleUpdateAvatar}>

    </EditAvatarPopup>
    </CurrentUserContext.Provider>

    <AddPlacePopup 
    isOpen={isAddPopupOpened} 
    onClose={closeAllPopups} 
    onUpdatePlace={handleUpdatePlace}>
    </AddPlacePopup>




    <ImagePopup 
    card = {selectedCard}
    onClose = {closeAllPopups}>
    </ImagePopup>   
</div>
  );
}

export default App;
