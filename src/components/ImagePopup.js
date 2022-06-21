import React from "react";

function ImagePopup({card, onClose}){
    return(
       <section className={`popup popup_view ${card.link && 'popup_opened'}`} >
            <div className="popup__area">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image" alt={card.name} src={card.link}/>
                <p className="popup__view-title"></p>
            </div>
        </section>
    )
}

export default ImagePopup;