const brands = [
  new Brand(
   "android",
   "Android",
   "#a4c639"
  ),
  new Brand(
     "app-store-ios",
     "App Store",
     "#5fc9f8"
  ),
  new Brand(
     "apple",
     "Apple",
     "#aaaaaa"
  ),
  new Brand(
     "bitcoin",
     "Bitcoin",
     "#d4af37"
  ),
  new Brand(
     "blackberry",
     "BlackBerry",
     "#000000" 
  ),
  new Brand(
     "blogger",
     "Blogger",
     "#f57d00" 
  ),
  new Brand(
     "bluetooth",
     "Bluetooth",
     "#3b5998" 
  ),
  new Brand(
     "bootstrap",
     "Bootstrap",
     "#553c7b" 
  ),
  new Brand(
     "chrome",
     "Google Chrome",
     "#333333" 
  ),
  new Brand(
     "discord",
     "Discord",
     "#7289da"
  ),    
  new Brand(
     "dropbox",
     "Dropbox",
     "#007ee5" 
  ),   
  new Brand(
     "ebay",
     "eBay",
     "#333333" 
  ),
  new Brand(
     "edge",
     "Microsoft Edge",
     "#0078d7" 
  ),    
  new Brand(
     "facebook-square",
     "Facebook",
     "#3b5998" 
  ),    
  new Brand(
     "github",
     "GitHub",
     "#333333" 
  ),
  new Brand(
     "google",
     "Google",
     "#333333" 
  ),
  new Brand(
     "google-play",
     "Google Play",
     "#3bccff" 
  ),    
  new Brand(
     "html5",
     "HTML5",
     "#e34f26" 
  ),   
  new Brand(
     "internet-explorer",
     "Internet Explorer",
     "#1ebbee" 
  ),
  new Brand(
     "java",
     "Java",
     "#5382a1" 
  ),
  new Brand(
     "js-square",
     "JavaScript",
     "#333333" 
  ),   
  new Brand(
     "linkedin",
     "LinkedIn",
     "#0077b5" 
  ),
  new Brand(
     "linux",
     "Linux",
     "#000000" 
  ),
  new Brand(
     "microsoft",
     "Microsoft",
     "#111111" 
  ),
  new Brand(
     "node",
     "Node.js",
     "#68a063"
  ),
  new Brand(
     "php",
     "PHP",
     "#8892be" 
  ),    
  new Brand(
     "python",
     "Python",
     "#4584b6" 
  ),    
  new Brand(
     "react",
     "React",
     "#00d8ff" 
  ),
  new Brand(
     "reddit",
     "reddit",
     "#ff4500" 
  ),
  new Brand(
     "stack-overflow",
     "Stack Overflow",
     "#f48024" 
  ),
  new Brand(
     "windows",
     "Microsoft Windows",
     "#0078d7" 
  ),
  new Brand(
     "wix",
     "Wix.com",
     "#333333" 
  ),
  new Brand(
     "wordpress",
     "WordPress",
     "#21759b" 
  ),    
];
  
  let correct = 0;
  let total = 0;
  const totalDraggableItems = 5;
  const totalMatchingPairs = 5; 
  
  const scoreSection = document.querySelector(".score");
  const correctSpan = scoreSection.querySelector(".correct");
  const totalSpan = scoreSection.querySelector(".total");
  const playAgainBtn = scoreSection.querySelector("#play-again-btn");
  
  const draggableItems = document.querySelector(".draggable-items");
  const matchingPairs = document.querySelector(".matching-pairs");
  
  initiateGame();
  
  function initiateGame() {
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
    const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
    const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));
    
    /*
    for(let i=0; i<randomDraggableBrands.length; i++) {
      draggableItems.insertAdjacentHTML("beforeend", `
        <i class="fab fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
      `);
    }
    for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
      matchingPairs.insertAdjacentHTML("beforeend", `
        <div class="matching-pair">
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
        </div>
      `);
    }
    */
   let randomBrand = generateRandomItemsArray(5, brands);
   randomBrand.forEach(brand => {
      let drag = new BrandDrag(draggableItems, matchingPairs, brand);
      drag.assignDrop(drag.droppable, drop);
   });
  }
    
  function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    const draggableElementBrand = event.dataTransfer.getData("text");
    const droppableElementBrand = event.target.getAttribute("data-brand");
    const isCorrectMatching = draggableElementBrand===droppableElementBrand;
    total++;
    if(isCorrectMatching) {
      const draggableElement = document.getElementById(draggableElementBrand);
      event.target.classList.add("dropped");
      draggableElement.classList.add("dragged");
      draggableElement.setAttribute("draggable", "false");
      event.target.innerHTML = `<i class="fab fa-${draggableElementBrand}" style="color: ${draggableElement.style.color};"></i>`;
      correct++;  
    }
    scoreSection.style.opacity = 0;
    setTimeout(() => {
      correctSpan.textContent = correct;
      totalSpan.textContent = total;
      scoreSection.style.opacity = 1;
    }, 200);
    if(correct===Math.min(totalMatchingPairs, totalDraggableItems)) { 
      playAgainBtn.style.display = "block";
      setTimeout(() => {
        playAgainBtn.classList.add("play-again-btn-entrance");
      }, 200);
      let success = correct/total * 100;
      //console.log(success);
      alert('Vaše úspěšnost byla: ' + success);
      localStorage.setItem("success", success);

    }
  }

  playAgainBtn.addEventListener("click", playAgainBtnClick);
  function playAgainBtnClick() {
    playAgainBtn.classList.remove("play-again-btn-entrance");
    correct = 0;
    total = 0;
    draggableItems.style.opacity = 0;
    matchingPairs.style.opacity = 0;
    setTimeout(() => {
      scoreSection.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      playAgainBtn.style.display = "none";
      while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
      while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
      initiateGame();
      correctSpan.textContent = correct;
      totalSpan.textContent = total;
      draggableItems.style.opacity = 1;
      matchingPairs.style.opacity = 1;
      scoreSection.style.opacity = 1;
    }, 500);
  }
  
  function generateRandomItemsArray(n, originalArray) {
    let res = [];
    let clonedArray = [...originalArray];
    if(n>clonedArray.length) n=clonedArray.length;
    for(let i=1; i<=n; i++) {
      const randomIndex = Math.floor(Math.random()*clonedArray.length);
      res.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return res;
  }
