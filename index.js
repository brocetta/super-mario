let gamebox = document.querySelector(".gamebox");
let marioStatic =document.querySelector(".marioStatic");
let marioRunning = document.querySelector(".marioRunning");
let myMario = document.querySelector(".myMario");
let jumpBtn = document.querySelector(".jumpBtn");
let moveFloor = 0;
let audio = new Audio ("./Jump.mp3");
let audio2 = new Audio ("./Music.m4a");

audio2.loop = true;
audio.volume = 0.4;

let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;

jumpBtn.addEventListener("touchstart", () => {
    isJumping = true;
    isMovingLeft = false;
    isMovingRight = false;
});
jumpBtn.addEventListener("touchend", () => {
    isJumping = false;
});
jumpBtn.addEventListener("mousedown", () => {
    isJumping = true;
    isMovingLeft = false;
    isMovingRight = false;
});
jumpBtn.addEventListener("mouseup", () => {
    isJumping = false;
});

window.addEventListener("keydown", (event) => {
   if (event.key === "ArrowRight"){
    isMovingRight = true;
   }
   if (event.key === "ArrowLeft"){
    isMovingLeft = true;
   }
   if (event.key === "ArrowUp" || event.key === " "){
    isJumping = true;
   }
});

window.addEventListener("keyup", (event) => {
   if (event.key === "ArrowRight"){
       isMovingRight = false;
   }
   if (event.key === "ArrowLeft"){
       isMovingLeft = false;
   }
   if (event.key === "ArrowUp" || event.key === " "){
       isJumping = false;
       setTimeout(() => {
           marioStatic.style.transform = "translateY(0px)";
       }, 500);
   }
});

setInterval(() => {
    if (isJumping) {
        isMovingLeft = false;
        isMovingRight = false;
      marioStatic.style.transform = "translateY(-200px)";
        audio.play();
    } else {
      marioStatic.style.transform = "translateY(0px)";
    }
    if (isMovingRight) {
        moveFloor -= 30;
        marioRunning.style.transform = "rotateY(360deg)";
        marioStatic.style.display = "none";
        marioRunning.style.display = "block";
        gamebox.style.backgroundPosition = `calc(${moveFloor}px - 4rem)`;
        audio2.play();
    } else if (isMovingLeft) {
        moveFloor += 30;
        marioRunning.style.transform = "rotateY(180deg)";
        marioStatic.style.display = "none";
        marioRunning.style.display = "block";
        gamebox.style.backgroundPosition = `calc(${moveFloor}px + 4rem)`;
    } else {
        marioStatic.style.display = "block";
        marioRunning.style.display = "none";
    }
}, 100);


let holdInterval;
const screenWidth = window.innerWidth; 

document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    if (startX < screenWidth / 2) {
        isMovingLeft = true;
    } else {
        isMovingRight = true;
    }
    holdInterval = setInterval(() => {
        console.log("holding");
    }, 100);
});

document.addEventListener("touchend", (event) => {
    clearInterval(holdInterval);
    isMovingLeft = false;
    isMovingRight = false;
});