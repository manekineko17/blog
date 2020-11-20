
////////////////////////////  POUR FAIRE AFFICHER TOUS LES ARTICLES SUR LA PAGE ////////////////////////////
const getAllArticles = async () => {
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    generateHtml(data);
};

getAllArticles(); 


 
let generateHtml = (data) => {
    // Je définis mon HTML comme étant vide à l'origine
    let html =""
// Je créé une boucle qui va incrémenter ma data (donc mon numéro de données) de 1 à chaque tour
    for(let i= 0; i < data.length; i++ ){
// Pour éviter que mon HTML se recharge à chaque passe de boucle pour n'afficher que les datas numéro i alors 
// j'additionne mon html existant au nouveau html que je passe dans la boucle          
// ici je réappelle ma variable html mais sans mettre le let devant car je ne la définis pas,
// je lui ajoute seulement une autre valeur !          
        html += `
        <div class="article">
        <h2> ${data[i].title} </h2>
            <div id="subject_article">
                <h3> Thème : </h3>
                <p class="background_data"> ${data[i].topic} </p>
                <h3> Nom de l'auteur : </h3>
                <p class="background_data"> ${data[i].author} </p>
                <h3> Date de publication : </h3>
                <p class="background_data"> ${data[i].date}</p>
            <button class="voir" onclick="getArticle('${data[i]._id}')"> Voir plus </button>
            </div>
        </div>
        `
    };
// on va créer une variable qui va aller récupérer notre classe container 
    let articlesDiv = document.querySelector('.container')
// Cette variable est donc stocké et prend en valeur la div container
// on va donc pouvoir retourner cet élement dans la variable html 
    articlesDiv.innerHTML = html
    randomBackground()
}



//////////////////////////// COULEUR DES BLOCS CHOISIE ALEATOIREMENT ENTRE 4 COULEURS DIFFERENTES ////////////////////////////

let colors = ['#EB8258', '#4FB0C6', '#F6F740', '#A100F2'];

let randomBackground = () => {
    const elements = document.querySelectorAll('.article');

    for (let i=0; i<elements.length; i++){
        changeBackground(elements[i]);
    }
}


let changeBackground = (element) => {
    let random_num = Math.round(Math.random() * (colors.length-1));
    let random_color = colors[random_num];
    element.style.backgroundColor = random_color;
}
;



////////////////////////////  POUR AFFICHER UN ARTICLE CHOISI ////////////////////////////


const getArticle = async (id) => {
    const response = await fetch(`http://localhost:3000/articles/${id}`);
    const article = await response.json()
    generateHtmlArticle(article)
};

    let generateHtmlArticle = (article) => {
        resetPage() //supprimer la page avant de générer une autre page
        let html =`
        <div id="container2">
            <h2>${article.title}</h2>

            <div id="info_articles">
                <div id="theme">
                    <span class="article_field">Thème:</span>
                    <p class="res">${article.topic}</p>
                </div>
                <div id="author">
                    <span class="article_field">Nom de l'auteur:</span>
                    <p class="res">${article.author}</p>
                </div>
                <div id="date">
                    <span class="article-field"> Date de publication:</span>
                    <p class="res">${article.date}</p>
                </div>
            </div>
            <div id="texte_area">
                <p class="res_contenu">${article.content}</p>
            </div>
            <div class ="return">
            <button class="back" onclick="getAllArticles(),resetPage()">Back</button></div></div>
        </div>
      `
    let articlesDiv = document.querySelector('.container1')
    articlesDiv.innerHTML = html
     };

        document.querySelectorAll('.voir').forEach((item) => {
        item.addEventListener('click', getArticle);
});

        const resetPage = () => {
    document.querySelector('.container').innerHTML = '';
    document.querySelector('.container1').innerHTML = '';
};
