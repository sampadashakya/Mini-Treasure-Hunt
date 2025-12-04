const startBtn = document.getElementById('start-btn');
const notePopup = document.getElementById('note-popup');
const noteText = document.getElementById('note-text');
const continueBtn = document.getElementById('continue-btn');
const noteIcon = document.getElementById('note-icon');

const yogaMat = document.getElementById('yoga-mat');
const dumbbell = document.getElementById('dumbbell');
const brownie = document.getElementById('brownie');

const clues = [
    "Hi bobo bear…\nWelcome to a tiny treasure hunt I made just for you.\nHope you have a fun time playing this.",
    "So how do we play this game?\nWell, you will be given clues turn by turn, and you will have to find the object based on the clue.",
    "Clue #1\nRemember our very first chat?\nIt all started while we were stretching…\nFind the thing that reminds us of that first moment together.",
    "Congratulations! You found it!\n\nClue #2\nIt’s strong, determined, and loves the gym as much as you do.\nPick the thing that reminds me how proud I am of you.",
    "Wow, look at you go!\n\nClue #3\nFind something sweet…\nSweet like you…\nAND sweet like the treats we shared on our first date.",
    "Best Boyfriend Award 🎉\n\nPlay again!"
];

let turn = 0;
let currentClue = 2; // start with clue 1 for finding yoga mat

function showPopup(text) {
    noteText.innerText = text;
    notePopup.style.display = 'block';
    document.getElementById('background').style.filter = 'blur(5px)';
    yogaMat.style.filter = dumbbell.style.filter = brownie.style.filter = 'blur(2px)';
}

function hidePopup() {
    notePopup.style.display = 'none';
    document.getElementById('background').style.filter = 'none';
    yogaMat.style.filter = dumbbell.style.filter = brownie.style.filter = 'none';
}

// Start button
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    showPopup(clues[turn]);
});

// Continue button
continueBtn.addEventListener('click', () => {
    hidePopup();
    turn++;
    if (turn < 3) showPopup(clues[turn]);
    noteIcon.style.display = 'block';
});

// Click on note icon to show current clue
noteIcon.addEventListener('click', () => {
    showPopup(clues[currentClue]);
});

// Game object click logic
yogaMat.addEventListener('click', () => {
    if (currentClue === 2) {
        currentClue++;
        showPopup(clues[3]);
    }
});

dumbbell.addEventListener('click', () => {
    if (currentClue === 3) {
        currentClue++;
        showPopup(clues[4]);
    }
});

brownie.addEventListener('click', () => {
    if (currentClue === 4) {
        currentClue++;
        showPopup(clues[5]);
        confetti();
    }
});

// Confetti effect
function confetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
            ...defaults,
            particleCount: 10,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 250);
}
