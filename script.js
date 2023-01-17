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

let timeout = null;

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

// Update the wrong letter
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  <p>Wrong</p>
    ${wrongLetters.map(letter => `
      <span>${letter}, </span>`
  )
      .join('')
    }
  `
}

// Show notification
function showNotification() {
  if (timeout) clearTimeout(timeout)

  notificationContainer.classList.add('show')

  timeout = setTimeout(() => {
    notificationContainer.classList.remove('show')
  }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
  if (e.key >= 'a' && e.key <= 'z') {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
})

displayWord();