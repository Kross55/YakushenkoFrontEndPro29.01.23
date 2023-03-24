const slider = document.querySelector("#slider");
const images = slider.getElementsByTagName("img");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let index = 0;
images[0].style.display = "block";
prevBtn.style.display = "none";

prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

function showPrevImage() {
  
  index--;
  if (index === 0) {
    prevBtn.style.display = "none";
  }
  if (index < images.length - 1) {
    nextBtn.style.display = "block";
  }
  
  images[index].style.display = "block";
  
  for (let i = 0; i < images.length; i++) {
    if (i !== index) {
      images[i].style.display = "none";
    }
  }
}

function showNextImage() {
  
  index++;
  if (index === images.length - 1) {
    nextBtn.style.display = "none";
  }
  if (index > 0) {
    prevBtn.style.display = "block";
  }
  
  images[index].style.display = "block";
  
  for (let i = 0; i < images.length; i++) {
    if (i !== index) {
      images[i].style.display = "none";
    }
  }
}
