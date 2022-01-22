class NumberDrag extends Drag{

    constructor(dragDiv, dropDiv, num, color){
        super(dragDiv,dropDiv);
        //<i id="5" draggable="true" style="color: #fc9929;" class="draggable" > &#8325; </i>
        //<div class="droppable" data-draggable-id="1"></div>

        this.i = document.createElement("i");
        this.i.id = num;
        this.i.classList.add("draggable");
        this.i.style.color = color; 
        this.i.innerHTML = num;
        this.i.draggable = "true";

        this.droppable = document.createElement("div");
        this.droppable.classList.add("droppable");
        this.droppable.setAttribute("data-draggable-id", num);

        this.i.addEventListener("dragstart", this.dragStart);
  
        this.droppable.addEventListener("dragenter", this.dragEnter);
        this.droppable.addEventListener("dragover", this.dragOver);
        this.droppable.addEventListener("dragleave", this.dragLeave);
    }


}