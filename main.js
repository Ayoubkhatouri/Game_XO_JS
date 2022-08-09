const x_class='x';
const o_class='o';
const winnig_comnination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//on va recuperer tous les cellule
const cellElements=document.querySelectorAll('[data-cell]');
console.log(cellElements);
const board=document.getElementById("board");
let circleTurn;
const winnigMessageElmentsText=document.querySelector('[data-winning-message-text]');
const winnigMessageElment=document.getElementById("winningMessage");
const restartButton=document.getElementById("restartButto");


startGame();
restartButton.addEventListener("click",startGame);

function startGame (){
    circleTurn=false;

cellElements.forEach(cell => {
    cell.classList.remove(o_class);
    cell.classList.remove(x_class);
    cell.addEventListener("click",manipClick,{once:true})
    winnigMessageElment.classList.remove('show');

});
}
function manipClick(elem){
const cel=elem.target;
const currentClass=circleTurn?o_class:x_class;
placeMark(cel,currentClass);
if(checkWin(currentClass)){
endGame(false);}
//there is no winner
else if( isDraw()){
endGame(true);
}
else{
switchTurn();
faireHover();
}
}

function placeMark(cel,currentClass){
    cel.classList.add(currentClass);
}
function switchTurn(){
   circleTurn=!circleTurn;
}
function faireHover(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if(circleTurn)
    board.classList.add(o_class);
    else
    board.classList.add(x_class);
}   

function checkWin(currentClass){
    return winnig_comnination.some(elem=>{
     return   elem.every(e=>{
       return   cellElements[e].classList.contains(currentClass);
        })
    })
}
function endGame(tru_fals){
    if(tru_fals){
winnigMessageElmentsText.innerText= 'No Winner!!!';
winnigMessageElment.classList.add('show');
    }
    else{
winnigMessageElmentsText.innerText=`${circleTurn?"O's Win!!!":"X's Win!!!"}`;
   winnigMessageElment.classList.add('show');
}
}
function isDraw(){
    //destruct the celleElemnts into an array so that it contain  the every mth
    return [...cellElements].every(cell=>{
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
}