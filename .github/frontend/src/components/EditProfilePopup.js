import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState();
    const [about, setAbout] = React.useState();

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    };

    const handleChangeAbout = (evt) => {
        setAbout(evt.target.value);
    };

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: about,
        });
    }

    return (
        <PopupWithForm
            {...props}
            name='profile'
            title='Редактирования профиля'
            onSubmit={handleSubmit}
            buttonSave={props.onLoading ? `Сохранение` : `Сохранить`}
        >
            <section className="popup__section">
            <input onChange={handleChangeName} onSubmit={handleSubmit} className="popup__input popup__input_type_name" value={name || ''} type="text" name="name" id="name-input" minLength={2} maxLength={40} required />
            <span className="name-input-error popup__input-error" />
            <input onChange={handleChangeAbout} onSubmit={handleSubmit} className="popup__input popup__input_type_text" value={about || ''} type="text" name="about" id="text-input" minLength={2} maxLength={200} required />
            <span className="text-input-error popup__input-error" />
            </section>
        </PopupWithForm>
    );
}

export default EditProfilePopup