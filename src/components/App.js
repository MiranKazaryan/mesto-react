import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
//import './index.css';

function App() {
    const [isEditPopupOpened, setEditPopupOpened] = React.useState(false);
    const [isAddPopupOpened, setAddPopupOpened] = React.useState(false);
    const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});


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


  return (
<div className="page">
    <Header/>
    <Main
    onEditProfile =  {handleEditProfileClick}
    onAddPlace = {handleAddPlaceClick}
    onEditAvatar = {handleEditAvatarClick}
    onCardClick = {handleCardClick}
    />
    <Footer/>
    <PopupWithForm 
    title="Редактировать профиль"
    name="edit"
    buttonText="Сохранить"
    isOpen={isEditPopupOpened}
    onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" minLength="2" maxLength="40" name="name" placeholder="Имя" id="input-name" required/>
        <span className="popup__input-error input-name-error"></span>
        <input className="popup__input popup__input_type_description" minLength="2" maxLength="200" name="about" placeholder="Вид деятельности" id="input-description" required/>
        <span className="popup__input-error input-description-error"></span>
    </PopupWithForm>

    <PopupWithForm 
    title="Новое место"
    name="add"
    buttonText="Создать"
    isOpen={isAddPopupOpened}
    onClose={closeAllPopups}>
            <input className="popup__input popup__input_type_place" minLength="2" maxLength="30" name="place" id="input-place" placeholder="Название" type="text" required/>
            <span className="popup__input-error input-place-error"></span>
            <input className="popup__input popup__input_type_img-link" maxLength="80" name="link" id="input-link" placeholder="Ссылка на картинку" type="url" required/>
            <span className="popup__input-error input-link-error"></span>
    </PopupWithForm>

    <PopupWithForm 
    title="Обновить аватар?"
    name="avatar"
    buttonText="Да"
    isOpen={isEditAvatarPopupOpened}
    onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_img-link" maxLength="80" name="link" id="input-linkAv" placeholder="Ссылка на картинку" type="url" required/>
        <span className="popup__input-error input-linkAv-error"></span>
    </PopupWithForm>
    <ImagePopup 
    card = {selectedCard}
    onClose = {closeAllPopups}>
    </ImagePopup>   
</div>
  );
}

export default App;
