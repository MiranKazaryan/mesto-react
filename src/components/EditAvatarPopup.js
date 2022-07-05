import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
//компонент редактирования аватара 
function EditAvatarPopup({isOpen, onClose, onUpdateAvatar,isLoad,handleOverlayClose}){
    //использование контекста с текущими значениями пользователя
    const currentUser = React.useContext(CurrentUserContext);
    //объявление рефа для отслеживания изменений в инпуте
    const inputRef = React.useRef('');
    //стейт аватара
    const [avatar, setAvatar] = React.useState({});


    //валидация
    const [linkValid,setLinkValid] = React.useState(false);
    const [errorLinkMessage, setErrorLinkMessage] = React.useState('');
    //обнуление инпутов после ввода без сабмита и обновление аватара
    React.useEffect((e)=>{
        setLinkValid(false);
        setErrorLinkMessage('');
        setAvatar(currentUser.avatar);
        inputRef.current.value='';
    },[currentUser,isOpen])
    //функция при изменение инпута link
    function handleAvatarChange(e){
        setLinkValid(e.target.validity.valid);
        setErrorLinkMessage(e.target.validationMessage);
    }
    //функция сабмита
    function handleSubmit(e) {
        e.preventDefault(); 
        onUpdateAvatar(
           inputRef.current.value
        );
      }
    //проверка валидности данных
    const isValid = linkValid;
    
    return(
        <PopupWithForm 
        title="Обновить аватар?" 
        name="avatar"   
        buttonText="Да" 
        isOpen={isOpen} 
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoad={isLoad} 
        handleOverlayClose={handleOverlayClose} isValid={isValid}> 
                <input ref={inputRef} onChange={handleAvatarChange} className={`popup__input popup__input_type_img-link ${errorLinkMessage==='' ? '' : 'popup__input_type_error'}`} maxLength="80" name="link" id="input-linkAv" placeholder="Ссылка на картинку" type="url"  required/> 
                <span className="popup__input-error input-linkAv-error">{errorLinkMessage}</span> 
        </PopupWithForm> 
    );
}

export default EditAvatarPopup