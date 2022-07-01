import React, { Children } from "react";

function PopupWithForm({title, name, buttonText, isOpen, children, onClose, onSubmit}){
    return(
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title"> {title}</h2>
                <form className="popup__form" name={name} id={`form-${name}`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__save-button" > {buttonText} </button>
                </form>
                <button type="button" className="popup__close-button"  onClick={onClose}></button>
            </div>
        </section>
    );
}

export default PopupWithForm;