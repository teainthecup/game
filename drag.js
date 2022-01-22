class Drag {
  constructor(dragDiv, dropDiv, brand) {
      //<i class="fab fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
      this.dragDiv = dragDiv;
      this.dropDiv = dropDiv;
      this.draggableElement = document.createElement("i");
      this.draggableElement.classList.add("fab", "fa-" + brand.iconName, "draggable");
      this.draggableElement.style.color = brand.color;
      this.draggableElement.draggable = "true";        
      this.draggableElement.id = brand.iconName;        
      /*
      <div class="matching-pair">
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
      </div>
      */
      this.match = document.createElement("div");
      this.match.classList.add("matching-pair");
      let label = document.createElement("span");
      label.classList.add("label");
      label.innerHTML = brand.brandName;
      this.droppable = document.createElement("droppable");
      this.droppable.classList.add("droppable");
      this.droppable.setAttribute("data-brand", brand.iconName);
      //this.dropElement.classList.add("droppable");
      //this.dropElement.setAttribute("data-brand", brand.iconName);
      //this.dropElement.innerHTML = brand.brandName;

      this.match.append(label,this.droppable);
      this.writeHtml();

      this.draggableElement.addEventListener("dragstart", this.dragStart);

      this.droppable.addEventListener("dragenter", this.dragEnter);
      this.droppable.addEventListener("dragover", this.dragOver);
      this.droppable.addEventListener("dragleave", this.dragLeave);
      //this.dropElement.addEventListener("drop", drop);
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

  writeHtml() {
      this.dragDiv.append(this.draggableElement);
      this.dropDiv.append(this.match);
  }

  assignDrop(dropFunction) {
      this.droppable.addEventListener("drop", dropFunction);
  }
}