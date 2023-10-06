import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext)
  const isOwn = (card.owner?._id || card.owner) === user._id
  const isLiked = card.likes.some((i) => i === user._id)

  function handleClick() {
    onCardClick(card)
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <button
        type="button"
        className={
          isOwn ? "element__trash" : "element__trash element__trash_hidden"
        }
        aria-label="Кнопка удаления поста"
        onClick={() => {
          handleDeleteClick(card)
        }}
      />

      <img
        src={card.link}
        onClick={handleClick}
        className="element__image"
        alt={card.text}
      />
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-info">
          <button
            onClick={handleLikeClick}
            type="button"
            className={`element__like ${
              isLiked ? "element__like-button_active" : ""
            }`}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>

      {/* <button className="element__trash clickable" type="button" /> */}
    </article>
  )
}

export default Card
