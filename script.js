const wrongLettersEl = document.querySelector('#wrong-letters');
const wordEl = document.querySelector('#word');
const popupContainer = document.querySelector('#popup-container');
const finalMessage = document.querySelector('#final-message');
const playAgainBtn = document.querySelector('#play-button');
const notificationContainer = document.querySelector('#notification-container');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['dupa'];

let selectedWord = words[getRandomInt(words.length)];

const correctLetters = [];
const wrongLetters = [];

// Get random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Show entered letters of hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class=letter>
          ${correctLetters.includes(letter) ? letter : ''}
        </span>`
      )
      .join('')
    }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 💪';
    popupContainer.style.display = 'flex'
  }
}

displayWord();