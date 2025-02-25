let score=0;
let coins=0
let gems=0
const button1=document.getElementById('button1');
const button2=document.getElementById('button2');
const scoreDisplay=document.getElementById('score');
const coinsDisplay=document.getElementById('coinres');
const gemsDisplay=document.getElementById('gemres');

button1.addEventListener('click', function(){
    score+=10;
    coins++
    console.log(score)
    scoreDisplay.textContent=`Score: ${score}`;
    coinsDisplay.textContent=`${coins} coins collected`;

})

button2.addEventListener('click', function(){
    score+=50;
    gems++
    scoreDisplay.textContent=`Score: ${score}`;
    gemsDisplay.textContent=`${gems} gems collected`;
})
