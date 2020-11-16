const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', (req, res) => {
    res.send("Hello, je viens du fichier post.js");
})

router.post('/', (req, res, next) => {
    delete req.body._id;
    const article = new Article({
    ...req.body
    });
    article.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error }));
});
  
router.put('/:id', (req, res, next) => {
    Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
  
router.delete('/:id', (req, res, next) => {
    Article.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
});

router.get('/', (req, res, next) => {
    Article.find()
.then(Articles => res.status(200).json(Articles))
.catch(error => res.status(400).json({ error }))
});

module.exports = router;
