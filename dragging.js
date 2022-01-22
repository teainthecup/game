let count = 0;
var startTime = performance.now();
var score = 0;

const drag = document.querySelector(".draggable-elements");
const dropp = document.querySelector(".droppable-elements");

let cislo = prompt("Zadejte číslo: ");
let arr = [];
let arrDrop = [];

function newRandom(cislo){
  let newNumber = Math.floor(Math.random()*cislo);
  while(arr.includes(newNumber)){
    newNumber = Math.floor(Math.random()*cislo);
  }
  arr.push(newNumber);
  return newNumber;
}

for(let x = 0; x < 10; x++){
    newRandom(cislo);
}

arr.forEach(number => {
  let tmp = new NumberDrag(drag, dropp, number,"black");
  tmp.assignDrop(tmp.droppable, drop);
  tmp.writeDraggable(tmp.i);
});

arr.sort(function(a,b){
  return a-b;
});

arr.forEach(number => {
  let tmp = new NumberDrag(drag, dropp, number,"black");
  tmp.assignDrop(tmp.droppable, drop);
  tmp.writeDroppable(tmp.droppable);
});

const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

function drop(event){
  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); 
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    event.target.style.color = 'white';     
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin",`<i>${draggableElementData}</i>`);
    count++;
    if(count == 10){
      var endTime = performance.now();
      score = endTime - startTime;
      
      alert('Váš čas byl: ' + score + ' millisekund.');
      localStorage.setItem("score", score);
    }
  }
}