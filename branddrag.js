class BrandDrag extends Drag{
    constructor(dragDiv, dropDiv, brand) {
        super(dragDiv, dropDiv);
        //<i class="fab fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
      
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
}