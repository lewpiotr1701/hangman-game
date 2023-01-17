const wrongLettersEl = document.querySelector('#wrong-letters');
const wordEl = document.querySelector('#word');

const popupContainer = document.querySelector('#popup-container');
const finalMessage = document.querySelector('#final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const playAgainBtn = document.querySelector('#play-button');

const notificationContainer = document.querySelector('#notification-container');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['programming', 'javascript', 'learning'];

let selectedWord = words[getRandomInt(words.length)];

let playable = true;

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

  // Check if won
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 💪';
    finalMessageRevealWord.innerText = '';
    popupContainer.style.display = 'flex';

    playable = false;
  }
}

// Update the wrong letter
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join(', ')}
  `;

  const errors = wrongLetters.length;

  // Display hangman's parts
  figureParts.forEach((part, index) => {
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (errors === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😔';
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popupContainer.style.display = 'flex';

    playable = false;
  }
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
  if (playable) {
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
  }
})

// Play again button
playAgainBtn.addEventListener('click', () => {
  playable = true;

  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Draw a new word
  selectedWord = words[getRandomInt(words.length)];

  displayWord();
  updateWrongLettersEl();

  popupContainer.style.display = 'none'
})

displayWord();