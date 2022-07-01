import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onUpdatePlace}){
    const [name, setName] = React.useState({});
    const [link, setLink] = React.useState({});

    function handleNameCard(e){
        setName(e.target.value);
    }
    function handleLink(e){
        setLink(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        onUpdatePlace({name:name, link:link})
    }
    return(
        <PopupWithForm 
        title="Новое место"
        name="add"
        buttonText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
                <input onChange={handleNameCard} className="popup__input popup__input_type_place" minLength="2" maxLength="30" name="place" id="input-place" placeholder="Название" type="text" required/>
                <span className="popup__input-error input-place-error"></span>
                <input onChange={handleLink} className="popup__input popup__input_type_img-link" maxLength="80" name="link" id="input-link" placeholder="Ссылка на картинку" type="url" required/>
                <span className="popup__input-error input-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;