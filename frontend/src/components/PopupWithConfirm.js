import React from "react";
import PopupWithForm from "./PopupWithForm.js";

const PopupWithConfirm = ({ isOpen, onClose, onSubmit, isLoading, card }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Удалить?"
      buttonSave={isLoading ? `Удаление...` : `Удалить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
};

export default PopupWithConfirm;