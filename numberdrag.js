class NumberDrag extends Drag{

    constructor(num){

        
        this.draggableElement.addEventListener("dragstart", this.dragStart);
  
        this.droppable.addEventListener("dragenter", this.dragEnter);
        this.droppable.addEventListener("dragover", this.dragOver);
        this.droppable.addEventListener("dragleave", this.dragLeave);
    }


}