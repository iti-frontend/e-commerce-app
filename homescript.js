let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";


}

setInterval(() => {
  plusSlides(1);
}, 3000);

document.querySelector('.b1').addEventListener('click', function () {
  open('shop.html', '_self')
})
var boxes = document.querySelectorAll('.boxbutton')
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', function () {
    open('shop.html', '_self')

  })
}
