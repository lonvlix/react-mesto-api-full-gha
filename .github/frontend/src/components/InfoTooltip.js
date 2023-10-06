import React from "react";

function InfoTooltip({name, text, image, onClose, isOpen, isSuccess}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    className="popup__close pointer"
                    onClick={onClose}
                    type="button"
                />
                <div
                    className={`popup__success ${isSuccess
                        ? "popup__success_type_ok"
                        : "popup__success_type_fail"
                    }`}
                />
                <img className="popup__info-image" src={image} alt="" />
                <h2
                    className="popup__title">{text}</h2>
                
            </div>
        </div>
    );
}

export default InfoTooltip;