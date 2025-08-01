// Love start date: April 21, 2023, 00:24:00
const loveStartDate = new Date('2025-07-11T00:24:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

let lastUpdate = Date.now();
function updateCountUp() {
  const now = Date.now();
  let diff = now - loveStartDate.getTime();
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  daysEl.textContent = days.toString().padStart(3, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
  lastUpdate = now;
}

let countUpInterval = setInterval(updateCountUp, 1000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    updateCountUp();
    countUpInterval = setInterval(updateCountUp, 1000);
  } else {
    clearInterval(countUpInterval);
  }
});

// Audio setup
const audio = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume-slider');
const playMusicBtn = document.getElementById('play-music-btn');

if (volumeSlider) {
  volumeSlider.addEventListener('input', e => {
    audio.volume = e.target.value;
  }, { passive: true });
  audio.volume = volumeSlider.value;
}

function tryPlayAudio() {
  audio.play().catch(() => {
    if (playMusicBtn) playMusicBtn.style.display = 'block';
  });
}

if (playMusicBtn) {
  playMusicBtn.addEventListener('click', () => {
    audio.play();
    playMusicBtn.style.display = 'none';
  });
}

// Modal handling
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.style.display = 'flex';
  if (message === 'Wrong password 💔') {
    const lockContainer = document.querySelector('.lock-container');
    lockContainer.classList.add('wrong');
    setTimeout(() => lockContainer.classList.remove('wrong'), 300);
  }
}

document.querySelectorAll('#modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
});

// Alert button
const alertBtn = document.getElementById('alert-btn');
if (alertBtn) {
  alertBtn.addEventListener('click', () => {
    showModal("Ah kom puke khg love you so much! Happy girl day nah baby hope you have a wonderful day baby 🥺💙");
  });
  alertBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showModal("Ah kom puke khg love you so much! Happy girl day nah baby hope you have a wonderful day baby 🥺💙");
  }, { passive: false });
}

// Surprise button
const surpriseBtn = document.getElementById('surprise-btn');
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    window.location.href = 'cards.html';
  });
}

// Password handling
const correctPassword = '240808';
let currentInput = '';
const passwordInput = document.getElementById('password-input');

function handleInput(value) {
  console.log('Button pressed:', value);
  if (value === 'Clear') {
    currentInput = '';
  } else if (value === 'Enter') {
    console.log('Current input:', currentInput);
    if (currentInput === correctPassword) {
      console.log('Password correct, redirecting to main.html');
      window.location.href = 'main.html';
      tryPlayAudio();
    } else {
      console.log('Password incorrect');
      showModal('Wrong password 💔');
      currentInput = '';
    }
  } else {
    if (currentInput.length < 10) {
      currentInput += value;
    }
  }
  if (passwordInput) passwordInput.value = currentInput;
}

if (document.querySelectorAll('.buttons button').length) {
  document.querySelectorAll('.buttons button').forEach(button => {
    const value = button.textContent;
    button.addEventListener('click', () => handleInput(value));
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleInput(value);
    }, { passive: false });
  });
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
  img.onerror = () => img.src = 'assets/fallback.jpg';
});

updateCountUp();
tryPlayAudio();
