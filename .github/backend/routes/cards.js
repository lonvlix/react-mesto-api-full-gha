const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { URL_PATTERN } = require('../utils/constants');
const {
  getInitialCards,
  addNewCard,
  addLike,
  removeLike,
  removeCard,
} = require('../controllers/cards');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(URL_PATTERN),
    }),
  }),
  addNewCard,
);

router.get('/', getInitialCards);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  addLike,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  removeLike,
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  removeCard,
);

module.exports = router;
