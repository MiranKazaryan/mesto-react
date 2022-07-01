import React, { Children } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    const [name, setName] = React.useState({});
    const [description, setDescription] = React.useState({});
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(()=>{
        setName(currentUser.name);
        setDescription(currentUser.about);
    },[currentUser]);
    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        });
    }


    return(
        <PopupWithForm 
        title="Редактировать профиль"
        name="edit"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_name" minLength="2" maxLength="40" name="name" placeholder="Имя" id="input-name" value={name ||''} onChange={handleNameChange} required />
            <span className="popup__input-error input-name-error"></span>
            <input className="popup__input popup__input_type_description" minLength="2" maxLength="200" name="about" placeholder="Вид деятельности" id="input-description" value={description || ''} onChange={handleDescriptionChange} required />
            <span className="popup__input-error input-description-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;