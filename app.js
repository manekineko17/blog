// j'appelle express et mongoose et body parser ! 
const bodyParser = require('body-parser'); //import de body parser
const mongoose = require('mongoose'); //import de mongoose
const postRoutes = require('./routes/post');    //importation du router

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

/* je créé mes routes en fonction de trois chemins différents : 
- un chemin pour accueil 
- un chemin pour le formulaire
- un chemin pour le détail en fonction de l'article demandé */ 

// Je fais en sorte que mon fichier soit écouté sur le port 3000 
app.use('/post', postRoutes); // middleware  localhost:3000/post
//si on met app.use('/api/post', postRoutes); localhost:3000/api/post



// je fais en sorte que mes données soit exportées sur mongoose 
module.exports = app;



app.listen(3000, function(){
  console.log('Connexion au serveur réussie'); 
  });

/*Une application Express est une série de fonctions appelées middleware. Chaque élément de middleware
*reçoit les objets request et response, peut les lire, les analyser et les manipuler. Le middleware Express
*reçoit ausssi la méthode next qui permet à chaque middleware de passer l'exécution au middleware suivant.*/ 