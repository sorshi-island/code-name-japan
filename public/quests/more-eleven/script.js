let number1;
let number2;
let score = 0;
let timeLeft = 60;
let timer;
let animationDuration = 2;  // Начальная длительность анимации
let timerDuration = 10;

const number1Element = document.getElementById('number1');
const number2Element = document.getElementById('number2');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const timerElement = document.getElementById('timer');
const balanceElement = document.getElementById('balance');
let ifGameStarted = false;

const round1 = document.getElementById('round1');
const round2 = document.getElementById('round2');

function getRandomNumber(index = 9) {
    return Math.floor(Math.random() * index) + 1;
}

function startGame() {
    generateNewNumbers();
    updateTimer();
}

function updateTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        minus1Second();
        if (timeLeft <= 0) {
            endGame();
        }
    }, (timerDuration * 75));
}

function minus1Second() {
    timeLeft--;
    timerElement.textContent = `${timeLeft}`;
}

function generateNewNumbers() {
    number1 = getRandomNumber(4);
    number2 = getRandomNumber(4);
    animateNumbers(number1Element, number1);
    animateNumbers(number2Element, number2);
    input1.value = '';
    input2.value = '';
    input1.focus();
}

function animateNumbers(element, finalNumber) {
    const numbersContainer = document.createElement('div');
    for (let i = 1; i <= 9; i++) {
        const numberSpan = document.createElement('span');
        numberSpan.textContent = i.toString();
        numbersContainer.appendChild(numberSpan);
    }

    const finalSpan = document.createElement('span');
    finalSpan.textContent = finalNumber.toString();
    numbersContainer.appendChild(finalSpan);

    element.innerHTML = '';
    element.appendChild(numbersContainer);
    numbersContainer.style.animation = `spin ${animationDuration * 1.5}s cubic-bezier(0.25, 0.1, 0.25, 1)`;

    setTimeout(() => {
        element.innerHTML = `<span>${finalNumber}</span>`;
    }, animationDuration * 200);
}

function changeBg() {
    const currentBg = document.querySelector('.bg.active');
    currentBg.classList.remove('active');

    const allBgsList = document.getElementsByClassName('bg');
    const bgLength = allBgsList.length;
    const nexIndex = getRandomNumber(bgLength - 1);
    allBgsList[nexIndex].classList.add('active');
}

function getBalance() {
    return score;
}

function showBalance(value) {
    balanceElement.textContent = (getBalance()).toString();
}

function indicateCorrect() {
    timerElement.style.color = 'green';
    setTimeout(() => {
        timerElement.style.color = 'darkslateblue';
    }, 300);
}

function indicateInCorrect() {
    timerElement.style.color = 'red';
    minus1Second();
    setTimeout(() => {
        timerElement.style.color = 'darkslateblue';
    }, 300);
}

function decreaseTimerBoost() {
    if (timerDuration > 1) {
        updateTimer();
        timerDuration--;
    }
}

function checkSum() {
    const sum1 = parseInt(input1.value);
    const sum2 = parseInt(input2.value);
    const sum = sum2;

    if (!isNaN(sum2)) {
        if (sum === number1 + number2) {
            score++;
            indicateCorrect();
            if (score > 11) {
                endGame();
            } else {
                if (animationDuration > 0.5) {
                    animationDuration -= 0.1;
                }

                decreaseTimerBoost();

                if (ifGameStarted === false) {
                    ifGameStarted = true;
                    startGame();
                }

                showBalance(score);
                changeBg();
                generateNewNumbers();
            }
        } else {
            indicateInCorrect();
        }
    }
}

function endGame() {
    clearInterval(timer);
    round1.style.display = 'none';
    if (typeof subAdapter !== 'undefined' && typeof subAdapter.completeQuest === 'function') {
        subAdapter.completeQuest();
    }
}

console.dir('More eleven script loaded')

function bind(adapter) {
    console.dir('Bind for quest')
    window.subAdapter = adapter;
    //
    // balanceElement.addEventListener('change', () => {
    //     console.dir(123);
    // });

    input1.addEventListener('input', () => {
        if (input1.value.length === 1) {
            input2.focus();
        }
        checkSum();
    });

    input2.addEventListener('input', () => {
        if (input2.value.length === 1) {
            checkSum();
        }
    });

    input1.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input1.value.length === 0) {
            input2.focus();
            event.preventDefault();
        }
    });

    input2.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input2.value.length === 0) {
            input1.focus();
            event.preventDefault();
        }
    });
}
