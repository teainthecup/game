const brands = [
    {
      iconName: "android",
      brandName: "Android",
      color: "#a4c639"
    },
    {
      iconName: "app-store-ios",
      brandName: "App Store",
      color: "#5fc9f8"
    },
    {
      iconName: "apple",
      brandName: "Apple",
      color: "#aaaaaa"
    },
    {
      iconName: "bitcoin",
      brandName: "Bitcoin",
      color: "#d4af37"
    },
    {
      iconName: "blackberry",
      brandName: "BlackBerry",
      color: "#000000" 
    },
    {
      iconName: "blogger",
      brandName: "Blogger",
      color: "#f57d00" 
    },
    {
      iconName: "bluetooth",
      brandName: "Bluetooth",
      color: "#3b5998" 
    },
    {
      iconName: "bootstrap",
      brandName: "Bootstrap",
      color: "#553c7b" 
    },
    {
      iconName: "chrome",
      brandName: "Google Chrome",
      color: "#333333" 
    },
    {
      iconName: "discord",
      brandName: "Discord",
      color: "#7289da"
    },    
    {
      iconName: "dropbox",
      brandName: "Dropbox",
      color: "#007ee5" 
    },   
    {
      iconName: "ebay",
      brandName: "eBay",
      color: "#333333" 
    },
    {
      iconName: "edge",
      brandName: "Microsoft Edge",
      color: "#0078d7" 
    },    
    {
      iconName: "facebook-square",
      brandName: "Facebook",
      color: "#3b5998" 
    },    
    {
      iconName: "github",
      brandName: "GitHub",
      color: "#333333" 
    },
    {
      iconName: "google",
      brandName: "Google",
      color: "#333333" 
    },
    {
      iconName: "google-play",
      brandName: "Google Play",
      color: "#3bccff" 
    },    
    {
      iconName: "html5",
      brandName: "HTML5",
      color: "#e34f26" 
    },   
    {
      iconName: "internet-explorer",
      brandName: "Internet Explorer",
      color: "#1ebbee" 
    },
    {
      iconName: "java",
      brandName: "Java",
      color: "#5382a1" 
    },
    {
      iconName: "js-square",
      brandName: "JavaScript",
      color: "#333333" 
    },   
    {
      iconName: "linkedin",
      brandName: "LinkedIn",
      color: "#0077b5" 
    },
    {
      iconName: "linux",
      brandName: "Linux",
      color: "#000000" 
    },
    {
      iconName: "microsoft",
      brandName: "Microsoft",
      color: "#111111" 
    },
    {
      iconName: "node",
      brandName: "Node.js",
      color: "#68a063"
    },
    {
      iconName: "php",
      brandName: "PHP",
      color: "#8892be" 
    },    
    {
      iconName: "python",
      brandName: "Python",
      color: "#4584b6" 
    },    
    {
      iconName: "react",
      brandName: "React",
      color: "#00d8ff" 
    },
    {
      iconName: "reddit",
      brandName: "reddit",
      color: "#ff4500" 
    },
    {
      iconName: "stack-overflow",
      brandName: "Stack Overflow",
      color: "#f48024" 
    },
    {
      iconName: "windows",
      brandName: "Microsoft Windows",
      color: "#0078d7" 
    },
    {
      iconName: "wix",
      brandName: "Wix.com",
      color: "#333333" 
    },
    {
      iconName: "wordpress",
      brandName: "WordPress",
      color: "#21759b" 
    },    
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
  let draggableElements;
  let droppableElements;
  
  initiateGame();
  
  function initiateGame() {
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
    const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
    const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));
    
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
    
    draggableElements = document.querySelectorAll(".draggable");
    droppableElements = document.querySelectorAll(".droppable");
    
    draggableElements.forEach(elem => {
      elem.addEventListener("dragstart", dragStart);
    });
    
    droppableElements.forEach(elem => {
      elem.addEventListener("dragenter", dragEnter);
      elem.addEventListener("dragover", dragOver);
      elem.addEventListener("dragleave", dragLeave);
      elem.addEventListener("drop", drop);
    });
  }
  
  function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id); 
  function dragEnter(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.target.classList.add("droppable-hover");
    }
  }
  
  function dragOver(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.preventDefault();
    }
  }
  
  function dragLeave(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
      event.target.classList.remove("droppable-hover");
    }
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
}