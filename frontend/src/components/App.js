import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup.js"
import api from "../utils/api.js"
import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import ProtectedRoute from "./ProtectedRoute.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import EditProfilePopup from "./EditProfilePopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
// import PopupWithForm from './PopupWithForm.js';
import PopupWithConfirm from "./PopupWithConfirm.js"
import Login from "./Login.js"
import * as auth from "../utils/AuthApi.js"
import Register from "./Register.js"
import InfoTooltip from "./InfoTooltip.js"
import { useState, useEffect } from "react"
import unsuccessImage from "../images/error.png"
import successImage from "../images/noerror.png"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSuccessTooltipStatus, setisSuccessTooltipStatus] = useState(false)
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isInfoTooltipPopupOpen ||
    isConfirmPopupOpen ||
    isImageOpen

  const [currentUser, setCurrentUser] = useState({})
  const [profileEmail, setProfileEmail] = useState("")
  const [removedCardId, setRemovedCardId] = useState("")
  const [isLoadingPopupProfile, setIsLoadingPopupProfile] = useState(false)
  const [isLoadingPopupPlace, setIsLoadingPopupPlace] = useState(false)
  const [isLoadingPopupAvatar, setIsLoadingPopupAvatar] = useState(false)
  const [isLoadingPopupConfirm, setIsLoadingPopupConfirm] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            navigate("/")
            setProfileEmail(res.email)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([profileInfo, cardsData]) => {
          setCurrentUser(profileInfo)
          setCards(cardsData.data.reverse())
        })
        .catch((err) => console.log(err))
  }, [isLoggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id)
    ;(isLiked ? api.deleteLike(card._id) : api.addLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
  }

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(true)
    setRemovedCardId(cardId)
  }

  const handleUserUpdate = (newUserInformation) => {
    setIsLoadingPopupProfile(true)
    api
      .setUserInfo(newUserInformation)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoadingPopupProfile(false)
      })
  }

  const handleCardClick = (card) => {
    setIsImageOpen(true)
    setSelectedCard(card)
  }

  const handleCardDelete = async (card) => {
    setIsLoadingPopupConfirm(true)
    try {
      await api.deleteCard(card._id)
      setCards((arrayCardsUpdated) =>
        arrayCardsUpdated.filter((item) => card._id !== item._id)
      )
      closeAllPopups()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingPopupConfirm(false)
    }
  }

  function handleAvatarUpdate(newAvatar) {
    setIsLoadingPopupAvatar(true)
    api
      .updateAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoadingPopupAvatar(false)
      })
  }

  function handleAddPlace(data) {
    setIsLoadingPopupPlace(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        console.log(cards)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoadingPopupPlace(false))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageOpen(false)
    setSelectedCard({})
    setIsInfoTooltipPopupOpen(false)
    setIsConfirmPopupOpen(false)
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setisSuccessTooltipStatus(true)
          navigate("/sign-in")
        }
      })
      .catch((err) => {
        setisSuccessTooltipStatus(false)
        console.log(err)
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true)
      })
  }

  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          localStorage.setItem("jwt", res.token)
          setProfileEmail(email)
          navigate("/")
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true)
        setisSuccessTooltipStatus(false)
        console.log(err)
      })
  }

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isPopupOpen) {
      document.addEventListener("keydown", closeByEsc)
      return () => {
        document.removeEventListener("keydown", closeByEsc)
      }
    }
  }, [isPopupOpen])

  const handleSignOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    navigate("/sign-in")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <div className="page__content">
          <Header onSignOut={handleSignOut} userEmail={profileEmail} />
          <Routes>
            <Route
              path="/sign-in"
              element={<Login onAuthorize={handleAuthorize} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />

            <Route
              path="*"
              element={
                <ProtectedRoute
                  path="/"
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                  loggedIn={isLoggedIn}
                  component={Main}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  onEditProfile={setIsEditProfilePopupOpen}
                />
              }
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUserUpdate}
            isLoading={isLoadingPopupProfile}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
            isLoading={isLoadingPopupAvatar}
          />

          <AddPlacePopup
            isLoading={isLoadingPopupPlace}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isImageOpen={isImageOpen}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            text={
              isSuccessTooltipStatus
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так. Попробуйте ещё раз."
            }
            image={isSuccessTooltipStatus ? successImage : unsuccessImage}
          />

          <PopupWithConfirm
            card={removedCardId}
            isLoading={isLoadingPopupConfirm}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
