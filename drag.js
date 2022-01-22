class Drag {
  constructor(dragDiv, dropDiv) {
      //<i class="fab fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
      this.dragDiv = dragDiv;
      this.dropDiv = dropDiv;
    }

  dragStart(event) {
      console.log(event.target.id);
      event.dataTransfer.setData("text", event.target.id);
  }

  dragEnter(event) {
      if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
          event.target.classList.add("droppable-hover");
      }
  }

  dragOver(event) {
      if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
          event.preventDefault();
      }
  }

  dragLeave(event) {
      if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
          event.target.classList.remove("droppable-hover");
      }
  }

  writeHtml(draggableElement, match ) {
    this.dragDiv.append(draggableElement);
    this.dropDiv.append(match);
  }

  assignDrop(dropElement, dropFunction) {
      dropElement.addEventListener("drop", dropFunction);
  }

  writeDroppable(match){
   this.dropDiv.append(match); 
  }

  writeDraggable(draggableElement){
    this.dragDiv.append(draggableElement);
  }

}