import React from "react";

function PopupWithForm (props) {
  const submitCaptionIsLoading =
    props.submitCaptionIsLoading || 'Сохранение...';
    return(
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} noValidate>
          <div className="popup__container">
            <button className="popup__close" onClick={props.onClose} type="button" />
            <h2 className='popup__title'>{props.title}</h2>
            <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
              {props.children}
              <button className="popup__save" type="submit">{props.buttonSave}</button>
              {props.isLoading
              ? submitCaptionIsLoading
              : props.submitCaption}
            </form>
          </div>
        </section>
    )
}

export default PopupWithForm