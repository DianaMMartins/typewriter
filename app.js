const textDisplay = document.getElementById("text");
let currentPhrase = [];
let phrasesIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let isEnd = false;

const phrases = [
  "Hello World!",
  "My name is Diana Martins.",
  "I am a Frontend Developer.",
  "This is a test typewriter effect.",
];

const updateDisplay = () => {
  textDisplay.innerHTML = currentPhrase.join("");
};

const calculateSpeed = () => {
  const speedUp = 50;
  const normalSpeed = 150;
  return isEnd ? 1500 : isDeleting ? speedUp : normalSpeed;
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
};

const handlePhraseCompletion = () => {
  currentPhrase = [];
  isDeleting = false;
  phrasesIndex++;
  if (phrasesIndex === phrases.length) {
    phrasesIndex = 0;
  }
};

const type = () => {
  isEnd = false;
  updateDisplay();

  if (phrasesIndex < phrases.length) {
    if (!isDeleting && letterIndex <= phrases[phrasesIndex].length) {
      addLetter();
    }

    if (isDeleting && letterIndex <= phrases[phrasesIndex].length) {
      deleteLetter();
    }

    if (letterIndex === phrases[phrasesIndex].length) {
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