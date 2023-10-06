import React, { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm.js"

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("")
  const [placeLink, setPlaceLink] = useState("")

  useEffect(() => {
    setPlaceName("")
    setPlaceLink("")
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    })
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value)
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value)
  }

  return (
    <PopupWithForm
      {...props}
      name="profile"
      title="Новое место"
      onSubmit={handleSubmit}
      buttonSave={props.onLoading ? `Сохранение` : `Сохранить`}
    >
      <input
        onChange={handleChangePlaceName}
        value={placeName}
        className="popup__input popup__input_type_title"
        type="text"
        name="text"
        placeholder="Название"
        id="card-text"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="title-input-error popup__input-error" />
      <input
        onChange={handleChangePlaceLink}
        value={placeLink}
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        id="card-link"
        type="url"
        required
      />
      <span className="link-input-error popup__input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup
