var express = require('express');
const db = require('../models');
var router = express.Router();
const Card = db.Card;

/* GET cards listing. */
router.get('/', async (req, res) => {
  let cardList = await Card.findAll();
  return res.json(cardList);
});

/* POST create card. */
router.post('/', async (req, res) => {
  
  printDate();

  try {
    let card = { lista: req.body.lista, titulo: req.body.titulo, conteudo: req.body.conteudo };
    card = await Card.create(card);
  
    return res.status(201).json(card);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

});

/* PUT cards eddit. */
router.put('/:id', async (req, res) => {

  printDate();

  try {
    let cardId = +req.params.id + 1;console.log(cardId);
    let card = await Card.findOne({ where: { id: cardId }  });

    if (card === null) return res.status(404).json({ error: 'O card não existe!' })

    card.set(req.body);
    card = await card.save();

    let cards = await Card.findAll();

    return res.status(200).json(cards)

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }


});

/* DELETE cards listing. */
router.delete('/:id', async (req, res) => {

  const attrs = 'lista|titulo|conteudo'.split('|');
  const cardId = +req.params.id;

  let result = await Card.destroy({ where: { id: cardId } });

  if (result) {
    let cardList = await Card.findAll();
    return res.json(cardList);
  }

  printDate();
});

/**
 * printDate
 * print date with [01/01/2021 13:45:00] format
 */
function printDate() {

  const d_t = new Date();

  let year = d_t.getFullYear();
  let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
  let day = ("0" + d_t.getDate()).slice(-2);
  let hour = d_t.getHours();
  let minute = d_t.getMinutes();
  let seconds = d_t.getSeconds();

  console.log(day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + seconds);
}

module.exports = router;
