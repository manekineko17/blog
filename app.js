// j'appelle express et mongoose et body parser ! 
const bodyParser = require('body-parser'); //import de body parser
const mongoose = require('mongoose'); //import de mongoose

// je fais en sorte qu'express utilise sa méthode de router et je vais en sorte que app l'utilise !
const express = require('express'); //import d'express + commande require

// Je créé une variable qui va permettre d'executer express
const app = express(); //appel de la méthode express pour créer une appli express

// je connecte ma database
mongoose.connect("mongodb+srv://adelevrc:OrBOQavXpEwtl2c5@cluster0.fz1lu.mongodb.net/opendata?retryWrites=true&w=majority", /*modifier le lien*/
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// j'évite les problèmes de CORS 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// je crée des  middlewares qui vont faire en sorte qu'à chaque fois que j'attend un chemin, j'ai ma fonction qui s'execute (ne pas oublier body parser)
app.use(bodyParser.json()); //middleware global. à partir de ce middleware, on a accès au corps de la req 

// je créé mon modèle d'articles 
const router = express.Router();

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  topic: {type: String, required: true}, /* faire recherche pour modifier le type */
  // imageUrl: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default : Date.now},
  content: {type: String, required: true},
});

module.exports = mongoose.model('Article', articleSchema);

/* je créé mes routes en fonction de trois chemins différents : 
- un chemin pour accueil 
- un chemin pour le formulaire
- un chemin pour le détail en fonction de l'article demandé */ 

router.route('/')
    .all(function(req,res){
        res.json({message : "Bienvenue sur notre API d'articles", methode : req.method});
    });

router.post('/articles', (req, res) => { //pour poster un article
  const article = new Article({
  ...req.body
  });
  article.save()
  .then(() => res.status(201).json({ message: 'Article enregistré!'}))
  .catch(error => res.status(400).json({ error }));
});

router.get('/articles/:article_id', (req, res) => {   // ":" correspond à une url dynamique
  Article.findById(req.params.article_id)
  .then(article => res.status(200).json(article))
  .catch(error => res.status(404).json({ error }));
});

router.get('/', (req, res) => {
  Article.find()
  .then(articles => res.status(200).json(articles))
  .catch(error => res.status(400).json({ error }));
});

// router.put('/:id', (req, res, next) => {
//     Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// router.delete('/:id', (req, res, next) => {
//     Article.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// Je fais en sorte que mon fichier soit écouté sur le port 3000 

//si on met app.use('/api/post', postRoutes); localhost:3000/api/post

// je fais en sorte que mes données soit exportées sur mongoose 
module.exports = app;

app.use(router);

app.listen(3000, function(){
  console.log('Connexion au serveur réussie'); 
  });


/*Une application Express est une série de fonctions appelées middleware. Chaque élément de middleware
*reçoit les objets request et response, peut les lire, les analyser et les manipuler. Le middleware Express
*reçoit ausssi la méthode next qui permet à chaque middleware de passer l'exécution au middleware suivant.*/ 