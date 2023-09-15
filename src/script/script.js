const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".inner");

let currentPosition = 0;
let isDragging = false;
let startPosX = 0;

const dragThreshold =5.57; // Ajuste o valor conforme necessário


buttonsWrapper.addEventListener("click", e => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach(item =>
      item.classList.remove("active")
    );
    
    if (e.target.classList.contains("voltar")) {
      currentPosition = Math.max(currentPosition - dragThreshold, 0);
    } else if (e.target.classList.contains("avancar")) {
      currentPosition = Math.min(currentPosition + dragThreshold, 100);
    }
    
    updateSlidePosition();
    e.target.classList.add("active");
  }
});

slides.addEventListener("mousedown", e => {
  isDragging = true;
  startPosX = e.clientX;
});

slides.addEventListener("mouseup", e => {
  if (isDragging) {
    isDragging = false;
    const endPosX = e.clientX;
    const deltaX = startPosX - endPosX;
    
    if (deltaX > 0) {
      // Dragged to the left, advance the slides
      currentPosition = Math.min(currentPosition + dragThreshold, 100);
    } else if (deltaX < 0) {
      // Dragged to the right, go back in slides
      currentPosition = Math.max(currentPosition - dragThreshold, 0);
    }
    
    updateSlidePosition();
  }
});

slides.addEventListener("touchstart", e => {
  isDragging = true;
  startPosX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
  if (isDragging) {
    isDragging = false;
    const endPosX = e.changedTouches[0].clientX;
    const deltaX = startPosX - endPosX;
    
    if (deltaX > 0) {
      // Dragged to the left, advance the slides
      currentPosition = Math.min(currentPosition + dragThreshold, 100);
    } else if (deltaX < 0) {
      // Dragged to the right, go back in slides
      currentPosition = Math.max(currentPosition - dragThreshold, 0);
    }
    
    updateSlidePosition();
  }
});

function updateSlidePosition() {
  slides.style.transform = `translateX(-${currentPosition}%)`;
  updateActiveButton();
}

function updateActiveButton() {
  Array.from(buttonsWrapper.children).forEach(item =>
    item.classList.remove("active")
  );
  const index = Math.round(currentPosition / dragThreshold);
  buttonsWrapper.children[index].classList.add("active");
}