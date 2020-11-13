let colors = ['#EB8258', '#4FB0C6', '#F6F740', '#A100F2'];
const elements = document.querySelectorAll('.article');

function changeBackground(element){
    let random_num = Math.round(Math.random() * (colors.length-1));
    let random_color = colors[random_num];
    element.style.backgroundColor = random_color;
}

for (let i=0; i<elements.length; i++){
    console.log(i);
    changeBackground(elements[i]);
}