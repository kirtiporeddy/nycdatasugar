const typewriter = document.querySelector('.typewriter');
const images = document.querySelectorAll('.image-container img');

typewriter.classList.add('typewriter-animating');

typewriter.addEventListener('animationend', () => {
  images.forEach((image, index) => {
    setTimeout(() => {
      image.style.opacity = 1;
    }, (index + 1) * 1000);
  });
});

let typewriter2 = document.querySelector(".typewriter2")
setTimeout(()=>{
    typewriter2.style.width = "100%"
    typewriter2.style.borderRight = ".12em solid orange"
}, 12000);