const dragDiv = document.querySelector("#dragDiv");
const dropDiv = document.querySelector("#dropDiv");

let total = 0;
let correct = 0;

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    const draggableElementBrand = event.dataTransfer.getData("text");
    const droppableElementBrand = event.target.getAttribute("data-brand");
    total++;
    if (draggableElementBrand == droppableElementBrand) {
        const draggableElement = document.getElementById(draggableElementBrand);
        event.target.classList.add("dropped");
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.innerHTML = `<i class="fab fa-${draggableElementBrand}" style="color: ${draggableElement.style.color};"></i>`;
        correct++;
    }
    setTimeout(() => {
        alert(correct + " " + total);
    }, 200);
    /*if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) {
        playAgainBtn.style.display = "block";
        setTimeout(() => {
            playAgainBtn.classList.add("play-again-btn-entrance");
        }, 200);
        let success = correct / total * 100;
        //console.log(success);
        alert('Vaše úspěšnost byla: ' + success);
        //localStorage.setItem("success", success);
    }*/

}

let count = 0;
brands.forEach(brand => {
    if(count > 9)
        return;
    let tmp = new Drag(dragDiv, dropDiv, brand);
    tmp.assignDrop(drop);
    count++;
});