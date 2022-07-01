import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const currentUser = React.useContext(CurrentUserContext);
    const inputRef = React.useRef('');
    const [avatar, setAvatar] = React.useState({});
    React.useEffect(()=>{
        setAvatar(currentUser.avatar);
    },[currentUser])

    function handleAvatarChange(e){
        setAvatar(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault(); 
        onUpdateAvatar(
           inputRef.current.value
        );
        inputRef.current.value='';
      }
    return(
        <PopupWithForm 
        title="Обновить аватар?" 
        name="avatar"   
        buttonText="Да" 
        isOpen={isOpen} 
        onClose={onClose}
        onSubmit={handleSubmit}> 
                <input ref={inputRef} className="popup__input popup__input_type_img-link" maxLength="80" name="link" id="input-linkAv" placeholder="Ссылка на картинку" type="url"  required/> 
                <span className="popup__input-error input-linkAv-error"></span> 
        </PopupWithForm> 
    );
}

export default EditAvatarPopup