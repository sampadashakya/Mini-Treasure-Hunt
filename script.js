let step = 0;

const notes = [
    "Hi bobo bear…\nWelcome to a tiny treasure hunt I made just for you.\nHope you have a fun time playing this.",
    "So how do we play this game?\nWell, you will be given clues turn by turn, and you will have to find the object based on the clue.",
    "Clue #1\nRemember our very first chat?\nIt all started while we were stretching…\nFind the thing that reminds us of that first moment together.",
    "Congratulations! You found it!\n\nClue #2\nIt’s strong, determined, and loves the gym as much as you do.\nPick the thing that reminds me how proud I am of you.",
    "Wow, look at you go!\n\nClue #3\nFind something sweet…\nSweet like you…\nAND sweet like the treats we shared on our first date."
];

const background = document.getElementById("background");
const yogaMat = document.getElementById("yogaMat");
const dumbbell = document.getElementById("dumbbell");
const brownie = document.getElementById("brownie");

const startGame = document.getElementById("startGame");
const note = document.getElementById("note");
const noteText = document.getElementById("noteText");
const noteContinue = document.getElementById("noteContinue");
const noteButton = document.getElementById("noteButton");

const badge = document.getElementById("badge");
const playAgain = document.getElementById("playAgain");
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiParticles = [];

// Start Game
startGame.addEventListener("click", () => {
    startGame.style.display = "none";
    background.style.display = "block";
    yogaMat.style.display = "block";
    dumbbell.style.display = "block";
    brownie.style.display = "block";
    noteButton.style.display = "block";
    step = 1;
    showNote();
});

// Show clue popup
function showNote() {
    noteText.textContent = notes[step-1];
    note.style.display = "block";
    background.style.filter = "blur(5px)";
}

// Continue
noteContinue.addEventListener("click", () => {
    note.style.display = "none";
    background.style.filter = "none";
    if (step === 6) {
        showBadge();
    } else if (step < 3) {
        step++;
        showNote();
    }
});

// Object clicks
yogaMat.addEventListener("click", () => handleClick("mat"));
dumbbell.addEventListener("click", () => handleClick("db"));
brownie.addEventListener("click", () => handleClick("brownie"));

function handleClick(item) {
    if (step === 3 && item === "mat") step = 4, showNote();
    else if (step === 4 && item === "db") step = 5, showNote();
    else if (step === 5 && item === "brownie") step = 6, showBadge();
}

// Badge + confetti
function showBadge() {
    badge.style.display = "block";
    confettiCanvas.style.display = "block";
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    initConfetti();
    animateConfetti();
}

// Play again
playAgain.addEventListener("click", () => {
    badge.style.display = "none";
    confettiCanvas.style.display = "none";
    confettiParticles = [];
    step = 1;
    showNote();
});

// Confetti
function initConfetti() {
    confettiParticles = [];
    for(let i=0;i<150;i++){
        confettiParticles.push({
            x: Math.random()*confettiCanvas.width,
            y: Math.random()*confettiCanvas.height - confettiCanvas.height,
            r: Math.random()*6+2,
            d: Math.random()*10+2,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.floor(Math.random()*10)-10,
            tiltAngleIncrement: Math.random()*0.07+0.05,
            tiltAngle:0
        });
    }
}

function animateConfetti(){
    confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettiParticles.forEach(p=>{
        confettiCtx.beginPath();
        confettiCtx.lineWidth = p.r/2;
        confettiCtx.strokeStyle = p.color;
        confettiCtx.moveTo(p.x + p.tilt + p.r/4, p.y);
        confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/4);
        confettiCtx.stroke();
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d)+3+p.r/2)/2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle)*15;
        if(p.y > confettiCanvas.height) p.y = -10;
    });
    requestAnimationFrame(animateConfetti);
}
