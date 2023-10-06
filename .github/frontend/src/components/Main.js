// import profileEditAvatar from '../images/avatar-edit.svg';
import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, avatar, about } = currentUser;


  return (
    <main>
      <section className="profile">
        <img onClick={onEditAvatar} src={avatar} alt="Ваш аватар" className="profile__avatar" />
        <img className="profile__edit-avatar" />
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{name}</h1>
            <button type="button" aria-label="Редактировать профиль" className="profile__edit-button  clickable" onClick={onEditProfile} />
          </div>
          <p className="profile__text">{about}</p>
        </div>
        <button type="button" aria-label="Добавить карточку" className="profile__add-button clickable" onClick={onAddPlace} />
      </section>

      <section className="elements">
          {cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardDelete={onCardDelete}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
    />
  ))}
      </section>
    </main>
  )
}

export default Main