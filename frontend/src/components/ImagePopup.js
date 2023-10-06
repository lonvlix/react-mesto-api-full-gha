import React from "react";

function ImagePopup({ card, onClose, isImageOpen }) {
    return (
      <section className={`popup popup_image ${isImageOpen ? "popup_opened" : ""}`}>
        <figure className="popup__img-container">
          <button className=" popup__close" type="button" onClick={onClose} />
          <img src={card.link} className="popup__img-place" alt={card.text} />
          <h2 className="popup__name">{card?.text}</h2>
        </figure>
      </section>
    );
  }

  export default ImagePopup