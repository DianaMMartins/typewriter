const textDisplay = document.getElementById("text");
const writer = document.getElementById("writer");

let currentPhrase = [];
let phrasesIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let isEnd = false;
let isStart = true;

const phrases = [
  "Hello World!",
  "My name is Diana Martins.",
  "I am a Frontend Developer.",
  "This is a test typewriter effect.",
];

const addAnimation = () => {
  writer.style.animation = "blink 0.6s infinite";
};

const removeAnimation = () => {
  writer.style.animation = "none";
};

const updateDisplay = () => {
  isEnd = false;
  isStart = false;
  textDisplay.innerHTML = currentPhrase.join("");
};

const calculateSpeed = () => {
  return isEnd || isStart ? 1800 : isDeleting ? 50 : 150;
};

const addLetter = () => {
  currentPhrase.push(phrases[phrasesIndex][letterIndex]);
  letterIndex++;
  updateDisplay();
};

const deleteLetter = () => {
  currentPhrase.pop();
  letterIndex--;
  updateDisplay();
};

const handleEndOfPhrase = () => {
  isDeleting = true;
  isEnd = true;
  isStart = false;
};

const handlePhraseCompletion = () => {
  addAnimation();
  currentPhrase = [];
  isStart = true;
  isDeleting = false;
  phrasesIndex++;
  if (phrasesIndex === phrases.length) {
    phrasesIndex = 0;
  }
};

const type = () => {
  updateDisplay();

  if (phrasesIndex < phrases.length) {
    if (!isDeleting && letterIndex <= phrases[phrasesIndex].length) {
      addLetter();
      removeAnimation();
    }

    if (isDeleting && letterIndex <= phrases[phrasesIndex].length) {
      removeAnimation();
      deleteLetter();
    }

    if (letterIndex === phrases[phrasesIndex].length) {
      addAnimation();
      handleEndOfPhrase();
    }

    if (isDeleting && letterIndex === 0) {
      handlePhraseCompletion();
    }
  }
};

const loop = () => {
  type();
  const time = calculateSpeed();
  setTimeout(loop, time);
};

loop();

module.exports = {
  type,
  addLetter,
  deleteLetter,
  handleEndOfPhrase,
  handlePhraseCompletion,
  calculateSpeed,
  loop,
};
