import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const avatar = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }

    return (
        <PopupWithForm
            {...props}
            name='profile'
            title='Новый аватар'
            onSubmit={handleSubmit}
            buttonSave={props.onLoading ? `Сохранение` : `Сохранить`}
        >
            <input onSubmit={handleSubmit} className="popup__input popup__input_type_link" ref={avatar} required name="avatar" placeholder="Ссылка на картинку" id="avatar-link" type="url" />
            <span className="avatar-input-error popup__input-error" />
        </PopupWithForm>
    );
}

export default EditAvatarPopup